"use strict";


chrome.runtime.onInstalled.addListener(function () {
  let item_data = {
    id: "add_word_option",
    title: "Add word to the list",
    type: "normal",
    contexts: ["selection"],
  };
  chrome.contextMenus.create(item_data);
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.selectionText) {
    chrome.storage.local.get(["all_items"], function (result) {
      if (result.all_items) {
        let all_items_object = result.all_items;

        all_items_object[info.selectionText] = { color: "red" };
        console.log(all_items_object);

        chrome.storage.local.set({
          all_items: all_items_object,
        });
      }
    });
  }
});
