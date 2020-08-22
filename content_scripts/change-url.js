"use strict";

let promise;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.url) {
      window.location.href = request.url;
  }
});
