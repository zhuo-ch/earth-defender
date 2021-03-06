import * as Util from '../util/util';

class Laser {
  constructor({pos, game, endPos, bounds}) {
    this.pos = pos;
    this.game = game
    this.startPos = [game.dimX/2, game.dimY-40];
    this.endPos = endPos;
    this.bounds = bounds;
    this.constSpeed = 20;
    this.vel = Util.getMissileVel(this.startPos, endPos, this.constSpeed);
    this.color = 'green';
    this.handleMove = this.handleMove.bind(this);
    document.addEventListener('mousemove', this.handleMove);
  }

  handleMove(e) {
    const mouseX = e.clientX - this.bounds[0];
    const mouseY = e.clientY - this.bounds[1];
    this.endPos = [mouseX, mouseY];
  }

  draw(ctx) {
    const wide = Math.random() < 0.6 ? 0 : 4;
    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = wide;
    ctx.stroke();
  }

  move() {
    this.vel = Util.getMissileVel(this.pos, this.endPos, this.constSpeed);
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return true;
  }

  explode() {
    document.removeEventListener('mousemove', this.handleMove);
    const pos = this.pos;
    const color = this.color;
    return [
      new Laser({pos, game: this.game, endPos: this.endPos, bounds: this.bounds}),
      new LaserExplosion({pos, color})
    ];
  }
}

class LaserExplosion {
  constructor({pos, color}) {
    this.pos = pos;
    this.color = color;
    this.radius = 8;
    this.maxRadius = this.radius;
  }

  move() {
  }

  isCollidedWith(otherObj) {
    return Util.isCollidedWith(this, otherObj);
  }

  checkExplosion() {
    return true;
  }

  draw(ctx) {
    if (Math.random() < 0.3) {
      return ;
    }
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
}

export default Laser;
