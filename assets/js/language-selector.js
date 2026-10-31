/* Shared, preview-only language selector. No language navigation is enabled. */
(function () {
  "use strict";

  var wrapper = document.querySelector(".wrapper");
  if (!wrapper || document.querySelector(".language-selector")) return;

  var selector = document.createElement("details");
  selector.className = "language-selector";

  var summary = document.createElement("summary");
  summary.textContent = "English";
  summary.setAttribute("aria-label", "Language: English");
  selector.appendChild(summary);

  var choices = document.createElement("div");
  choices.className = "language-selector__choices";

  // Add further languages here when they are ready. These buttons deliberately
  // have no click handlers, URLs, or saved preferences during the preview.
  var languages = [{ code: "cy", label: "Cymraeg" }];
  languages.forEach(function (language) {
    var option = document.createElement("button");
    option.type = "button";
    option.className = "language-selector__option";
    option.lang = language.code;
    option.textContent = language.label;
    choices.appendChild(option);
  });
  selector.appendChild(choices);

  wrapper.insertBefore(selector, wrapper.firstChild);

  document.addEventListener("click", function (event) {
    if (!selector.contains(event.target)) selector.open = false;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && selector.open) {
      var returnFocus = selector.contains(document.activeElement);
      selector.open = false;
      if (returnFocus) summary.focus();
    }
  });
})();
