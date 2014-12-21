;(function(document, chrome, Command) {
  var kMirroredClassName = 'mt-mirror-horizontal';
  var repeat = {
    enabled: false,
    start: 0,
    end: 0
  };

  document.documentElement.addEventListener('timeupdate', function(event) {
    if (!event.target.classList.contains('html5-main-video')) {
      return;
    }

    var video = event.target;
    if (repeat.enabled && repeat.start < repeat.end) {
      if (video.currentTime < repeat.start || video.currentTime > repeat.end) {
        video.currentTime = repeat.start;
      }
    }
  }, true);

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var video = document.getElementsByClassName('html5-main-video')[0];
    switch (request.command) {
      case Command.getVideoState:
        sendResponse({
          mirrored: video.classList.contains(kMirroredClassName),
          playbackRate: video.playbackRate,
          repeat: repeat
        });
        break;
      case Command.changeMirrorMode:
        if (request.on) {
          video.classList.add(kMirroredClassName);
        } else {
          video.classList.remove(kMirroredClassName);
        }
        break;
      case Command.changePlaybackRate:
        video.playbackRate = request.playbackRate;
        break;
      case Command.changeRepeatMode:
        repeat.enabled = request.on;
        break;
      case Command.updateRepeatStartTime:
        repeat.start = video.currentTime;
        sendResponse(repeat);
        break;
      case Command.updateRepeatEndTime:
        repeat.end = video.currentTime;
        sendResponse(repeat);
        break;
      default:
    }
  });
})(document, chrome, _MtCommand);
