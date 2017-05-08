class Splash {
  constructor({dimX, dimY, highScores}) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.buttons = [];
    this.image = new Image();
    this.setImage();
    this.createButtons();
  }

  setImage() {
    this.image.src = 'assets/images/splash-background.jpg';
  }

  createButtons() {
    this.buttons.push(new Button([this.dimX / 2 - 190, this.dimY * 4 / 6],'Start'));
    this.buttons.push(new Button([this.dimX / 2 + 20, this.dimY * 4 / 6],'High Scores'));
  }

  drawScores(ctx, highScores) {
    let startX = this.dimX/3;
    let startY = this.dimY/10;
    const scoreList = [1,2,3,4,5,6,7,8,9,10];
    this.drawHeader(ctx, [startX, startY]);

    scoreList.forEach(idx => {
      this.drawScore(ctx, [startX, startY], idx, highScores[idx]);
      startY += 20;
    });
  }

  drawHeader(ctx, pos) {
    ctx.font = '18pt orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText('#', pos[0], pos[1] - 40);
    ctx.fillText('Score', pos[0] + 50, pos[1] - 40);
    ctx.fillText('Time', pos[0] + 200, pos[1] -40);
  }

  drawScore(ctx, pos, idx, score) {
    ctx.font = '14pt orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText(idx, pos[0], pos[1]);
    if (score) {
      ctx.fillText(score.score, pos[0] + 50, pos[1]);
      ctx.fillText(score.time, pos[0] + 200, pos[1]);
    }
  }

  draw(ctx, highScores) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.buttons.forEach(button => button.draw(ctx));
    });
    this.buttons.forEach(button => button.draw(ctx));

    if (highScores) {
      this.drawScores(ctx, highScores);
    }
  }
}

class Button {
  constructor(pos, text) {
    this.pos = pos;
    this.text = text;
    this.hover = false;
    this.nW = pos;
    this.sE = [];
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const backColor = this.hover ? 'darkblue' : 'blue';

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
    ctx.fillStyle = backColor;
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt orbitron';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'hanging';
    ctx.fillText(this.text, this.pos[0], this.pos[1]+35);

    this.nW = [this.pos[0] - 10, this.pos[1] + 10];
    this.sE = [x + 190, y + 70];
  }
}

export default Splash;
