import * as DrawUtil from './util/draw_util';

class Nav {
  constructor(images) {
    this.images = images;
    this.score = 0;
    this.time = 0;
    this.shields = 20;
    this.currentGun = 'Rocket';
    this.soundOn = true;
    this.music = new Audio('./assets/audio/OVERTURN.wav')
    this.musicOn = true;
    this.playMusic();
    this.startTimer();
    this.setGun();
  }

  startLaser() {
    this.laserAudio = new Audio('./assets/audio/laser.wav');
    this.laserAudio.volume = 0.2;
    this.laserAudio.loop = true;
    window.allAudio.push(this.laserAudio);
    this.soundOn ? this.laserAudio.play() : "";
  }

  playMusic() {
    this.music.volume = 0.05;
    this.music.loop = true;
    this.music.play();
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

  toggleSound() {
    if (this.soundOn) {
      window.allAudio.forEach(aud => aud.muted = true);
      this.soundOn = false;
    } else {
      window.allAudio.forEach(aud => aud.muted = false);
      this.soundOn = true;
    }
  }

  toggleMusic() {
    if (this.musicOn) {
      this.music.muted = true;
      this.musicOn = false;
    } else {
      this.music.muted = false;
      this.musicOn = true;
    }
  }

  addHit(maxMissiles, missiles) {
    const hit = new Audio('./assets/audio/missileCollide.wav');
    window.allAudio.push(hit);
    hit.volume = 0.15;
    this.soundOn ? hit.play() : "";
    this.score += maxMissiles * missiles.length * this.time * this.shields;
  }

  playMissileExplosion() {
    const explosion = new Audio('./assets/audio/missileExplosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 1;
    this.soundOn ? explosion.play() : "";
  }

  playCluster() {
    const cluster = new Audio('./assets/audio/cluster.wav');
    window.allAudio.push(cluster);
    cluster.volume = 0.1;
    this.soundOn ? cluster.play() : "";
  }

  playClusterExplosion() {
    const clusterExplosion = new Audio('./assets/audio/clusterExplosion.wav');
    window.allAudio.push(clusterExplosion);
    clusterExplosion.volume = 0.5;
    this.soundOn ? clusterExplosion.play() : "";
  }

  playGravity() {
    this.gravity = new Audio('./assets/audio/gravity.wav');
    window.allAudio.push(this.gravity);
    this.gravity.loop = true;
    this.gravity.volume = 0.1;
    this.soundOn ? this.gravity.play() : "";
  }

  playRocket() {
    const rocket = new Audio('./assets/audio/rocket.wav');
    window.allAudio.push(rocket);
    rocket.volume = 0.1;
    this.soundOn ? rocket.play() : "";
  }

  playRocketExplode() {
    const explosion = new Audio('./assets/audio/explosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 0.05;
    this.soundOn ? explosion.play() : "";
  }

  draw(ctx, dimX) {
    DrawUtil.drawBar(ctx, this.score, this.time, this.shields, dimX);
    DrawUtil.drawCurrentGun(ctx, this.currentGun);
    DrawUtil.drawIcons(ctx, this.images);
    DrawUtil.drawControls(ctx);
    DrawUtil.drawSound(ctx, this.images, this.soundOn, this.musicOn);
  }

  gameOver() {
    if (this.shields <= 0) {
      this.stopTimer;
    }

    return this.shields <= 0;
  }
}

export default Nav;
