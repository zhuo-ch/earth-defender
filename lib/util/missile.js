import * as Util from './util';
import * as DrawUtil from './draw_util';
import Explosion from './explosion';

class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.game = game;
    this.maxRadius = 60;
    this.color = 'red';
  }

  draw(ctx) {
    const vel = this.vel;
    const color = this.color;
    const pos = this.pos;
    const startPos = Util.getMissileStart(pos, vel);
    DrawUtil.drawProjectile({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  explode() {
    this.setAudio();
    return new Explosion({pos: this.pos, color: this.color, maxRadius: this.maxRadius});
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }

  setAudio(){
    const explosion = new Audio('./assets/audio/missileExplosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 1;
    this.game.soundOn ? explosion.play() : "";
  }
}

export default Missile;
