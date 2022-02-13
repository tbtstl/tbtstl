import {resolve} from 'url'
import styled from 'styled-components'
import React, {useMemo} from 'react'

export const BaseLink = ({href, as, ...rest}) => {

  const newAs = useMemo(() => {
    let baseURI_as = as || href

    // make absolute url relative
    // when displayed in url bar
    if (baseURI_as.startsWith('/')) {
      //  for static html compilation
      baseURI_as = '.' + href
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

      // on the client
      //   document is unavailable when compiling on the server
      if (typeof document !== 'undefined') {
        baseURI_as = resolve(document.baseURI, baseURI_as)
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }
    return baseURI_as
  }, [as, href])

  return <Link {...rest} href={href} />
}

const Link = styled.a`
  color: inherit;

  &:visited {
    color: inherit;
  }
`