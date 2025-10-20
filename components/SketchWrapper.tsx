import React, { useCallback, useRef, useEffect } from 'react'
import defaultSketch from '../sketches/defaultSketch'
import createPostSketch from '../sketches/postSketch'

type Sketch = (p: any) => void

type SketchWrapperProps = {
  sketch?: Sketch
  coverImage?: string
}

const SketchWrapper = (props: SketchWrapperProps) => {
  const p5Instance = useRef<any | null>(null)
  const wrapperEl = useRef<HTMLDivElement | null>(null)
  const { sketch, coverImage } = props

  // Determine which sketch to use
  const selectedSketch = sketch || (coverImage ? createPostSketch(coverImage) : defaultSketch)

  const setup = useCallback(() => {
    import('p5')
      .then((mod) => {
        const P5 = mod.default as any
        if (wrapperEl.current && !p5Instance.current) {
          p5Instance.current = new P5(selectedSketch, wrapperEl.current)
        }
      })
  }, [selectedSketch])

  useEffect(() => {
    setup()
  }, [setup])
  return (
    <div ref={wrapperEl}/>
  )
}

export default SketchWrapper
