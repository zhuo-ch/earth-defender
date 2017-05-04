class Splash {
  constructor({dimX, dimY}) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.image = new Image();
    this.setImage();
  }

  setImage() {
    this.image.src = 'splash-background.jpg';
  }

  drawButton() {
    ctx.beginPath();
    ctx.moveTo(20, 10);
    ctx.lineTo(80, 10);
    ctx.quadraticCurveTo(90, 10, 90, 20);
    ctx.lineTo(90, 80);
    ctx.quadraticCurveTo(90, 90, 80, 90);
    ctx.lineTo(20, 90);
    ctx.quadraticCurveTo(10, 90, 10, 80);
    ctx.lineTo(10, 20);
    ctx.quadraticCurveTo(10, 10, 20, 10);
    ctx.stroke();
  }

  draw(ctx) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
    });
  }


}

export default Splash;
