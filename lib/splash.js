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

  drawButton(ctx, pos) {
    const x = pos[0];
    const y = pos[1];

    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 180, y + 10);
    ctx.quadraticCurveTo(x + 190, y + 10, x + 190, y + 20);
    ctx.lineTo(x + 190, y + 60);
    ctx.quadraticCurveTo(x + 190, y + 70, x + 180, y + 70);
    ctx.lineTo(x, y + 70);
    ctx.quadraticCurveTo(x -10, y + 70, x - 10, y + 60);
    ctx.lineTo(x - 10, y + 20);
    ctx.quadraticCurveTo(x - 10, y + 10, x, y + 10);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Start Game', this.dimX*2/5, this.dimY*3/5);
  }

  draw(ctx) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5]);
    });

  }


}

export default Splash;
