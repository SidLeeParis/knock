# Knock

Knock is an open-source project that aims at detecting simple touch events on screens that do not natively support them (i.e. a Macbook), on a browser.

#### Demo

[A demo of knock is available here.](https://sidleeparis.github.io/knock/)

[A video of the demo can be found here.](https://dl.dropboxusercontent.com/u/2251898/SidLee_Knock.m4v)

#### How it works

Knock analyses the screen movements to detect if a touch has been triggered. To do so, it requires access to the webcam and constantly checks if there has been a vertical translation of the image, based on [corners detection](https://en.wikipedia.org/wiki/Corner_detection) provided by the [TrackingJS](http://trackingjs.com) library.


#### Requirements

Knock requires:

- A screen with a webcam. The webcam needs to be attached on the screen, possibly on the superior part of it. An integrated webcam should produce better results.

- The screen should not natively support touch events. Mobile phones or tablets are not targetted by this experiment.

- Latest versions of Chrome or Firefox: Knock uses [getUserMedia](https://developer.mozilla.org/fr/docs/NavigatorUserMedia.getUserMedia) and the [TrackingJS](http://trackingjs.com) library to access the user webcam.

#### Best usage conditions

Because it analyses the webcam stream, Knock performs better in the following conditions:

- laptop (mainly because of the hinge)
- a flat table (not on your laps)
- decent luminosity
- make sure you're not sitting before a monochrome background


#### Areas of improvements

At the moment, Knock triggers a touch event when a translation has been detected. For better results, it should only trigger a touch event when the screen oscillates. On monochrome backgrounds, moving your head up and down can trigger an event. If your laptop is on your laps, or if you're moving around with it, you will probably trigger a lot of false positives.

There's also a [great prototype](http://xseignard.github.io/knockKnock/) from @xseignard that listens through the webcam mic to detect a touch (it works really well in some conditions, but rap music usually triggers some false positives also ^^).
