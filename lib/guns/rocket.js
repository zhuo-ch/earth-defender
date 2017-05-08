import * as Util from '../util/util';
import * as DrawUtil from '../util/draw_util';
import Explosion from '../util/explosion';

class Rocket {
  constructor({pos, vel, endPos, soundOn}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.soundOn = soundOn;
    this.maxRadius = 80;
    this.color = 'blue';
    this.playAudio();
  }

  playAudio() {
    const rocket = new Audio('./assets/audio/rocket.wav');
    window.allAudio.push(rocket);
    rocket.volume = 0.1;
    this.soundOn ? rocket.play() : "";
  }

  draw(ctx) {
    const vel = this.vel;
    const pos = this.pos;
    const color = this.color;
    const startPos = Util.getStartPos(pos, vel, this.endPos);
    DrawUtil.drawProjectile({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const maxRadius = this.maxRadius;
    const explosion = new Audio('./assets/audio/explosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 0.05;
    this.soundOn ? explosion.play() : "";
    return [new Explosion({pos, color, maxRadius})];
  }

}

export default Rocket;
