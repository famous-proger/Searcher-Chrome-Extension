"use strict";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
 
  if (request.get === "all_items") {
    let get_results = () => {
      return new Promise((resolve) => {
        chrome.storage.local.get(["all_items"], function (result) {
          let all_items_object = result.all_items;
          resolve(all_items_object);
        });
      });
    };

    (async () => {
      let all_items_object = await get_results();
      sendResponse({ all_items: all_items_object });
    })();
    // Return "true" for asynchronous request
    return true;
  }
});
