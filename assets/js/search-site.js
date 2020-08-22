"use strict";

let search_button = document.querySelector(".section-1__button");
let search_input = document.querySelector(".section-1__input");

chrome.storage.local.get(["search_url"], function (result) {
  if (result.search_url) {
    search_input.value = result.search_url;
  }
});

search_button.addEventListener("click", () => {
  if (search_input.value) {
    chrome.storage.local.set({ search_url: search_input.value });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { url: search_input.value });
    });
  }
});
