export const drawProjectile = ({ctx, pos, vel, startPos, color}) => {
  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

export const drawBar = (ctx, score, time, shields, dimX) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText(`Score: ${score}`, 20, 50);
  ctx.fillText(`Time: ${time}`, (dimX-80) / 2, 50);
  ctx.fillText(`Shields: ${shields}`, dimX-150, 50);
}

export const drawCurrentGun = (ctx, currentGun) => {
  ctx.fillStyle = 'chocolate';

  switch (currentGun) {
    case 'Rocket':
      ctx.fillRect(50, 420, 50, 40);
      break;
    case 'ClusterGun':
      ctx.fillRect(100, 420, 50, 40);
      break;
    case 'GravityGun':
      ctx.fillRect(150, 420, 50, 40);
      break;
    case 'Laser':
      ctx.fillRect(200, 420, 50, 40);
    default:
      break;
  }
}

export const drawIcons = (ctx, images) => {
  ctx.drawImage(images.rocketIcon, 50, 420, 50, 40);
  ctx.drawImage(images.clusterGunIcon, 105, 425, 40, 30);
  ctx.drawImage(images.gravityGunIcon, 150, 420, 50, 40);
  ctx.drawImage(images.laserIcon, 205, 425, 40, 30);
  ctx.drawImage(images.tower, 300, 440, 40, 40);
}

export const drawControls = (ctx) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText('A', 65, 410);
  ctx.fillText('S', 115, 410);
  ctx.fillText('D', 165, 410);
  ctx.fillText('F', 215, 410);
}

export const drawSound = (ctx, images, soundOn, musicOn) => {
  const sound = soundOn ? images['soundOn'] : images['soundOff'];
  const music = musicOn ? images['musicOn'] : images['musicOff'];
  ctx.drawImage(sound, 570, 425, 30, 30);
  ctx.drawImage(music, 530, 425, 30, 30);
}
