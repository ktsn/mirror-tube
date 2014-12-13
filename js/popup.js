var Popup = {
  initialize: function(form) {
    this.form = form;

    this.applyVideoState();

    form.mirror.addEventListener('change', function(e) {
      VideoCtrl.changeMirrorMode(e.target.checked);
    });
    form.playbackRate.addEventListener('input', function(e) {
      VideoCtrl.changePlaybackRate(e.target.value);
      form.playbackRatePreview.innerHTML = parseFloat(e.target.value).toFixed(1);
    });
  },

  applyVideoState: function() {
    VideoCtrl.getVideoState(function(state) {
      this.form.mirror.checked = state.mirrored;
      this.form.playbackRate.value = state.playbackRate;
      this.form.playbackRatePreview.innerHTML = state.playbackRate.toFixed(1)
    }.bind(this));
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
