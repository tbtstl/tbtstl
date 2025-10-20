/**
 * Image utilities for sampling pixels from PNG images
 * and preparing them for agent-based flocking behavior
 */

export interface ColoredPixel {
  x: number;
  y: number;
  color: string;
  r: number;
  g: number;
  b: number;
}

export interface ColorCluster {
  color: string;
  pixels: ColoredPixel[];
}

/**
 * Load an image and sample pixels at specified density
 * @param p5 - p5.js instance
 * @param imagePath - Path to the image file
 * @param samplingDensity - Sample every Nth pixel (default: 3)
 * @returns Promise that resolves with array of colored pixels and actual image dimensions
 */
export function loadAndSampleImage(
  p5: any,
  imagePath: string,
  samplingDensity: number = 3
): Promise<{pixels: ColoredPixel[], width: number, height: number}> {
  return new Promise((resolve, reject) => {
    p5.loadImage(
      imagePath,
      (img: any) => {
        try {
          const pixels = extractColoredPixels(p5, img, samplingDensity);
          resolve({
            pixels,
            width: img.width,
            height: img.height
          });
        } catch (error) {
          reject(error);
        }
      },
      (error: any) => {
        reject(error);
      }
    );
  });
}

/**
 * Extract colored pixels from an image, filtering out background
 * @param p5 - p5.js instance
 * @param image - Loaded p5.Image object
 * @param samplingDensity - Sample every Nth pixel
 * @returns Array of colored pixels with positions and colors
 */
export function extractColoredPixels(
  p5: any,
  image: any,
  samplingDensity: number = 3
): ColoredPixel[] {
  const pixels: ColoredPixel[] = [];
  image.loadPixels();

  // Access pixel array directly instead of using get() repeatedly
  const d = image.pixels;
  const w = image.width;

  for (let y = 0; y < image.height; y += samplingDensity) {
    for (let x = 0; x < image.width; x += samplingDensity) {
      // Calculate pixel array index (RGBA format: 4 values per pixel)
      const index = (y * w + x) * 4;
      const r = d[index];
      const g = d[index + 1];
      const b = d[index + 2];
      const a = d[index + 3];

      // Filter out transparent and near-white pixels
      if (a > 128 && !(r > 240 && g > 240 && b > 240)) {
        pixels.push({
          x,
          y,
          color: p5.color(r, g, b).toString(),
          r,
          g,
          b,
        });
      }
    }
  }

  return pixels;
}

/**
 * Calculate Euclidean distance between two colors in RGB space
 */
function colorDistance(c1: ColoredPixel, c2: ColoredPixel): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

/**
 * Round RGB values to reduce color variations
 */
function roundColor(r: number, g: number, b: number, step: number = 32): [number, number, number] {
  return [
    Math.round(r / step) * step,
    Math.round(g / step) * step,
    Math.round(b / step) * step
  ];
}

/**
 * Extract distinct colors from pixels using histogram approach
 * This is much more robust than spatial sampling for detecting all colors
 * @param pixels - Array of colored pixels
 * @param maxColors - Maximum number of distinct colors to return
 * @returns Array of distinct colors sorted by frequency
 */
function extractDistinctColors(pixels: ColoredPixel[], maxColors: number = 8): Array<{r: number, g: number, b: number, count: number}> {
  // Build histogram of rounded colors
  const histogram = new Map<string, {r: number, g: number, b: number, count: number}>();

  for (const pixel of pixels) {
    const [rr, gr, br] = roundColor(pixel.r, pixel.g, pixel.b, 32);
    const key = `${rr},${gr},${br}`;

    if (histogram.has(key)) {
      histogram.get(key)!.count++;
    } else {
      histogram.set(key, { r: rr, g: gr, b: br, count: 1 });
    }
  }

  // Sort by frequency and take top N
  const topColors = Array.from(histogram.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, maxColors);

  // Debug logging
  console.log('🎨 Histogram - Top Colors Detected:');
  topColors.forEach((color, i) => {
    console.log(`  ${i + 1}. RGB(${color.r}, ${color.g}, ${color.b}) - ${color.count} pixels`);
  });

  return topColors;
}

