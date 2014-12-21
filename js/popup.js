var Popup = {
  initialize: function(form) {
    this.form = form;
    this.applyVideoState();

    var onUpdateRepeatTime = function(repeat) {
      form.repeat.start.value = translateSecondsToTime(Math.floor(repeat.start));
      form.repeat.end.value = translateSecondsToTime(Math.floor(repeat.end));
    };

    form.mirror.addEventListener('change', function(e) {
      VideoCtrl.changeMirrorMode(e.target.checked);
    });
    form.playbackRate.addEventListener('input', function(e) {
      VideoCtrl.changePlaybackRate(e.target.value);
      form.playbackRatePreview.innerHTML = parseFloat(e.target.value).toFixed(1);
    });
    form.repeat.enabled.addEventListener('change', function(e) {
      VideoCtrl.changeRepeatMode(e.target.checked);
    });
    form.repeat.start.addEventListener('click', function(e) {
      VideoCtrl.updateRepeatStartTime(onUpdateRepeatTime);
    });
    form.repeat.end.addEventListener('click', function(e) {
      VideoCtrl.updateRepeatEndTime(onUpdateRepeatTime);
    });
  },

  applyVideoState: function() {
    VideoCtrl.getVideoState(function(state) {
      this.form.mirror.checked = state.mirrored;
      this.form.playbackRate.value = state.playbackRate;
      this.form.playbackRatePreview.innerHTML = state.playbackRate.toFixed(1);
      this.form.repeat.enabled.checked = state.repeat.enabled;
      this.form.repeat.start.value = translateSecondsToTime(Math.floor(state.repeat.start));
      this.form.repeat.end.value = translateSecondsToTime(Math.floor(state.repeat.end));
    }.bind(this));
  }
};

/**
 * time ::= digit digit : digit digit
 */
function translateSecondsToTime(seconds) {
  return ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + (seconds % 60)).slice(-2);
}

window.onload = function() {
  var formEl = document.getElementById('video-controller');
  var form = {
    mirror: formEl.mirror,
    playbackRate: formEl.rate,
    playbackRatePreview: document.getElementById('playback-rate-preview'),
    repeat: {
      start: formEl.repeatStart,
      end: formEl.repeatEnd,
      enabled: formEl.repeatEnabled
    }
  };

  Popup.initialize(form);
};
