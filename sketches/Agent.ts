class Agent {
  p: any
  vector: any
  vectorOld: any
  stepSize: number
  isOutside: boolean
  angle: number | undefined
  targetPosition: any | null
  color: string | null

  constructor(p: any) {
    this.p = p
    this.vector = p.createVector(p.random(p.width), p.random(p.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = p.random(1, 3);
    this.isOutside = false;
    this.targetPosition = null;
    this.color = null;
  }

  update(strokeWidth: number) {
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

  update1(noiseScale: number, noiseStrength: number, strokeWidth: number) {
    this.angle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
    this.update(strokeWidth);
  }

  update2(noiseScale: number, noiseStrength: number, strokeWidth: number) {
    this.angle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
    this.angle = (this.angle - this.p.floor(this.angle)) * noiseStrength;
    this.update(strokeWidth);
  }

  update3(noiseScale: number, noiseStrength: number, strokeWidth: number, attractionStrength: number) {
    // Calculate noise-based angle
    const noiseAngle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;

    // If we have a target position, blend noise angle with target angle
    if (this.targetPosition && attractionStrength > 0) {
      const dx = this.targetPosition.x - this.vector.x;
      const dy = this.targetPosition.y - this.vector.y;
      const targetAngle = this.p.atan2(dy, dx);

      // Blend between noise and target based on attraction strength
      this.angle = this.p.lerp(noiseAngle, targetAngle, attractionStrength);
    } else {
      // No target, use pure noise
      this.angle = noiseAngle;
    }

    this.update(strokeWidth);
  }

  updatePosition() {
    this.vector.x += this.p.cos(this.angle) * this.stepSize;
    this.vector.y += this.p.sin(this.angle) * this.stepSize;

    this.isOutside = this.vector.x < 0 || this.vector.x > this.p.width ||
                     this.vector.y < 0 || this.vector.y > this.p.height;

    if (this.isOutside) {
      this.vector.set(this.p.random(this.p.width), this.p.random(this.p.height));
    }

    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  }

  drawAsDot(baseSize: number = 2) {
    this.p.noStroke();
    this.p.circle(this.vector.x, this.vector.y, baseSize * this.stepSize);
  }

  update3Dot(noiseScale: number, noiseStrength: number, dotSize: number, attractionStrength: number) {
    // Calculate noise-based angle
    const noiseAngle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;

    // If we have a target position, blend noise angle with target angle
    if (this.targetPosition && attractionStrength > 0) {
      const dx = this.targetPosition.x - this.vector.x;
      const dy = this.targetPosition.y - this.vector.y;
      const targetAngle = this.p.atan2(dy, dx);

      // Blend between noise and target based on attraction strength
      this.angle = this.p.lerp(noiseAngle, targetAngle, attractionStrength);
    } else {
      // No target, use pure noise
      this.angle = noiseAngle;
    }

    this.updatePosition();
    this.drawAsDot(dotSize);
  }

  update3Orbit(noiseScale: number, noiseStrength: number, dotSize: number, attractionStrength: number, orbitStrength: number = 0.85) {
    // Calculate noise-based angle for organic randomness
    const noiseAngle = this.p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;

    // If we have a target position, create orbital motion
    if (this.targetPosition && attractionStrength > 0) {
      // Calculate vector to target
      const dx = this.targetPosition.x - this.vector.x;
      const dy = this.targetPosition.y - this.vector.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Prevent division by zero
      const safeDistance = Math.max(distance, 0.001);

      // Gravitational attraction angle (toward target)
      const attractAngle = this.p.atan2(dy, dx);

      // Orbital angle (perpendicular, 90° rotation for circular motion)
      const orbitAngle = attractAngle + this.p.HALF_PI;

      // Blend attraction and orbit based on orbitStrength
      // orbitStrength close to 1 = more circular orbits
      // orbitStrength close to 0 = more direct approach
      const targetAngle = this.p.lerp(attractAngle, orbitAngle, orbitStrength);

      // Blend noise with orbital motion based on convergence
      this.angle = this.p.lerp(noiseAngle, targetAngle, attractionStrength);
    } else {
      // No target, use pure noise
      this.angle = noiseAngle;
    }

    this.updatePosition();
    this.drawAsDot(dotSize);
  }
}

export { Agent }
