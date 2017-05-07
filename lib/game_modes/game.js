import Missile from '../util/missile';
import Rocket from '../guns/rocket';
import * as Util from '../util/util';
import Explosion from '../util/explosion';
import ClusterGun from '../guns/cluster_gun';
import GravityGun from '../guns/gravity_gun';
import Laser from '../guns/laser';

class Game {
  constructor({dimX, dimY, endGame, images}) {
  this.score = 0;
  this.time = 0;
  this.shields = 20;
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.images = images;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.currentGun = 'Rocket';
  this.canShoot = true;
  this.resetLaser = this.resetLaser.bind(this);
  this.deleteLaser = this.deleteLaser.bind(this);
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

  resetLaser() {
    this._deleteLaser = setTimeout(this.deleteLaser, 100);
    if (this.laserAudio) {
      this.laserAudio.pause();
    }
  }

  deleteLaser() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile instanceof Laser) {
        this.projectiles.splice(idx, 1);
        this.canShoot = true;
      }
    });
    clearTimeout(this._deleteLaser);
  }

  setCooldown(time) {
    this.cooldownTimer = setTimeout(() => {
      this.canShoot = true;
    }, time);
  }

  shoot(endPos) {
    const pos = [this.dimX/2, this.dimY-40];
    const vel = Util.getVel(pos, endPos);
    const audio = this.audio;

    switch (this.currentGun) {
      case 'Rocket':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new Rocket({pos, vel, endPos}));
          this.setCooldown(500);
          this.canShoot = false;
        }
        break;
      case 'ClusterGun':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new ClusterGun({pos, vel, endPos}));
          this.setCooldown(750);
          this.canShoot= false;
        }
        break;
      case 'GravityGun':
        if (this.canShoot) {
          this.projectiles.push(new GravityGun({pos, vel, endPos}));
          this.setCooldown(2000);
          this.canShoot = false;
        }
        break;
      case 'Laser':
        if (this.canShoot) {
          this.projectiles.push(new Laser({pos, game: this, endPos}));
          this.canShoot = false;
          this.laserAudio = new Audio('./audio/laser.wav');
          this.laserAudio.volume = 0.05;
          this.laserAudio.loop = true;
          this.laserAudio.play();
        }
        break;
      default:
        break;
    }
  }

  addMissiles() {
    const missilesCount = Math.floor(Math.random() * (this.maxMissiles/2));
    for (let i = 0; i < missilesCount; i++) {
      const pos = Util.randomPosition(this.dimX);
      const endPos = Util.randomEnd(this.dimX, this.dimY);
      const vel = Util.getVel(pos, endPos);
      const game = this;
      const m = new Missile({pos, vel, game});
      this.projectiles.push(m);
    }
  };

  moveProjectiles() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile.radius && projectile.checkExplosion()) {
        this.projectiles.splice(idx, 1);
      } else {
        projectile.move();
      }
    });
  }

  checkExplosionHits(explosions, missiles) {
    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          const hit = new Audio('./audio/missileCollide.mp3');
          hit.currentTime = 2;
          hit.play();
          this.score += this.maxMissiles * missiles.length * this.time * this.shields;
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });
  }

  checkMissileHits(missiles) {
    missiles.forEach(missile => {
      if (missile.isCollidedWith()) {
        const idx = this.projectiles.indexOf(missile);
        this.projectiles.splice(idx, 1);
        this.projectiles.push(missile.explode());
        this.shields -= 1;
      }
    });
  }

  checkCollisions() {
    const explosions = this.projectiles.filter(mis => mis.radius);
    const missiles = this.projectiles.filter(mis => !mis.radius && mis.color === 'red');
    this.checkExplosionHits(explosions, missiles);
    this.checkMissileHits(missiles);
  }

  willExplode() {
    this.projectiles.forEach((projectile, idx) => {
       if (projectile.endPos && projectile.willExplode()) {
        const pos = projectile.pos;
        const color = projectile.color;
        this.projectiles.splice(idx, 1);
        projectile.explode({pos, color}).forEach(exp => this.projectiles.push(exp));
      }
    });
  }

  draw(ctx) {
    this.willExplode();
    ctx.drawImage(this.images.background,0,0,this.dimX, this.dimY);
    this.projectiles.forEach(projectile => projectile.draw(ctx, game));
    Util.drawBar(ctx, this.score, this.time, this.shields, this.dimX);
    Util.drawCurrentGun(ctx, this.currentGun);
    Util.drawIcons(ctx, this.images);
    Util.drawControls(ctx);
  }

  step(ctx) {
    this.checkCollisions();
    this.moveProjectiles();
    this.draw(ctx)

    if (this.shields <= 0) {
      this.endGame();
    }
  };
}

export default Game;