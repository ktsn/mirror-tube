;(function(window, document, chrome, Command) {
  var VideoCtrl = {
    getVideoState: function(completion) {
      executeCommand(Command.getVideoState, {}, completion);
    },

    changeMirrorMode: function(on) {
      executeCommand(Command.changeMirrorMode, { on: on });
    },

    changePlaybackRate: function(rate) {
      executeCommand(Command.changePlaybackRate, { playbackRate: rate });
    },

    changeRepeatMode: function(on) {
      executeCommand(Command.changeRepeatMode, { on: on });
    },

    updateRepeatStartTime: function(completion) {
      executeCommand(Command.updateRepeatStartTime, {}, completion);
    },

    updateRepeatEndTime: function(completion) {
      executeCommand(Command.updateRepeatEndTime, {}, completion);
    }
  };

  function executeCommand(command, params, completion) {
    params.command = command;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, params, completion);
    });
  }

  window.VideoCtrl = VideoCtrl;
})(window, document, chrome, _MtCommand);
