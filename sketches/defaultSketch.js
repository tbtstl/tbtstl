import {p5SizingDefaults} from './utils'
import {Agent} from './Agent'
import colors from '../colors'

const defaultSketch = (p) => {
  const agents = []
  const agentCount = window.innerWidth
  const noiseScale = 300
  const noiseStrength = 10
  const strokeWidth = 0.1
  const drawMode = 1
  const agentColors = [colors.brand, colors.black, colors.red]

  const setup = () => {
    p.frameRate(24)
    for (let i = 0; i < agentCount; i++) {
      agents[i] = new Agent(p)
    }
  }

  p5SizingDefaults(p, setup)

  p.draw = function () {
    p.fill('rgba(0,0,0,0)')
    p.noStroke()
    p.rect(0, 0, p.width, p.height)

    // Draw agents
    for (let i = 0; i < agentCount; i++) {
      p.stroke(agentColors[i%agentColors.length])
      if(drawMode === 1) {
        agents[i].update1(noiseScale * Math.random() * 1.1, noiseStrength * Math.random() * 1.1, strokeWidth)
      } else {
        agents[i].update2(noiseScale * Math.random() * 1.1, noiseStrength * Math.random() * 1.1, strokeWidth)
      }
    }
  };
};

export default defaultSketch