import * as Util from './util';

class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.color = 'red';
    this.game = game;
  }

  draw(ctx) {
    const vel = this.vel;
    const color = this.color;
    const pos = this.pos;
    const startPos = pos.map((vect, idx) => {
      const newVect = vect - (vel[idx] * 10);
      return newVect < 0 ? 0 : newVect;
    });
    Util.drawProjectile({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }
}

export default Missile;
