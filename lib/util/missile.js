import * as Util from './util';
import Explosion from './explosion';

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

  explode() {
    const maxRadius = 60;
    const explosion = new Audio('./audio/missileExplosion.wav');
    explosion.volume = 1;
    explosion.play();
    return new Explosion({pos: this.pos, color: this.color, maxRadius});
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }
}

export default Missile;
