"use strict";

let notif_data = {
  type: "basic",
  title: "Found results",
  iconUrl: "assets/images/search128.png",
  message: "There are 0 results on the page"
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.found_words || request.found_words === 0) {
    notif_data.message = `There are ${request.found_words} results on the page`;
    chrome.notifications.create("amount_notification", notif_data);

    setTimeout(() => {
      chrome.notifications.clear("amount_notification");
    }, 4000);
  }
});
