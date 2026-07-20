import { GetStaticProps, GetStaticPaths } from 'next';
import ArticlePage from '../../components/ArticlePage';
import { getPostBySlug, getAllPostSlugs, PostData } from '../../lib/posts';

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <ArticlePage
      title={post.title}
      description={post.description}
      coverImage={post.coverImage}
      metadata={post.date}
      contentHtml={post.contentHtml}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string);

  return {
    props: {
      post,
    },
  };
};
