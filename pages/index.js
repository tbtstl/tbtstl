import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import SketchWrapper from '../components/SketchWrapper'
import defaultSketch from '../sketches/defaultSketch'
import { BaseLink } from '../components/BaseLink'

const BOOKS = [
  {
    title: 'Skunk Works: A Personal Memoir of My Years of Lockheed Kindle Edition',
    author: 'Leo Janos & Ben R. Rich',
    rating: '9',
    year: '2023',
    href: 'https://www.amazon.com/gp/product/B00A2DIW3C/'
  },
  {
    title: '722 Miles: The Building of the Subways and How They Transformed New York',
    author: 'Clifton Hood',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/0801880548/'
  },
  {
    title: 'What I Talk About When I Talk About Running: A Memoir',
    author: 'Haruki Murakami',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/0307389839/'
  },
  {
    title: 'The End of the World Is Just the Beginning: Mapping the Collapse of Globalization',
    author: 'Peter Zeihan',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/006323047X/'
  },
  {
    title: 'The Network State: How to Start a New Country',
    author: 'Balaji Srinivasan',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/B09VPKZR3G/'
  },
  {
    title: 'Trillion Dollar Coach: The Leadership Playbook of Silicon Valley\'s Bill Campbell',
    author: 'Eric Schmidt',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/B076ZHG3H3/'
  },
  {
    title: 'Thinking in Systems',
    author: 'Donella H. Meadows',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/1603580557/'
  },
  {
    title: 'A City is not a Tree',
    author: 'Christopher Alexander',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/B075FFM2PM'
  },
  {
    title: 'Principles for Dealing with the Changing World Order: Why Nations Succeed and Fail',
    author: 'Ray Dalio',
    rating: '8',
    year: '2022',
    href: 'https://www.amazon.com/gp/product/B0881Y73YG/'
  },
  {
    title: 'Simulacra and Simulation (The Body, In Theory: Histories of Cultural Materialism)',
    author: 'Jean Baudrillard',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/0472065211'
  },
  {
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/B000FC2ROU'
  },
  {
    title: 'A Pattern Language: Towns, Buildings, Construction',
    author: 'Christopher Alexander',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/0195019199/'
  },
  {
    title: 'The Timeless Way of Building',
    author: 'Christopher Alexander',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/0195024028'
  },
  {
    title: 'Computational Drawing: From Foundational Exercises to Theories of Representation',
    author: 'Carl Lostritto',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/1940743265/'
  },
  {
    title: 'Blueprint: The Evolutionary Origins of a Good Society',
    author: 'Nicholas A. Christakis',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/B07F67B9P4/'
  },
  {
    title: 'Metamagical Themas: Questing For The Essence Of Mind And Pattern',
    author: 'Douglas Hofstadter',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/B01DWVB44E/',
  },
  {
    title: 'The Hundred-Year Marathon: China\'s Secret Strategy to Replace America as the Global Superpower',
    author: 'Michael Pillsbury',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/Hundred-Year-Marathon-Strategy-Replace-Superpower/dp/1250081343',
  },
  {
    title: 'The True Believer: Thoughts on the Nature of Mass Movements',
    author: 'Eric Hoffer',
    rating: '7',
    year: '2020',
    href: 'https://www.amazon.com/gp/product/0060505915',
  },
  {
    title: 'Dance Dance Dance',
    author: 'Haruki Murakami',
    rating: '8',
    year: '2020',
    href: 'https://www.amazon.com/Dance-Haruki-Murakami/dp/0679753796',
  },
  {
    title: 'LSD: My Problem Child',
    author: 'Albert Hoffman',
    rating: '7',
    year: '2020',
    href: 'https://maps.org/images/pdf/books/lsdmyproblemchild.pdf',
  },
  {
    title: 'The Mind-Body Problem',
    author: 'Rebecca Newberger Goldstein',
    rating: '7',
    year: '2020',
    href: 'https://www.amazon.com/dp/B00M1WRX3W/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1',
  },
  {
    title: 'The Singapore Story: Memoirs of Lee Kuan Yew',
    author: 'Lee Kuan Yew',
    rating: '9',
    year: '2019',
    href: 'https://www.amazon.com/Singapore-Story-Memoirs-Lee-Kuan/dp/0130208035',
  },
  {
    title: 'The Courage to be Disliked',
    author: 'Ichiro Kishimi and Fumitake Koga\n',
    rating: '10',
    year: '2019',
    href: 'https://www.amazon.com/The-Courage-to-be-Disliked/dp/1760630497',
  },
  {
    title: 'The Gervais Principle',
    author: 'Venkatesh Rao',
    rating: '8',
    year: '2019',
    href: 'https://www.amazon.com/gp/product/B00F9IV64W',
  },
  {
    title: 'Writing Down the Bones: Freeing the Writer Within',
    author: 'Natalie Goldberg',
    rating: '8',
    year: '2019',
    href: 'https://amzn.to/2MaDLc8',
  },
  {
    title: 'Stubborn Attachments: A Vision for a Society of Free, Prosperous, and Responsible Individuals',
    author: 'Tyler Cowen',
    rating: '8',
    year: '2019',
    href: 'https://amzn.to/2UBqeht',
  },
  {
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    rating: '9',
    year: '2019',
    href: 'https://amzn.to/2OP7gxH',
  },
  {
    title: 'Hackers & Painters: Big Ideas from the Computer Age',
    author: 'Paul Graham',
    rating: '8',
    year: '2019',
    href: 'https://amzn.to/2Tv3wC9',
  },
  {
    title: 'Digital Minimalism: Choosing a Focused Life in a Noisy World',
    author: 'Cal Newport',
    rating: '10',
    year: '2019',
    href: 'https://amzn.to/2EseoLR',
  },
  {
    title: 'The Master Switch: The Rise and Fall of Information Empires',
    author: 'Tim Wu',
    rating: '8',
    year: '2019',
    href: 'https://amzn.to/2tLIzsg',
  },
  {
    title: 'Mastering Ethereum: Building Smart Contracts and DApps',
    author: 'Andreas M. Antonopoulos',
    rating: '7',
    year: '2019',
    href: 'https://amzn.to/2VyHr7f',
  },
  {
    title: 'Straw Dogs: Thoughts on Humans and Other Animals',
    author: 'John Gray',
    rating: '9',
    year: '2019',
    href: 'https://amzn.to/2FHzTKS',
  },
  {
    title: 'Stories of Your Life and Others',
    author: 'Ted Chiang',
    rating: '10',
    year: '2019',
    href: 'https://amzn.to/2FGwV9e',
  },
  {
    title: 'The Hard Thing About Hard Things',
    author: 'Ben Horowitz',
    rating: '8',
    year: '2018',
    href: 'https://amzn.to/2BMOJfl',
  },
  {
    title: 'Skin in the Game: Hidden Asymmetries in Daily Life',
    author: 'Nassim Nicholas Taleb',
    rating: '9',
    year: '2018',
    href: 'https://amzn.to/2BKou9m',
  },
  {
    title: 'When Breath Becomes Air',
    author: 'Paul Kalanithi',
    rating: '7',
    year: '2018',
    href: 'https://amzn.to/2AgIyQG',
  },
  {
    title: 'Why  We Sleep: Unlocking the Power of Sleep and Dreams',
    author: 'Matthew Walker',
    rating: '9',
    year: '2018',
    href: 'https://amzn.to/2RdjdAR',
  },
  {
    title: 'A Wild Sheep Chase',
    author: 'Haruki Murakami',
    rating: '10',
    year: '2018',
    href: 'https://amzn.to/2rUcBcg',
  },
  {
    title: 'Pinball',
    author: 'Haruki Murakami',
    rating: '7',
    year: '2018',
    href: 'https://amzn.to/2Lzg9cZ',
  },
  {
    title: 'Hear the Wind Sing',
    author: 'Haruki Murakami',
    rating: '8',
    year: '2018',
    href: 'https://amzn.to/2Shuu0x',
  },
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    rating: '7',
    year: '2018',
    href: 'https://amzn.to/2Sgm49t',
  },
  {
    title: 'How to Say No Without Feeling Guilty',
    author: 'Patti Breitman & Connie Hatch',
    rating: '6',
    year: '2018',
    href: 'https://amzn.to/2CxkStb',
  },
  {
    title: 'The Culture Code',
    author: 'Daniel Coyle',
    rating: '7',
    year: '2018',
    href: 'https://amzn.to/2SgdPdF',
  },
  {
    title: 'Antifragile',
    author: 'Nassim Nicholas Taleb',
    rating: '10',
    year: '2018',
    href: 'https://amzn.to/2V9ba7h',
  },
  {
    title: 'The Black Swan',
    author: 'Nassim Nicholas Taleb',
    rating: '9',
    year: '2018',
    href: 'https://amzn.to/2LzfXdL',
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    rating: '9',
    year: '2018',
    href: 'https://amzn.to/2LxkvS7',
  },
  {
    title: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
    author: 'Ashlee Vance',
    rating: '7',
    year: '2018',
    href: 'https://amzn.to/2V5KYuj',
  },
]


