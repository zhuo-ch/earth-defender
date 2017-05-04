
const FALLING = 'RED';
const SHOOTING = 'BLUE';

class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.color = 'Blue';
    this.game = game;
  }

  draw(ctx) {
    const startPoint = this.pos.map((vect, idx) => {
      if ((vect - (this.vel[idx]*10)) < 0) {
        return 0;
      } else {
        return vect - (this.vel[idx]*10);
      }
    });
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.stroke();
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }
}

export default Missile;
