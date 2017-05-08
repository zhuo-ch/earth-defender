export const playMusic = (music) => {
  this.music.volume = 0.05;
  this.music.loop = true;
  this.music.play();
}

export const startLaserAudio = (soundOn) {
  this.laserAudio = new Audio('./assets/audio/laser.wav');
  this.laserAudio.volume = 0.2;
  this.laserAudio.loop = true;
  window.allAudio.push(this.laserAudio);
  this.soundOn ? this.laserAudio.play() : "";
  return soundOn ? false : true;
}
