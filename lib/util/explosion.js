import * as Util from './util';

class Explosion {
  constructor({pos, color, maxRadius}) {
    this.pos = pos;
    this.radius = 2;
    this.color = color;
    this.maxRadius = maxRadius;
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
    return this.radius >= this.maxRadius;
  }

  move() {
    this.radius += 1;
  }
}

export default Explosion;
