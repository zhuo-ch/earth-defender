export const getVel = (startCoords, endCoords) => {
  let slope = startCoords.map((vect, idx) => endCoords[idx] - vect);

  while ((Math.abs(Math.ceil(slope[0])) > 5) || (Math.abs(Math.ceil(slope[1])) > 5)) {
    slope = slope.map(vect => vect/2);
  }

  return slope;
}

export const drawProjectile = ({ctx, pos, vel, startPos, color}) => {
  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

export const isCollidedWith = (obj, otherObj) => {
  const x1 = obj.pos[0];
  const x2 = otherObj.pos[0];
  const y1 = obj.pos[1];
  const y2 = otherObj.pos[1];

  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

  return distance < obj.radius;
}

export const drawBar = (ctx, score, time, shields, dimX) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText(`Score: ${score}`, 20, 50);
  ctx.fillText(`Time: ${time}`, (dimX-80) / 2, 50);
  ctx.fillText(`Shields: ${shields}`, dimX-150, 50);
}

export const drawCurrentGun = (ctx, currentGun) => {
  switch (currentGun) {
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
    case 'Laser':
      ctx.fillStyle = 'chocolate';
      ctx.fillRect(200, 420, 50, 40);
    default:
      break;
  }
}

export const drawIcons = (ctx, images) => {
  ctx.drawImage(images.rocketIcon, 50, 420, 50, 40);
  ctx.drawImage(images.shotgunIcon, 105, 425, 40, 30);
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

export const randomEnd = (dimX, dimY) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = dimY;
  return [randX, randY];
}

export const randomPosition = (dimX) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = 0;
  return [randX, randY];
}


export const checkExplosion = (explosion) => {
  return explosion.radius >= explosion.maxRadius;
}

export const getStartPos = (startPos, vel) => {
  startPos = startPos.map((vect, idx) => {
    return vect - (vel[idx] * 10);
  });

  if (startPos[1] > 440) {
    startPos[0] = 320;
    startPos[1] = 440;
  }

  return startPos;
}

const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}

const speed = (x, y) => {
  x = Math.abs(x);
  y = Math.abs(y);

  let ratioX;
  let ratioY;

  if (x < y) {
    ratioX = x/y;
    ratioY = 1-(ratioX);
  } else {
    ratioY = y/x;
    ratioX = 1-(ratioY);
  }

  return [Math.sqrt(10)*ratioX, Math.sqrt(10)*ratioY];
}
