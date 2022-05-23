# Lecture Speedup

For the people who can't stand wasting valuable time

## Overview

Lecture Speedup is a simple browser extension I wrote to allow me to blaze through recorded lectures in university. It implements the following key bindings:

- Right Shift: play / pause
- Up Arrow: `speed *= cbrt(2)`
- Down Arrow: `speed /= cbrt(2)`
- Left Arrow while playing: `speed *= -4`
- Left Arrow while paused: `progress += -5 seconds`
- Right Arrow while playing: `speed *= 4`
- Right Arrow while paused: `progress += 5 seconds`

The extension also displays the current playback speed and progress percentage in the top left corner of the page.

## Requirements

- Any Chromium-based browser

## Installation

1. Clone the repository
2. Navigate to _chrome://extensions_
3. Click the "Load unpacked extension..." button
4. Select the downloaded folder
5. Click the "Load" button

## Usage

To use the extension, navigate to a page containing an HTML `video` element and make sure the extension is enabled. Then, press the right (or left) Control key three times to activate the extension in the current page. Once activated, the current playback speed and progress percentage will be displayed in the top left corner of the page. Press the right (or left) Control key again to deactivate the extension.

## Supported Services

- YouTube
- Dropbox
- Zoom Recordings
- Google Drive (by changing JavaScript context)
