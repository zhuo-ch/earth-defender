import * as DrawUtil from './util/draw_util';

class Nav {
  constructor(images) {
    this.images = images;
    this.score = 0;
    this.time = 0;
    this.shields = 20;
    this.currentGun = 'Rocket';
    this.startTimer();
    this.setGun();
  }

  setGun() {
    document.addEventListener('keydown', (e) => {
      this.canShoot = true;
      if (this.cooldownTimer) {
        clearTimeout(this.cooldownTimer);
      }

      switch (e.key) {
        case 'a':
          this.currentGun = 'Rocket';
          break;
        case 's':
          this.currentGun = 'ClusterGun';
          break;
        case 'd':
          this.currentGun = 'GravityGun';
          break;
        case 'f':
          this.currentGun = 'Laser';
          break;
        default:
          break;
      }
    });
  }

  addScore(score) {
    this.score += score;
  }

  subtractShield() {
    this.shields -= 1;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  draw(ctx, dimX) {
    DrawUtil.drawBar(ctx, this.score, this.time, this.shields, dimX);
    DrawUtil.drawCurrentGun(ctx, this.currentGun);
    DrawUtil.drawIcons(ctx, this.images);
    DrawUtil.drawControls(ctx);
  }

  gameOver() {
    if (this.shields <= 0) {
      this.stopTimer;
    }

    return this.shields <= 0;
  }
}

export default Nav;
