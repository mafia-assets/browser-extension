var options = {};

var DEFAULTS = {
    redirectAssets: true, 
} 
chrome.storage.sync.get(DEFAULTS, function (obj) {
  Object.assign(options, obj); 
  document.querySelector('#background > label > center > label > input[type=checkbox]').checked = options.redirectAssets
});

// Saves options to chrome.storage
function save_options() {
  // var Halloween = document.getElementById('like').checked;
  var Halloween = false;
  chrome.storage.sync.set({
    'Halloween' : Halloween
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.opacity = 1;
    setTimeout(function() {
      status.style.opacity = 0;
    }, 750);
    if (document.querySelector('#background > label > center > label > input[type=checkbox]').checked)  {
      chrome.runtime.sendMessage('sync-settings-on');
    }
    else {
      chrome.runtime.sendMessage('sync-settings-off');
    }
  });
}

document.querySelector('#background > label > center > label > span').addEventListener("click", () => {
  save_options()
})

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    Halloween: true
  }, function(items) {
    document.getElementById('like').checked = items.Halloween;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);