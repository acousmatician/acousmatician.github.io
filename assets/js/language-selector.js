/* Shared EN/CY/FR selector. Destinations are provided by the page-language maps. */
(function () {
  "use strict";
  var wrapper = document.querySelector(".wrapper");
  if (!wrapper) return;
  var current = document.documentElement.lang || "en";
  var names = {en: "English", cy: "Cymraeg", fr: "Français"};
  var labels = {en: "Language", cy: "Iaith", fr: "Langue"};
  var selector = document.querySelector(".language-selector") || document.createElement("details");
  selector.replaceChildren();
  selector.className = "language-selector";
  var summary = document.createElement("summary");
  summary.textContent = current.toUpperCase();
  summary.setAttribute("aria-label", labels[current] + ": " + names[current]);
  selector.appendChild(summary);
  var choices = document.createElement("div");
  choices.className = "language-selector__choices";
  ["en", "cy", "fr"].forEach(function (code) {
    if (code === current) return;
    var attribute = {en: "data-english-url", cy: "data-welsh-url", fr: "data-french-url"}[code];
    var destination = document.body.getAttribute(attribute);
    if (!destination) return;
    var option = document.createElement("a");
    option.href = destination + window.location.search + window.location.hash;
    option.hreflang = code;
    option.lang = code;
    option.className = "language-selector__option";
    option.setAttribute("aria-label", names[code]);
    option.textContent = code.toUpperCase();
    choices.appendChild(option);
  });
  selector.appendChild(choices);
  var title = wrapper.querySelector(".site_title");
  if (!title) return;
  var headingRow = wrapper.querySelector(".site-heading-row");
  if (!headingRow) {
    headingRow = document.createElement("div");
    headingRow.className = "site-heading-row";
    title.parentNode.insertBefore(headingRow, title);
    headingRow.appendChild(title);
  }
  var menuTrigger = wrapper.querySelector(".menu-trigger");
  if (menuTrigger) headingRow.appendChild(menuTrigger);
  headingRow.appendChild(selector);
  var navToggle = wrapper.querySelector("#nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("change", function () { if (navToggle.checked) selector.open = false; });
    summary.addEventListener("click", function () { navToggle.checked = false; });
  }
  document.addEventListener("click", function (event) { if (!selector.contains(event.target)) selector.open = false; });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && selector.open) {
      var returnFocus = selector.contains(document.activeElement);
      selector.open = false;
      if (returnFocus) summary.focus();
    }
  });
})();
