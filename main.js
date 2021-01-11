const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');
const sounds = document.querySelectorAll('.sound-picker button');
const timeDisplay = document.querySelector('.time-display');
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 120;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(fakeDuration % 60))}`;

sounds.forEach(sound => {
  sound.addEventListener('click', function() {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

play.addEventListener('click', () => {
  checkPlaying(song);
});

replay.addEventListener('click', () => {
  restartSong(song);
});

const restartSong = song => song.currentTime = 0;

timeSelect.forEach(option => {
  option.addEventListener('click', function() {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(fakeDuration % 60))}`;
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = addZero(Math.floor(elapsed % 60));
  let minutes = addZero(Math.floor(elapsed / 60));
  timeDisplay.textContent = `${minutes}:${seconds}`;
  
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
    video.pause();
  }
};
