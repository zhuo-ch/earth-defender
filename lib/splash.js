class Splash {
  constructor({dimX, dimY}) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.image = new Image();
    this.setImage();
    this.nW = [];
    this.sE = [];
  }

  setImage() {
    this.image.src = 'splash-background.jpg';
  }

  drawButton(ctx, pos, backColor, textColor ) {
    const x = pos[0];
    const y = pos[1];
    // debugger
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
    ctx.strokeStyle = textColor;
    ctx.fillStyle = backColor;
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt audiowide';
    ctx.fillStyle = textColor;
    ctx.fillText('Start Game', (this.dimX-40)*2/5, this.dimY*3/5);

    this.nW = pos;
    this.sE = [x + 190, y + 70];
  }

  draw(ctx, hover) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'blue', 'white');
    });

    if (hover === 'no hover') {
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'blue', 'white');
    } else {
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'darkblue', 'white');
    }
  }


}

export default Splash;
