export const getVel = (startCoords, endCoords) => {
  let slope = startCoords.map((vect, idx) => endCoords[idx] - vect);

  while ((Math.abs(Math.ceil(slope[0])) > 5) || (Math.abs(Math.ceil(slope[1])) > 5)) {
    slope = slope.map(vect => vect/2);
  }

  return slope;
}

export const getStartPos = (startPos, vel, endPos) => {
  startPos = startPos.map((vect, idx) => {
    return vect - (vel[idx] * 10);
  });

  if (endPos[1] <= 440) {
    if (startPos[1] > 440) {
      startPos[0] = 320;
      startPos[1] = 440;
    }
  }

  return startPos;
}

export const isCollidedWith = (obj, otherObj) => {
  const x1 = obj.pos[0];
  const x2 = otherObj.pos[0];
  const y1 = obj.pos[1];
  const y2 = otherObj.pos[1];

  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

  return distance < obj.radius;
}

export const getRandomEnd = (dimX, dimY) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = dimY;
  return [randX, randY];
}

export const getRandomStart = (dimX) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = 1;
  return [randX, randY];
}

export const getMissileStart = (pos, vel) => {
  return pos.map((vect, idx) => {
    const newVect = vect - (vel[idx] * 10);
    return newVect < 0 ? 0 : newVect;
  });
}

export const getMissileVel = (startCoords, endCoords, constSpeed) => {
  const slope = startCoords.map((vect, idx) => endCoords[idx] - vect);
  const spd = speed(slope[0], slope[1], constSpeed);
  const result = spd.map((vect, idx) => {
    if (slope[idx] < 0) {
      return 0 - vect;
    }

    return vect;
  });

  return result;
}

const speed = (x, y, constSpeed) => {
  x =  (x === 0 ? 1 : Math.abs(x));
  y = (y === 0 ? 1 : Math.abs(y));

  let ratioX = x/(x+y);
  let ratioY = y/(x+y);

  return [Math.sqrt(constSpeed)*ratioX, Math.sqrt(constSpeed)*ratioY];
}
