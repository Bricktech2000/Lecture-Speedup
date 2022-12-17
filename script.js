// copy to console of YouTube, Zoom, Dropbox or other

const multiplier = Math.pow(2, 1 / 3); // 3 divisions to double playback rate
const maxPow = 12; // multiplier ^ maxPow = 16 (max playback rate for most browsers)
const mulPow = 6; // multiplier ^ mulPow = 4 (multiply playback rate by 4 when pressing right arrow key)
const jumpTime = 5; // the number of seconds to jump backwards or forwards when the video is paused

var video = null;
var playbackRateDiv = null;
var playbackInterval = null;
var playbackRate = 1;
const updatePlaybackRate = (rateMultiplier) => {
  playbackRate = playbackRate * rateMultiplier;

  // hacky code to get negative playback rate

  const small = 0.000000001;
  playbackRate =
    Math.min(
      Math.max(Math.abs(playbackRate), Math.pow(multiplier, -maxPow) + small),
      Math.pow(multiplier, maxPow) - small
    ) * Math.sign(playbackRate);

  if (playbackInterval) {
    clearInterval(playbackInterval);
    video.play();
  }

  if (playbackRate < 0) {
    video.pause();
    playbackInterval = setInterval(() => {
      video.currentTime += playbackRate / 10;
    }, 1000 / 10);
  }

  video.playbackRate = Math.abs(playbackRate);

  playbackRateDiv.textContent = `${playbackRate.toFixed(2)}`;
};

const killEvent = (e) => {
  // https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
};

const keyDownListener = (e) => {
  switch (e.code) {
    case 'ShiftRight':
      if (video.paused || video.ended) video.play();
      else video.pause();
      killEvent(e);
      break;
    case 'ControlRight':
      // https://stackoverflow.com/questions/32654074/how-to-make-a-video-jump-back-to-the-start-after-it-ends-using-javascript?noredirect=1&lq=1
      // https://stackoverflow.com/questions/6087959/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do
      if (!e.repeat) updatePlaybackRate(Math.pow(multiplier, mulPow));
      killEvent(e);
      break;
    case 'ArrowUp':
      updatePlaybackRate(Math.pow(multiplier, 1));
      killEvent(e);
      break;
    case 'ArrowDown':
      updatePlaybackRate(Math.pow(multiplier, -1));
      killEvent(e);
      break;
    case 'ArrowLeft':
      video.currentTime -= jumpTime;
      killEvent(e);
      break;
    case 'ArrowRight':
      video.currentTime += jumpTime;
      killEvent(e);
      break;
  }
};

const keyUpListener = (e) => {
  switch (e.code) {
    case 'ControlRight':
      if (!e.repeat) updatePlaybackRate(Math.pow(multiplier, -mulPow));
      killEvent(e);
      break;
  }
};

const consoleStart = () => {
  video =
    document.querySelector('video') ||
    [...document.querySelectorAll('iframe')].reduce((acc, el) => {
      try {
        return acc || el.contentWindow.document.querySelector('video') || acc;
      } catch (e) {
        return acc;
      }
    }, false);

  if (video === false) console.error('Error: could not find video element.');

  playbackRateDiv = document.createElement('div');
  document.body.appendChild(playbackRateDiv);
  playbackRateDiv.style.color = '#fff';
  playbackRateDiv.style.textShadow =
    '0 0 16px #000, 0 0 16px #000, 0 0 16px #000';
  playbackRateDiv.style.position = 'absolute';
  playbackRateDiv.style.left = '10px';
  playbackRateDiv.style.top = '10px';
  playbackRateDiv.style.zIndex = '1000000';
  playbackRateDiv.style.fontSize = '20px';
  playbackRateDiv.style.fontFamily = 'monospace';

  updatePlaybackRate(1);

  window.addEventListener('keydown', keyDownListener, true);
  window.addEventListener('keyup', keyUpListener, true);
};

const consoleEnd = () => {
  video.playbackRate = 1;
  document.body.removeChild(playbackRateDiv);

  window.removeEventListener('keydown', keyDownListener, true);
  window.removeEventListener('keyup', keyUpListener, true);
};

var counter = 0;
var running = false;
document.addEventListener('keyup', (e) => {
  if (e.code == 'ControlRight' || e.code == 'ControlLeft') counter++;
  else counter = 0;

  if (counter == 3) {
    if (!running) consoleStart();
    else consoleEnd();
    running = !running;
    counter = 0;
  } else {
    setTimeout(() => {
      counter = 0;
    }, 1000);
  }
});