/**
 * Cluster pixels by color similarity using histogram-based approach
 * @param pixels - Array of colored pixels
 * @param targetColorCount - Number of color clusters to create (3-8)
 * @returns Array of color clusters
 */
export function clusterColorsByProximity(
  pixels: ColoredPixel[],
  targetColorCount: number = 5
): ColorCluster[] {
  if (pixels.length === 0) return [];

  // Use histogram to find distinct colors (much more robust than spatial sampling)
  const distinctColors = extractDistinctColors(pixels, targetColorCount);

  if (distinctColors.length === 0) return [];

  // Convert distinct colors to cluster centers
  const centers: ColoredPixel[] = distinctColors.map(color => ({
    x: 0,
    y: 0,
    r: color.r,
    g: color.g,
    b: color.b,
    color: `rgb(${color.r}, ${color.g}, ${color.b})`
  }));

  const clusters: ColorCluster[] = [];

  // Assign each pixel to nearest cluster center
  for (const pixel of pixels) {
    let minDist = Infinity;
    let closestIdx = 0;

    for (let i = 0; i < centers.length; i++) {
      const dist = colorDistance(pixel, centers[i]);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    }

    // Add to cluster or create new cluster
    if (!clusters[closestIdx]) {
      clusters[closestIdx] = {
        color: centers[closestIdx].color,
        pixels: [],
      };
    }
    clusters[closestIdx].pixels.push(pixel);
  }

  // Filter out empty clusters
  const nonEmptyClusters = clusters.filter(cluster => cluster.pixels.length > 0);

  // Debug logging
  console.log('📊 Cluster Assignments:');
  nonEmptyClusters.forEach((cluster, i) => {
    console.log(`  Cluster ${i}: ${cluster.color} - ${cluster.pixels.length} pixels`);
  });

  return nonEmptyClusters;
}

/**
 * Assign agents to pixels, distributing them across color clusters
 * @param agentCount - Total number of agents
 * @param clusters - Color clusters with pixels
 * @param canvasWidth - Canvas width for scaling
 * @param canvasHeight - Canvas height for scaling
 * @param imageWidth - Original image width
 * @param imageHeight - Original image height
 * @returns Array of assignments {position, color} for each agent
 */
export function assignAgentsToPixels(
  agentCount: number,
  clusters: ColorCluster[],
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number
): Array<{ x: number; y: number; color: string }> {
  if (clusters.length === 0) return [];

  const assignments: Array<{ x: number; y: number; color: string }> = [];

  // Calculate scaling factors to fit image to canvas
  const scaleX = canvasWidth / imageWidth;
  const scaleY = canvasHeight / imageHeight;

  // Use the smaller scale to maintain aspect ratio
  const scale = Math.min(scaleX, scaleY);

  // Calculate offsets to center the image
  const offsetX = (canvasWidth - imageWidth * scale) / 2;
  const offsetY = (canvasHeight - imageHeight * scale) / 2;

  // Flatten all pixels from all clusters
  const allPixels: Array<{ pixel: ColoredPixel; clusterColor: string }> = [];
  for (const cluster of clusters) {
    for (const pixel of cluster.pixels) {
      allPixels.push({ pixel, clusterColor: cluster.color });
    }
  }

  // Shuffle pixels for random distribution
  for (let i = allPixels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPixels[i], allPixels[j]] = [allPixels[j], allPixels[i]];
  }

  // Assign agents to pixels (with wrapping if more agents than pixels)
  for (let i = 0; i < agentCount; i++) {
    const pixelData = allPixels[i % allPixels.length];
    const scaledX = pixelData.pixel.x * scale + offsetX;
    const scaledY = pixelData.pixel.y * scale + offsetY;

    assignments.push({
      x: scaledX,
      y: scaledY,
      color: pixelData.clusterColor,
    });
  }

  return assignments;
}
