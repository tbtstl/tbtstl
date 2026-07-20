import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const experimentsDirectory = path.join(process.cwd(), 'content/experiments');

export interface ExperimentMetadata {
  slug: string;
  title: string;
  description: string;
  inceptionDate: string;
  homepageBlurb: string;
  projectUrl: string;
  projectLinkLabel: string;
  order: number;
  coverImage?: string;
}

export interface ExperimentData extends ExperimentMetadata {
  contentHtml: string;
}

function getRequiredString(
  data: Record<string, unknown>,
  field: string,
  fileName: string,
): string {
  const value = data[field];

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Experiment ${fileName} must define a non-empty ${field}`);
  }

  return value;
}

function parseExperimentMetadata(
  slug: string,
  fileName: string,
  data: Record<string, unknown>,
): ExperimentMetadata {
  const order = data.order;

  if (typeof order !== 'number' || !Number.isFinite(order)) {
    throw new Error(`Experiment ${fileName} must define a numeric order`);
  }

  const experiment: ExperimentMetadata = {
    slug,
    title: getRequiredString(data, 'title', fileName),
    description: getRequiredString(data, 'description', fileName),
    inceptionDate: getRequiredString(data, 'inceptionDate', fileName),
    homepageBlurb: getRequiredString(data, 'homepageBlurb', fileName),
    projectUrl: getRequiredString(data, 'projectUrl', fileName),
    projectLinkLabel: getRequiredString(data, 'projectLinkLabel', fileName),
    order,
  };

  if (data.coverImage !== undefined) {
    experiment.coverImage = getRequiredString(data, 'coverImage', fileName);
  }

  return experiment;
}

function getExperimentFileNames(): string[] {
  if (!fs.existsSync(experimentsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(experimentsDirectory)
    .filter((fileName) => fileName.endsWith('.md'));
}

function readExperimentMetadata(fileName: string): ExperimentMetadata {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(experimentsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return parseExperimentMetadata(slug, fileName, matterResult.data);
}

/**
 * Get all experiments sorted by their explicit display order.
 */
export function getAllExperiments(): ExperimentMetadata[] {
  return getExperimentFileNames()
    .map(readExperimentMetadata)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

/**
 * Get a single experiment by slug with its Markdown rendered to HTML.
 */
export async function getExperimentBySlug(
  slug: string,
): Promise<ExperimentData> {
  const fileName = `${slug}.md`;
  const fullPath = path.join(experimentsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const metadata = parseExperimentMetadata(slug, fileName, matterResult.data);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);

  return {
    ...metadata,
    contentHtml: processedContent.toString(),
  };
}

/**
 * Get all experiment slugs for static path generation.
 */
export function getAllExperimentSlugs(): string[] {
  return getAllExperiments().map(({ slug }) => slug);
}
