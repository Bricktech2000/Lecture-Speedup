# Lecture Speedup

For the people who can't stand wasting valuable time

## Overview

Lecture Speedup is a quick script I wrote to allow me to blaze through recorded lectures in university. It implements the following key bindings:

- Right Shift: play / pause
- Up Arrow: `speed *= cbrt(2)`
- Down Arrow: `speed /= cbrt(2)`
- Left Arrow: `progress -= 5 seconds`
- Right Arrow: `speed *= 4` while it is held down

The script also displays the current playback speed and progress percentage in the top left corner of the screen.

## Usage

To use the script with a local video file, run `index.html` in any web browser.

To use the script on a webpage (YouTube, Zoom, Dropbox or other), copy the contents of the first `script` tag in `index.html` into the console of the webpage and run `consoleRun()` to initialize the script.
