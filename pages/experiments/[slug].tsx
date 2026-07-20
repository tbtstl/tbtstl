import { GetStaticPaths, GetStaticProps } from 'next';
import ArticlePage from '../../components/ArticlePage';
import { BaseLink } from '../../components/BaseLink';
import { formatMonthYear } from '../../lib/dates';
import {
  ExperimentData,
  getAllExperimentSlugs,
  getExperimentBySlug,
} from '../../lib/experiments';

interface ExperimentProps {
  experiment: ExperimentData;
}

export default function Experiment({ experiment }: ExperimentProps) {
  return (
    <ArticlePage
      title={experiment.title}
      description={experiment.description}
      coverImage={experiment.coverImage}
      metadata={
        <>
          {formatMonthYear(experiment.inceptionDate)}
          <br />
          <BaseLink
            href={experiment.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {experiment.projectLinkLabel}
          </BaseLink>
        </>
      }
      contentHtml={experiment.contentHtml}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllExperimentSlugs().map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ExperimentProps> = async ({ params }) => {
  const experiment = await getExperimentBySlug(params?.slug as string);

  return {
    props: {
      experiment,
    },
  };
};
