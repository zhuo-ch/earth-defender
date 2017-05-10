import * as Util from '../util/util';
import Explosion from '../util/explosion';

class GravityGun {
  constructor({pos, vel, endPos, nav}) {
    this.endPos = [endPos[0], -200];
    this.pos = pos;
    this.constSpeed = 15
    this.vel = Util.getMissileVel(pos, endPos, this.constSpeed);
    this.nav = nav;
    this.radius = 60;
    this.maxRadius = 70;
    this.color1 = 'midnightblue';
    this.color2 = 'black';
    this.playGravity();
  }

  playGravity() {
    this.gravity = new Audio('./assets/audio/gravity.wav');
    this.nav.allAudio.push(this.gravity);
    this.gravity.loop = true;
    this.gravity.volume = 0.1;
    this.nav.soundOn ? this.gravity.play() : "";
  }

  draw(ctx) {
    ctx.beginPath();
    const x = this.pos[0];
    const y = this.pos[1];
    const color1 = Math.random() < 0.5 ? this.color1 : this.color2;
    const color2 = Math.random() < 0.5 ? this.color1 : this.color2;


    const grd = ctx.createRadialGradient(
      x,
      y,
      Math.floor(this.radius/7),
      x,
      y,
      this.radius
    );

    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = grd;
    ctx.fill();
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + (this.vel[idx]/2));
  }

  isCollidedWith(otherObject) {
    const x1 = this.pos[0];
    const x2 = otherObject.pos[0];
    const y1 = this.pos[1];
    const y2 = otherObject.pos[1];

    const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

    return distance < this.radius;
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  checkExplosion() {
    const destroy = (
      (this.pos[0] <= -60) ||
      (this.pos[1] <= -60) ||
      (this.pos[0] >= 690)
    )
    if (destroy) {
      this.gravity.muted = true;
    }
    return destroy;
  }

  explode({pos, color}) {
    const explosions = [];
    return explosions;
  }
}

export default GravityGun;
