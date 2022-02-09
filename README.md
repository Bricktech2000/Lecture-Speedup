# Lecture Speedup

For the people who can't stand wasting valuable time

## Overview

Lecture Speedup is a quick script I wrote to allow me to blaze through recorded lectures in university. It implements the following key bindings:

- Up Arrow: `speed *= 2 ^ (1/3)`
- Down Arrow: `speed /= 2 * (1/3)`
- Left Arrow: `progress -= 5 seconds`
- Right Arrow: `speed *= 4` while it is held down

Moreover, it displays the current playback speed and progress percentage in the top left corner of the screen.

## Usage

To use the script with a local video file, run `index.html` in any web browser.

To use the script on a webpage (YouTube, Zoom, Dropbox or other), copy the contents of the first `script` tag in `index.html` into the console of the webpage and run `consoleRun()` to execute the script.
