// copy to console of YouTube, Zoom, Dropbox or other
// "*yit I love Vim bindings

const multiplier = Math.pow(2, 1 / 3); // 3 divisions to double playback rate
const maxPow = 12; // multiplier ^ maxPow = 16 (max playback rate for most browsers)
const mulPow = 6; // multiplier ^ mulPow = 4 (multiply playback rate by 4 when pressing right arrow key)
const backwardsJump = 5; // the number of seconds to jump back when the left arrow is pressed

const updatePlaybackRate = (rateMultiplier) => {
  const newRate = video.playbackRate * rateMultiplier;
  video.playbackRate = Math.min(
    Math.max(newRate, Math.pow(multiplier, -maxPow) + 0.000000001),
    Math.pow(multiplier, maxPow) - 0.000000001
  );
  playbackRate.textContent =
    'Playback Rate: ' + video.playbackRate.toFixed(2) + 'x';
};
const killEvent = (e) => {
  // https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
};

const initBindings = () => {
  updatePlaybackRate(1);

  window.addEventListener(
    'keydown',
    (e) => {
      switch (e.code) {
        case 'ShiftRight':
          if (video.paused || video.ended) video.play();
          else video.pause();
          killEvent(e);
          break;
        case 'ArrowUp':
          e.preventDefault();
          updatePlaybackRate(Math.pow(multiplier, 1));
          killEvent(e);
          break;
        case 'ArrowDown':
          e.preventDefault();
          updatePlaybackRate(Math.pow(multiplier, -1));
          killEvent(e);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // https://stackoverflow.com/questions/32654074/how-to-make-a-video-jump-back-to-the-start-after-it-ends-using-javascript?noredirect=1&lq=1
          video.currentTime = video.currentTime - backwardsJump;
          killEvent(e);
          break;
      }
    },
    true
  );

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.code == 'ArrowRight') {
        // https://stackoverflow.com/questions/6087959/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do
        killEvent(e);
        if (!e.repeat) updatePlaybackRate(Math.pow(multiplier, mulPow));
      }
    },
    true
  );

  window.addEventListener(
    'keyup',
    (e) => {
      if (e.code == 'ArrowRight') {
        killEvent(e);
        if (!e.repeat) updatePlaybackRate(Math.pow(multiplier, -mulPow));
      }
    },
    true
  );

  setInterval(() => {
    videoDuration.textContent =
      'Progress: ' +
      ((video.currentTime / video.duration) * 100).toFixed(0) +
      '%';
  }, 100);
};

const consoleRun = () => {
  window.video =
    document.querySelector('video') ||
    [...document.querySelectorAll('iframe')].reduce((acc, el) => {
      try {
        return acc || el.contentWindow.document.querySelector('video') || acc;
      } catch (e) {
        return acc;
      }
    }, false);

  if (window.video === false)
    console.error('Error: could not find video element.');

  window.playbackRate = document.createElement('div');
  document.body.appendChild(playbackRate);
  playbackRate.style.color = '#fff';
  playbackRate.style.textShadow = '0 0 16px #000, 0 0 16px #000, 0 0 16px #000';
  playbackRate.style.position = 'absolute';
  playbackRate.style.left = '10px';
  playbackRate.style.top = '10px';
  playbackRate.style.zIndex = '1000000';
  playbackRate.style.fontSize = '20px';
  window.videoDuration = document.createElement('div');
  document.body.appendChild(videoDuration);
  videoDuration.style.color = '#fff';
  videoDuration.style.textShadow =
    '0 0 16px #000, 0 0 16px #000, 0 0 16px #000';
  videoDuration.style.position = 'absolute';
  videoDuration.style.left = 'calc(10px + 10em)';
  videoDuration.style.top = '10px';
  videoDuration.style.zIndex = '1000000';
  videoDuration.style.fontSize = '20px';

  initBindings();
};

document.addEventListener('load', consoleRun);

var counter = 0;
document.addEventListener('keydown', (e) => {
  if (e.code == 'ShiftRight') counter++;
  else counter = 0;

  if (counter == 3) consoleRun();
});
