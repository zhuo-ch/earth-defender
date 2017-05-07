import * as Util from '../util/util';
import Explosion from '../util/explosion';

class GravityGun {
  constructor({pos, vel, endPos}) {
    this.endPos = [endPos[0], -200];
    this.pos = pos;
    this.vel = vel;
    this.radius = 60;
    this.maxRadius = 70;
    this.color1 = 'midnightblue';
    this.color2 = 'blue';
    this.playAudio();
  }

  playAudio() {
    this.gravity = new Audio('./audio/gravity.wav');
    this.gravity.loop = true;
    this.gravity.volume = 0.05;
    this.gravity.play();
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
      (this.pos[0] >= 690) ||
      (this.pos[1] >= 540)
    )
    if (destroy) {
      this.gravity.pause();
    }
  }

  explode({pos, color}) {
    const explosions = [];
    return explosions;
  }
}

export default GravityGun;
