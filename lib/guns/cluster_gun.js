import * as Util from '../util/util';
import * as DrawUtil from '../util/draw_util';
import Explosion from '../util/explosion';

class ClusterGun {
  constructor({pos, vel, endPos, nav}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = Util.getMissileVel(pos, endPos, 30);
    this.nav = nav;
    this.maxRadius = 40;
    this.color = 'teal';
    this.nav.playCluster();
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    const startPos = Util.getStartPos(pos, vel, this.endPos);
    DrawUtil.drawProjectile({ctx, pos, vel, startPos, color});
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

    this.nav.playClusterExplosion();
    return explosions;
  }
}

export default ClusterGun;
