"use strict";

// Get container
let container = document.querySelector(".popup__main-block__section-3");

chrome.storage.local.get(["all_items"], function (result) {
  if (result.all_items) {
    // Get data from storage
    let all_words_object = result.all_items;

    for (let single_word in all_words_object) {
      let color = all_words_object[single_word].color;
      let word = single_word;

      // Get pattern from HTML
      let pattern = document
        .querySelector("#line-item-pattern")
        .content.cloneNode(true);

      // Get element for making picker pallete
      let new_picker_pallete = pattern.querySelector(
        ".line-item__color-picker-block > div"
      );

      // Get element for deleting item
      let close_cross = pattern.querySelector(".line-item__close-cross");

      // Event to delete element
      close_cross.addEventListener("click", () => {
        // Delete container
        close_cross.closest("div").remove();

        // Delete value from the storage
        chrome.storage.local.get(["all_items"], function (result) {
          if (result.all_items) {
            let all_items_object = result.all_items;
            delete all_items_object[line_item_input.value];

            chrome.storage.local.set({
              all_items: all_items_object,
            });
          }
        });
      });

      // Reset and add input values
      let line_item_input = pattern.querySelector(".line-item__input");
      line_item_input.value = word;

      // Counter of items
      let number_of_items = Array.from(
        document.querySelectorAll(".popup__main-block__section-3 > div")
      ).length;

      // Change class for a picker pallete
      new_picker_pallete.classList.add(
        `single-line-piker_${number_of_items + 1}`
      );

      // Add ready pattern
      container.prepend(pattern);

      // Get current picker color
      let current_color = color;

      // Create new picker
      let new_picker = Pickr.create({
        el: `.single-line-piker_${number_of_items + 1}`,
        theme: "classic",
        default: color,
        swatches: [
          "rgba(244, 67, 54, 1)",
          "rgba(233, 30, 99, 0.95)",
          "rgba(156, 39, 176, 0.9)",
          "rgba(103, 58, 183, 0.85)",
          "rgba(63, 81, 181, 0.8)",
          "rgba(33, 150, 243, 0.75)",
          "rgba(3, 169, 244, 0.7)",
          "rgba(0, 188, 212, 0.7)",
          "rgba(0, 150, 136, 0.75)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(139, 195, 74, 0.85)",
          "rgba(205, 220, 57, 0.9)",
          "rgba(255, 235, 59, 0.95)",
          "rgba(255, 193, 7, 1)",
        ],

        components: {
          preview: true,
          opacity: true,
          hue: true,

          interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true,
          },
        },
        disabled: true
      });
    }
  }
});
