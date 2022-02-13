class Agent {
  constructor(p) {
    this.p = p
    this.vector = p.createVector(p.random(p.width), p.random(p.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = p.random(1, 3);
    this.isOutside = false;
  }

  update(strokeWidth) {
    this.vector.x += this.p.cos(this.angle) * this.stepSize;
    this.vector.y += this.p.sin(this.angle) * this.stepSize;
    this.isOutside = this.vector.x < 0 || this.vector.x > this.p.width || this.vector.y < 0 || this.vector.y > this.p.height;
    if (this.isOutside) {
      this.vector.set(this.p.random(this.p.width), this.p.random(this.p.height));
      this.vectorOld = this.vector.copy();
    }
    this.p.strokeWeight(strokeWidth * this.stepSize);
    this.p.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  }

  update1(noiseScale, noiseStrength, strokeWidth) {
    this.angle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
    this.update(strokeWidth);
  }

  update2(noiseScale, noiseStrength, strokeWidth) {
    this.angle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
    this.angle = (this.angle - this.p.floor(this.angle)) * noiseStrength;
    this.update(strokeWidth);
  }
}

export {Agent}