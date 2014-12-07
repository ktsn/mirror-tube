var Popup = {
  initialize: function(form) {
    this.form = form;

    VideoCtrl.isMirrored(function(mirrored) {
      form.mirror.checked = mirrored;
    });
    VideoCtrl.getPlaybackRate(function(rate) {
      form.playbackRate.value = rate;
      form.playbackRatePreview.innerHTML = rate.toFixed(1);
    });

    form.mirror.addEventListener('change', function(e) {
      VideoCtrl.changeMirrorMode(e.target.checked);
    });
    form.playbackRate.addEventListener('input', function(e) {
      VideoCtrl.changePlaybackRate(e.target.value);
      form.playbackRatePreview.innerHTML = parseFloat(e.target.value).toFixed(1);
    });
  }
};

window.onload = function() {
  var formEl = document.getElementById('video-controller');
  var form = {
    mirror: formEl.mirror,
    playbackRate: formEl.rate,
    playbackRatePreview: document.getElementById('playback-rate-preview')
  };

  Popup.initialize(form);
};
