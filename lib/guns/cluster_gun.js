import * as Util from '../util/util';
import Explosion from '../util/explosion';

class ClusterGun {
  constructor({pos, vel, endPos, soundOn}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.soundOn = soundOn;
    this.maxRadius = 30;
    this.color = 'teal';
    this.playAudio();
  }

  playAudio() {
    const cluster = new Audio('./assets/audio/cluster.wav');
    window.allAudio.push(cluster);
    cluster.volume = 0.1;
    this.soundOn ? cluster.play() : "";
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    const startPos = Util.getStartPos(pos, vel, this.endPos);
    Util.drawProjectile({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + (this.vel[idx]*3/4));
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const explosions = [];

    for (let i=0; i<6; i++) {
      const plusMinus = Math.random() < 0.5 ? -1 : 1;
      const newPos = pos.map(vect => vect + (Math.random()*100) * plusMinus);
      explosions.push(new Explosion({pos: newPos, color, maxRadius: this.maxRadius}));
    }

    const clusterExplosion = new Audio('./assets/audio/clusterExplosion.wav');
    window.allAudio.push(clusterExplosion);
    clusterExplosion.volume = 0.5;
    this.soundOn ? clusterExplosion.play() : "";

    return explosions;
  }
}

export default ClusterGun;
