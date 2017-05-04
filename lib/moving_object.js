
function Missile (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
  }

  const FALLING = 'RED';
  const SHOOTING = 'BLUE';

  Missile.prototype.draw(ctx) {
    const startPoint = len.map((vect, idx) => this.pos[idx] - (vect*3));
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(startPoint);
    ctx.lineTo(this.pos);
    ctx.stroke();
  }

  Missile.prototype.move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

export default Missile;
