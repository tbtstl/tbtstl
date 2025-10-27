import { p5SizingDefaults } from './utils'
import { Agent } from './Agent'
import { loadAndSampleImage, clusterColorsByProximity, assignAgentsToPixels } from './imageUtils'
import colors from '../colors'

/**
 * Creates a post-specific sketch that makes agents flock towards a cover image
 * @param imagePath - Path to the PNG cover image
 * @returns p5.js sketch function
 */
const createPostSketch = (imagePath: string) => {
  return (p: any) => {
    const agents: Agent[] = []
    const agentCount = window.innerWidth *2
    const noiseScale = 300
    const noiseStrength = 10
    const strokeWidth = 0.1 // stroke width for line rendering
    const convergenceTime = 1 // seconds to fully converge

    let imageLoaded = false
    let imageLoadError = false
    let startTime = 0

    const defaultColors = [colors.brand, colors.black, colors.red]

    const setup = () => {
      p.frameRate(24)
      startTime = p.millis()

      // Initialize agents with random positions
      for (let i = 0; i < agentCount; i++) {
        agents[i] = new Agent(p)
        agents[i].color = defaultColors[i % defaultColors.length]
      }

      // Start async image loading (non-blocking)
      loadImageAsync()
    }

    const loadImageAsync = async () => {
      try {
        // Sample pixels from the image with higher density
        const result = await loadAndSampleImage(p, imagePath, 2)
        const { pixels, width: imageWidth, height: imageHeight } = result

        if (pixels.length === 0) {
          throw new Error('No pixels sampled from image')
        }

        // Cluster colors
        const clusters = clusterColorsByProximity(pixels, 6)

        if (clusters.length === 0) {
          throw new Error('No color clusters created')
        }

        // Assign agents to pixels using actual image dimensions for proper centering
        const assignments = assignAgentsToPixels(
          agentCount,
          clusters,
          p.width,
          p.height,
          imageWidth,
          imageHeight
        )

        // Apply assignments to agents
        for (let i = 0; i < agentCount; i++) {
          const assignment = assignments[i]
          agents[i].targetPosition = p.createVector(assignment.x, assignment.y)
          agents[i].color = assignment.color
        }

        imageLoaded = true
      } catch (error) {
        console.warn('Failed to load cover image, using default behavior:', error)
        imageLoadError = true
      }
    }

    p5SizingDefaults(p, setup)

    p.draw = function () {
      // Create transparent overlay for trailing effect (like defaultSketch)
      p.fill('rgba(0,0,0,0)')
      p.noStroke()
      p.rect(0, 0, p.width, p.height)

      // Calculate attraction strength (0 to 1 over convergenceTime seconds)
      const elapsed = (p.millis() - startTime) / 1000
      const attractionStrength = imageLoaded
        ? Math.min(1.0, elapsed / convergenceTime)
        : 0

      // Update all agents
      for (let i = 0; i < agentCount; i++) {
        const agent = agents[i]

        // Set stroke color for lines
        const agentColor = agent.color || defaultColors[i % defaultColors.length]
        p.stroke(agentColor)

        // Use update3OrbitStroke for gravitational orbital motion with line drawing
        agent.update3OrbitStroke(
          noiseScale * Math.random() * 1.1,
          noiseStrength * Math.random() * 1.1,
          strokeWidth, // stroke width for line rendering
          attractionStrength,
          0.7 // stronger gravitational pull (was 0.85)
        )
      }
    }
  }
}

export default createPostSketch
