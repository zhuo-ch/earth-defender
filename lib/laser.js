import * as Util from './util';

class Laser {
  constructor({pos, game, endPos}) {
    this.game = game
    this.startPos = [game.dimX/2, game.dimY];
    this.pos = pos;
    this.vel = Util.getVel(this.startPos, endPos);
    this.endPos = endPos;
    this.color = 'green';
    this.listenMouse();
  }

  listenMouse() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      this.endPos = [mouseX, mouseY];
    })
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
    this.vel = Util.getVel(this.pos, this.endPos);
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return true;
  }

  explode() {
    const pos = this.pos;
    const color = this.color;
    return [
      new Laser({pos, game: this.game, endPos: this.endPos}),
      new LaserExplosion({pos, color})
    ];
  }
}

class LaserExplosion {
  constructor({pos, color}) {
    this.pos = pos;
    this.color = color;
    this.radius = 15;
    this.maxRadius = this.radius;
  }

  move() {
  }

  isCollidedWith(otherObj) {
    return Util.isCollidedWith(this, otherObj);
  }

  draw(ctx) {
    if (Math.random() < 0.5) {
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