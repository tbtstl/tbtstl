import Head from 'next/head';
import styled from 'styled-components';
import { GetStaticProps, GetStaticPaths } from 'next';
import SketchWrapper from '../../components/SketchWrapper';
import { getPostBySlug, getAllPostSlugs, PostData } from '../../lib/posts';
import { BaseLink } from '../../components/BaseLink';

interface PostProps {
  post: PostData;
}

const Container = styled.div`
  margin: 1rem;
`;

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 1618 / 1000;
  max-height: 80vh;
  margin-bottom: 40px;
`;

const ArticleContainer = styled.article`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ArticleTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const ArticleDate = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
`;

const ArticleContent = styled.div`
  font-size: 16px;
  line-height: 1.6;

  p {
    margin: 0 0 20px 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    margin: 32px 0 16px 0;
    line-height: 1.3;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4, h5, h6 {
    font-size: 16px;
  }

  ul, ol {
    margin: 0 0 20px 0;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: inherit;
    text-decoration: underline;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }

  blockquote {
    margin: 20px 0;
    padding-left: 20px;
    border-left: 3px solid #ddd;
    color: #666;
  }

  code {
    font-family: 'Courier New', monospace;
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 14px;
  }

  pre {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0 0 20px 0;

    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px 0;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 32px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
  }

  thead {
    border-bottom: 2px solid #ddd;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: 500;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const BackLink = styled(BaseLink)`
  display: inline-block;
  margin-bottom: 40px;
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }
`;

export default function Post({ post }: PostProps) {
  
  return (
    <div>
      <Head>
        <title>{post.title} - tbtstl</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {post.description && <meta name="description" content={post.description} />}
      </Head>
      <Container>
        <CanvasContainer>
          <SketchWrapper coverImage={post.coverImage} />
        </CanvasContainer>
        <ArticleContainer>
          <BackLink href="/">← Back to home</BackLink>
          <ArticleTitle>{post.title}</ArticleTitle>
          <ArticleDate>{post.date}</ArticleDate>
          <ArticleContent dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        </ArticleContainer>
      </Container>
    </div>
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
