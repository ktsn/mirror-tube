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

    changeRepeatTime: function(start, end) {
      executeCommand(Command.changeRepeatTime, { start: start, end: end });
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