const Container = styled.div`
  margin: 1rem;
`

const Text = styled.p`
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
`

const InfoContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 4fr;
  max-width: 400px;
`

const linkProps = { target: '_blank', rel: 'noopener noreferrer' }

const Frame = styled.iframe`
  width: 100% !important;
  height: 100% !important;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
`

const Home = () => (
  <div>
    <Head>
      <title>tbtstl</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <Bold>tbtstl</Bold>
      <Text>Building Things</Text>
      <CanvasContainer>
        <SketchWrapper sketch={defaultSketch} />
      </CanvasContainer>
      <InfoContainer>
        <div><Bold>About</Bold></div>
        <div><Text>
          tbtstl is co-founder and CTO of <BaseLink {...linkProps} href={'https://zora.co'}>Zora</BaseLink>.<br />
          Previously, <BaseLink {...linkProps} href={'https://commerce.coinbase.com'}>Coinbase
            Commerce</BaseLink> and <BaseLink {...linkProps} href={'https://telmediq.com'}>Telmediq</BaseLink>.<br />
          Also, some things on <BaseLink {...linkProps} href={'https://github.com/tbtstl'}>Github</BaseLink>.
        </Text></div>
        <div><Bold>Contact</Bold></div>
        <div><Text>
          <BaseLink {...linkProps} href={'https://zora.co/tyson'}>zora</BaseLink> <br />
          <BaseLink {...linkProps} href={'https://github.com/tbtstl'}>github</BaseLink> <br />
          <BaseLink {...linkProps} href={'https://twitter.com/tbtstl'}>twitter</BaseLink> <br />
        </Text></div>
        <div><Bold>Reading</Bold></div>
        <div>
          {BOOKS.map((book, idx) => (
            <Text key={idx} mb>
              {book.year} <br />
              <BaseLink {...linkProps} href={book.href}>{book.title}</BaseLink><br />
              {book.author} <br />
            </Text>
          ))}
        </div>
      </InfoContainer>
    </Container>
  </div>
)

export default Home
