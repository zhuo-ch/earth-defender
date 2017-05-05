import * as Util from './util';
import Explosion from './explosion';

class Rocket {
  constructor({pos, vel, endPos}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.maxRadius = 80;
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

  explode({pos, color}) {
    const maxRadius = this.maxRadius;
    return [new Explosion({pos, color, maxRadius})];
  }

}

export default Rocket;
