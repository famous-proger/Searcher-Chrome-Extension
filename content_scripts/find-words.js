"use strict";

let body_tag = document.querySelector("body");
let mark = new Mark(body_tag);

chrome.storage.local.get(["search_url"], function (result) {
  if (result.search_url === document.location.href) {
    chrome.runtime.sendMessage({ get: "all_items" }, function (response) {
      if (response.all_items) {
        let all_items_object = response.all_items;

        let get_results = () => {
          return new Promise((resolve) => {
            // Get all results quantity
            let results_quantity = 0;

            for (let item in all_items_object) {
              mark.mark(item, {
                element: "span",
                each: function (element) {
                  element.setAttribute("data-word", item);
                },
                done: function (number) {
                  results_quantity += number;
                },
              });
            }

            resolve(results_quantity);
          });
        };

        (async () => {
          let results_quantity = await get_results();
          chrome.runtime.sendMessage({ found_words: results_quantity });
          for (let item in all_items_object) {
            let all_marked_elements = document.querySelectorAll(
              `[data-word="${item}"]`
            );
            for (let marked_element of all_marked_elements) {
              marked_element.style.background = all_items_object[item].color;
            }
          }
        })();
      }
    });
  }
});
