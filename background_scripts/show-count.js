"use strict";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.found_words || request.found_words === 0) {
    chrome.browserAction.setBadgeText({ text: `${request.found_words}` });
  }
});
