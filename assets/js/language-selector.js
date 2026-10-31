/* Shared, preview-only language selector. No language navigation is enabled. */
(function () {
  "use strict";

  var wrapper = document.querySelector(".wrapper");
  if (!wrapper || document.querySelector(".language-selector")) return;

  var selector = document.createElement("details");
  selector.className = "language-selector";

  var summary = document.createElement("summary");
  summary.textContent = "EN";
  summary.setAttribute("aria-label", "Language: English");
  selector.appendChild(summary);

  var choices = document.createElement("div");
  choices.className = "language-selector__choices";

  // Add further languages here when they are ready. These buttons deliberately
  // have no click handlers, URLs, or saved preferences during the preview.
  var languages = [{ code: "cy", label: "CY" }];
  languages.forEach(function (language) {
    var option = document.createElement("button");
    option.type = "button";
    option.className = "language-selector__option";
    option.lang = language.code;
    option.setAttribute("aria-label", "Cymraeg");
    option.textContent = language.label;
    choices.appendChild(option);
  });
  selector.appendChild(choices);

  var title = wrapper.querySelector(".site_title");
  if (!title) return;
  var headingRow = document.createElement("div");
  headingRow.className = "site-heading-row";
  title.parentNode.insertBefore(headingRow, title);
  headingRow.appendChild(title);
  headingRow.appendChild(selector);

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
