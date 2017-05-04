
class Explosion {
  constructor({pos, game}) {
    this.pos = pos;
    this.game = game;
    this.radius = 2;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    // const grd = ctx.createRadialGradient(
    //   this.pos[0] + this.radius,
    //   this.pos[1] + this.radius,
    //   0,
    //   this.pos[0] + this.radius,
    //   this.pos[1] + this.radius,
    //   this.radius
    // );
    //
    // grd.addColorStop(0, 'white');
    // grd.addColorStop(1, 'blue');
    //
    // ctx.fillStyle = grd;
    ctx.fillStyle = '#00FFFF';
    ctx.fill();
  }

  move() {
    this.radius += 1;
  }
}

export default Explosion;
