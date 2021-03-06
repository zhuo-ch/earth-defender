import * as Util from './util';

class Explosion {
  constructor({pos, color, maxRadius}) {
    this.pos = pos;
    this.color = color;
    this.maxRadius = maxRadius;
    this.radius = 2;
    this.expand = 1;
  }

  draw(ctx) {
    ctx.beginPath();
    const x = this.pos[0];
    const y = this.pos[1];

    const grd = ctx.createRadialGradient(
      x,
      y,
      Math.floor(this.radius/7),
      x,
      y,
      this.radius
    );

    grd.addColorStop(0, 'white');
    grd.addColorStop(1, this.color);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = grd;
    ctx.fill();
  }

  isCollidedWith(otherObj) {
    return Util.isCollidedWith(this, otherObj);
  };

  checkExplosion() {
    return this.radius <= 1;
  }

  move() {
    if (this.radius >= this.maxRadius) {
      this.expand = -0.75;
    }

    this.radius += this.expand;
  }
}

export default Explosion;
