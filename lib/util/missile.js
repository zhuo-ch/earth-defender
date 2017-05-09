import * as Util from './util';
import * as DrawUtil from './draw_util';
import Explosion from './explosion';

class Missile {
  constructor({ game }) {
    this.constSpeed = game.constSpeed;
    this.pos = Util.getRandomStart(game.dimX);
    this.endPos = Util.getRandomEnd(game.dimX, game.dimY);
    this.vel = Util.getMissileVel(this.pos, this.endPos, this.constSpeed);
    this.game = game;
    this.maxRadius = 60;
    this.color = 'red';
  }

  draw(ctx) {
    const startPos = Util.getMissileStart(this.pos, this.vel);
    DrawUtil.drawProjectile({ctx, pos: this.pos, vel: this.vel, startPos, color: this.color});
  }

  move() {
    this.vel = Util.getMissileVel(this.pos, this.endPos, this.constSpeed);
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  explode() {
    this.game.nav.playMissileExplosion();
    return new Explosion({pos: this.pos, color: this.color, maxRadius: this.maxRadius});
  }

  willExplode() {
    this.isCollidedWith();
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }
}

export default Missile;
