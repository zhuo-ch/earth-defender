import Missile from '../util/missile';
import Rocket from '../guns/rocket';
import * as Util from '../util/util';
import * as DrawUtil from '../util/draw_util';
import Explosion from '../util/explosion';
import ClusterGun from '../guns/cluster_gun';
import GravityGun from '../guns/gravity_gun';
import Laser from '../guns/laser';
import Nav from '../nav';

class Game {
  constructor({dimX, dimY, endGame, images, bounds}) {
  this.nav = new Nav(images);
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.images = images;
  this.bounds = bounds;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.canShoot = true;
  this.resetLaser = this.resetLaser.bind(this);
  this.deleteLaser = this.deleteLaser.bind(this);
  }


  resetLaser() {
    document.getElementsByClassName('game-display')[0].removeAttribute('className', 'laser');
    this._deleteLaser = setTimeout(this.deleteLaser, 100);
    if (this.nav.laserAudio) { this.nav.laserAudio.pause() };
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
    const soundOn = this.nav.soundOn;

    switch (this.nav.currentGun) {
      case 'Rocket':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new Rocket({pos, vel, endPos, soundOn}));
          this.setCooldown(500);
          this.canShoot = false;
        }
        break;
      case 'ClusterGun':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new ClusterGun({pos, vel, endPos, soundOn}));
          this.setCooldown(750);
          this.canShoot= false;
        }
        break;
      case 'GravityGun':
        if (this.canShoot) {
          this.projectiles.push(new GravityGun({pos, vel, endPos, soundOn}));
          this.setCooldown(2000);
          this.canShoot = false;
        }
        break;
      case 'Laser':
        if (this.canShoot) {
          this.projectiles.push(new Laser({pos, game: this, endPos, bounds: this.bounds, soundOn }));
          this.canShoot = false;
          this.nav.startLaser();
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
          this.nav.addHit(this.maxMissiles, missiles);
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
        this.nav.shields -= 1;
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
    this.nav.draw(ctx, this.dimX);
  }

  step(ctx) {
    this.checkCollisions();
    this.moveProjectiles();
    this.draw(ctx)

    if (this.nav.gameOver()) {
      this.endGame();
    }
  };
}

export default Game;
