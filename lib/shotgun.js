import * as Util from './util';

class Shotgun {
  constructor({pos, vel, endPos, game}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.game = game;
    this.color = 'blue';
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    Util.drawProjectile({ctx, pos, vel, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  explode({pos, color}) 
}

export default Shotgun;
