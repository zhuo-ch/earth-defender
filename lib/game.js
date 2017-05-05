import Missile from './missile';
import Rocket from './rocket';
import * as Util from './util';
import Explosion from './explosion';
import Shotgun from './shotgun';
import GravityGun from './gravity_gun';

class Game {
  constructor({dimX, dimY, endGame}) {
  this.score = 0;
  this.time = 0;
  this.shields = 20;
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.background = new Image();
  this.rocketIcon = new Image();
  this.shotgunIcon = new Image();
  this.gravityGunIcon = new Image();
  this.currentGun = 'Rocket';
  this.canShootGravity = true;
  this.canShootShotgun = true;
  this.setImages();
  this.setGun();
  }

  setGun() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.currentGun = 'Rocket';
          break;
        case 's':
          this.currentGun = 'Shotgun';
          break;
        case 'd':
          this.currentGun = 'GravityGun';
          break;
        default:
          break;
      }
    });
  }

  gravityGunCoolDown() {
    setTimeout(() => {
      this.canShootGravity = true;
    }, 2000);
  }

  shotgunCoolDown() {
    setTimeout(() => {
      this.canShootShotgun = true;
    }, 750);
  }

  addRocket(endPos) {
    const pos = [this.dimX/2, this.dimY];
    const vel = Util.getVel(pos, endPos);
    switch (this.currentGun) {
      case 'Rocket':
        this.projectiles.push(new Rocket({pos, vel, endPos}));
        break;
      case 'Shotgun':
        if (this.canShootShotgun) {
          this.projectiles.push(new Shotgun({pos, vel, endPos}));
          this.canShootShotgun = false;
          this.shotgunCoolDown();
        }
        break;
      case 'GravityGun':
        if (this.canShootGravity) {
          this.projectiles.push(new GravityGun({pos, vel, endPos}));
          this.canShootGravity = false;
          this.gravityGunCoolDown();
        }
      default:
        break;
    }
  }

  addMissiles() {
    const missilesCount = Math.floor(Math.random() * (this.maxMissiles/2));
    for (let i = 0; i < missilesCount; i++) {
      const pos = this.randomPosition();
      const endPos = this.randomEnd();
      const vel = Util.getVel(pos, endPos);
      const game = this;
      const m = new Missile({pos, vel, game, });
      this.projectiles.push(m);
    }
  };

  randomEnd() {
    const randX = Math.floor(Math.random() * this.dimX);
    const randY = this.dimY;
    return [randX, randY];
  }

  randomPosition() {
    const randX = Math.floor(Math.random() * this.dimX);
    const randY = 0;
    return [randX, randY];
  }

  moveProjectiles() {
    this.projectiles.forEach((missile, idx) => {
      if (this.checkExplosion(missile)) {
        this.projectiles.splice(idx, 1);
      } else {
        missile.move()
      }
    });
  }

  checkExplosion(explosion) {
    return explosion.radius >= explosion.maxRadius;
  }

  checkCollisions() {
    const explosions = this.projectiles.filter(mis => mis.radius);
    const missiles = this.projectiles.filter(mis => !mis.radius && mis.color === 'red');

    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          this.score += this.maxMissiles * missiles.length * this.time * this.shields;
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });

    missiles.forEach(missile => {
      if (missile.isCollidedWith()) {
        const pos = missile.pos;
        const color = missile.color;
        const maxRadius = 60;
        this.projectiles[this.projectiles.indexOf(missile)] = new Explosion({pos, color, maxRadius});
        this.shields -= 1;
      }
    });
  }

  setImages() {
    this.background.src = 'images/background.jpg';
    this.shotgunIcon.src = 'images/shotgun-icon.svg';
    this.rocketIcon.src = 'images/rocket-icon.svg';
    this.gravityGunIcon.src = 'images/gravity-gun-icon.svg';
  }

  drawBar(ctx) {
    ctx.fillStyle = 'silver';
    ctx.font = '16pt audiowide';
    ctx.fillText(`Score: ${this.score}`, 20, 50);
    ctx.fillText(`Time: ${this.time}`, (this.dimX-80) / 2, 50);
    ctx.fillText(`Shields: ${this.shields}`, this.dimX-150, 50);
  }

  drawIcons(ctx) {
    switch (this.currentGun) {
      case 'Rocket':
        ctx.fillStyle = 'chocolate';
        ctx.fillRect(50, 420, 50, 40);
        break;
      case 'Shotgun':
        ctx.fillStyle = 'chocolate';
        ctx.fillRect(100, 420, 50, 40);
        break;
      case 'GravityGun':
        ctx.fillStyle = 'chocolate';
        ctx.fillRect(150, 420, 50, 40);
        break;
      default:
        break;
    }
    ctx.drawImage(this.rocketIcon, 50, 420, 50, 40);
    ctx.drawImage(this.shotgunIcon, 105, 425, 40, 30);
    ctx.drawImage(this.gravityGunIcon, 150, 420, 50, 40);
    ctx.fillStyle = 'silver';
    ctx.font = '16pt audiowide';
    ctx.fillText('A', 65, 410);
    ctx.fillText('S', 115, 410);
    ctx.fillText('D', 165, 410);
  }

  willExplode() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile.endPos && (projectile.endPos[1] >= projectile.pos[1])) {
        const pos = projectile.pos;
        const color = projectile.color;
        this.projectiles.splice(idx, 1);
        projectile.explode({pos, color}).forEach(exp => this.projectiles.push(exp));
      }
    });
  }

  draw(ctx) {
    if (this.shields <= 0) {
      this.endGame();
    }
    // console.log(this.projectiles);
    this.willExplode();
    ctx.drawImage(this.background,0,0,this.dimX, this.dimY);
    this.projectiles.forEach(projectile => projectile.draw(ctx));
    this.drawBar(ctx);
    this.drawIcons(ctx);
  }

  step() {
    this.moveProjectiles();
    this.checkCollisions();
  };
}

export default Game;
