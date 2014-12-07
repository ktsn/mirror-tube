var Popup = {
  initialize: function(form) {
    VideoCtrl.isMirrored(function(mirrored) {
      form.mirror.checked = mirrored;
    });
    VideoCtrl.getPlaybackRate(function(rate) {
      form.playbackRate.value = rate;
    });

    form.mirror.addEventListener('change', function(e) {
      VideoCtrl.changeMirrorMode(e.target.checked);
    });
    form.playbackRate.addEventListener('change', function(e) {
      VideoCtrl.changePlaybackRate(e.target.value);
    });
  }
};

window.onload = function() {
  var formEl = document.getElementById('video-controller');
  var form = {
    mirror: formEl.mirror,
    playbackRate: formEl.rate
  };

  VideoCtrl.initVideo(function() {
    Popup.initialize(form);
  });
};
