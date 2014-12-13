;(function(document, chrome, Command) {
  var kMirroredClassName = 'mt-mirror-horizontal';
  var video = document.getElementsByClassName('html5-main-video')[0];
  var repeat = {
    enabled: false,
    start: 0,
    end: 0
  };

  video.addEventListener('timeupdate', function(event) {
    if (repeat.enabled && repeat.start < repeat.end) {
      if (video.currentTime < repeat.start || video.currentTime > repeat.end) {
        video.currentTime = repeat.start;
      }
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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
      case Command.changeRepeatTime:
        repeat.start = request.start;
        repeat.end = request.end;
        break;
      default:
    }
  });
})(document, chrome, _MtCommand);
