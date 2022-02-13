const p5SizingDefaults = (p5, setup) => {
  const width = () => p5._userNode.offsetWidth
  const height = () => Math.min(Math.floor(width() / 1.618), window.innerHeight*.75)

  p5.setup = function () {
    p5.createCanvas(width(), height())

    p5.frameRate(30);

    if(setup) {
      setup()
    }
  }

  p5.windowResized = function() {
    p5.resizeCanvas(width(), height())
  }
}

export {p5SizingDefaults}