;(function(window, document, chrome, Command) {
  var VideoCtrl = {
    isMirrored: function(completion) {
      executeCommand(Command.isMirrored, {}, function(res) {
        completion(res.mirrored);
      });
    },

    changeMirrorMode: function(on) {
      executeCommand(Command.changeMirrorMode, { on: on });
    },

    getPlaybackRate: function(completion) {
      executeCommand(Command.getPlaybackRate, {}, function(res) {
        completion(res.playbackRate);
      });
    },

    changePlaybackRate: function(rate) {
      executeCommand(Command.changePlaybackRate, { playbackRate: rate });
    }
  };

  function insertScripts(scripts, completion) {
    var scriptLength = scripts.length;
    var completeNum = 0;
    var cb = function() {
      completeNum++;
      if (completeNum < scriptLength) {
        chrome.tabs.executeScript(null, { file: scripts[completeNum] }, cb);
        return;
      }
      completion();
    };
    chrome.tabs.executeScript(null, { file: scripts[0] }, cb);
  }

  function executeCommand(command, params, completion) {
    params.command = command;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, params, completion);
    });
  }

  window.VideoCtrl = VideoCtrl;
})(window, document, chrome, _MtCommand);
