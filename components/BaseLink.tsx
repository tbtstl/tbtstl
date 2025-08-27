import React, { AnchorHTMLAttributes, useMemo } from 'react'
import styled from 'styled-components'

type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  as?: string
}

export const BaseLink = ({ href, as, ...rest }: BaseLinkProps) => {
  // Maintain previous behavior for IPFS base handling without Node 'url'
  const computedHref = useMemo(() => {
    let value = as || href
    if (value.startsWith('/')) {
      value = '.' + href
      if (typeof document !== 'undefined') {
        try {
          const u = new URL(value, document.baseURI)
          value = u.toString()
        } catch {}
      }
    }
    return value
  }, [as, href])

  return <Link {...rest} href={computedHref} />
}

const Link = styled.a`
  color: inherit;

  &:visited {
    color: inherit;
  }
`
