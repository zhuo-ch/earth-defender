export const getVel = (startCoords, endCoords) => {
  let slope = startCoords.map((vect, idx) => endCoords[idx] - vect);

  // slope = gcd(slope[0], slope[1]);
  while ((Math.abs(Math.ceil(slope[0])) > 5) || (Math.abs(Math.ceil(slope[1])) > 5)) {
    slope = slope.map(vect => vect/2);
  }

  // let getSpeed = speed(slope[0], slope[1])
  // const spd = getSpeed.map((vect, idx) => {
  //   return slope[idx] < 0 ? Math.floor(0-vect) : Math.floor(vect);
  // });
  // debugger
  return slope;
}

export const drawProjectile = ({ctx, pos, vel, color}) => {
  const startPoint = pos.map((vect, idx) => {
    if ((vect - (vel[idx]*10)) < 0) {
      return 0;
    } else {
      return vect - (vel[idx]*10);
    }
  });

  ctx.beginPath();
  ctx.moveTo(startPoint[0], startPoint[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.stroke();
}

const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}

const speed = (x, y) => {
// debugger
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
