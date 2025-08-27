import React, { useCallback, useRef, useEffect } from 'react'

type Sketch = (p: any) => void

type SketchWrapperProps = {
  sketch: Sketch
}

const SketchWrapper = (props: SketchWrapperProps) => {
  const p5Instance = useRef<any | null>(null)
  const wrapperEl = useRef<HTMLDivElement | null>(null)
  const { sketch } = props

  const setup = useCallback(() => {
    import('p5')
      .then((mod) => {
        const P5 = mod.default as any
        if (wrapperEl.current && !p5Instance.current) {
          p5Instance.current = new P5(sketch, wrapperEl.current)
        }
      })
  }, [sketch])

  useEffect(() => {
    setup()
  }, [setup])
  return (
    <div ref={wrapperEl}/>
  )
}

export default SketchWrapper
