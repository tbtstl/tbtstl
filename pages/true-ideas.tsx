import Head from 'next/head'
import styled from 'styled-components'
import SketchWrapper from '../components/SketchWrapper'
import defaultSketch from '../sketches/defaultSketch'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BaseLink } from 'components/BaseLink'

const Container = styled.div`
  margin: 1rem;
`

const Text = styled.p<{ mb?: boolean }>`
  font-size: 16px;
  margin: 0;
  padding: 0;
  ${props => props.mb ? 'margin-bottom: 20px;' : ''}
`

const Bold = styled.h3`
  font-size: 16px;
  margin: 0;
  padding: 0;
  font-weight: 500;
`

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 1618 / 1000;
  max-height: 80vh;
`

const Content = styled.div`
  max-width: 720px;
  margin: 0 auto;
`

type Props = {
  title: string
  html: string
  description?: string
}

export default function AMapPage({ title, html: htmlContent, description }: Props) {
  return (
    <div>
      <Head>
        <title>{title} — tbtstl</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {description ? <meta name="description" content={description} /> : null}
      </Head>
      <Container>
        <Bold><BaseLink href="/">tbtstl</BaseLink></Bold>
        <CanvasContainer>
          <SketchWrapper sketch={defaultSketch} />
        </CanvasContainer>
        <Content>
          <Bold>{title}</Bold>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Content>
      </Container>
    </div>
  )
}

export async function getStaticProps() {
  const notesDir = path.join(process.cwd(), 'pages', 'notes')
  const filePath = path.join(notesDir, 'probablyTrue.md')
  const file = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(file)
  const processed = await remark().use(html).process(content)
  const htmlContent = processed.toString()

  return {
    props: {
      title: data.title || 'Probably True Ideas',
      description: data.description || '',
      html: htmlContent,
    },
  }
}


