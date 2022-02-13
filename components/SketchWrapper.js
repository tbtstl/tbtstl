import React, { useCallback, useRef, useEffect } from 'react';

const SketchWrapper = (props) => {
  const p5Instance = useRef(null)
  const wrapperEl = useRef(null)
  const {sketch} = props

  const setup = useCallback(() => {
    // p5JS requires a window reference, so we async load it here
    import('p5')
      .then((mod) => {
        const P5 = mod.default
        if(wrapperEl.current && !p5Instance.current) {
          p5Instance.current = new P5(sketch, wrapperEl.current)
        }
      })
  }, [sketch, wrapperEl.current, p5Instance.current])

  useEffect(() => {
    setup()
  }, [setup])
  return (
    <div ref={wrapperEl}/>
  )
}

export default SketchWrapper