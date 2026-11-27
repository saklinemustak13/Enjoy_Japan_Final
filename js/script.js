// =========================================================
// script.js : ENJOY JAPAN (version 3)
// ---------------------------------------------------------
// This file is loaded in <head>, so it can:
//   - add the "js" class to <html> before the page appears
//   - show the saved language before you see any English
// Everything else starts when the HTML is ready (DOMContentLoaded).
//
//  1. Language switcher (EN / বাংলা / 日本語)
//  2. Loader
//  3. Header: transparent -> solid when scrolling
//  4. Mobile menu
//  5. Scroll progress bar
//  6. Reveal animations (IntersectionObserver)
//  7. "On this page" active link
//  8. Back-to-top button
//  9. "Listen" buttons (the browser reads Japanese aloud)
// 10. Sakura petals
// 11. Card tilt
// 12. Tips carousel
// 13. Ready checklist (traffic page)
// 14. Photo fade-in
// =========================================================

document.documentElement.classList.add("js");

// Does the visitor prefer less movement? (a setting on phones and computers)
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// ---------- 1. Language switcher ----------
var STORAGE_KEY = "enjoyJapanLang";

function getSavedLanguage() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bn" || stored === "ja") {
      return stored;
    }
  } catch (error) {
    // Saving can be blocked (private mode). English is used.
  }
  return "en";
}

function setLanguage(lang) {
  if (lang !== "en" && lang !== "bn" && lang !== "ja") {
    lang = "en";
  }

  // 1) Update <html lang="..."> (fonts and screen readers use it)
  document.documentElement.setAttribute("lang", lang);

  // 2) Replace the text of every element with data-en / data-bn / data-ja
  var items = document.querySelectorAll("[data-en]");
  for (var i = 0; i < items.length; i++) {
    var text = items[i].getAttribute("data-" + lang);
    if (text === null) {
      text = items[i].getAttribute("data-en");
    }
    items[i].innerHTML = text;
  }

  // 3) Translate labels that only screen readers hear (aria-label)
  var labels = document.querySelectorAll("[data-aria-en]");
  for (var j = 0; j < labels.length; j++) {
    var label = labels[j].getAttribute("data-aria-" + lang) || labels[j].getAttribute("data-aria-en");
    labels[j].setAttribute("aria-label", label);
  }

  // 4) Highlight the selected language button
  var buttons = document.querySelectorAll(".lang_button");
  for (var k = 0; k < buttons.length; k++) {
    var isActive = buttons[k].getAttribute("data-lang") === lang;
    buttons[k].classList.toggle("active", isActive);
    buttons[k].setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  // 5) Remember the language for the next page
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    // do nothing
  }
}

function initLanguage() {
  var buttons = document.querySelectorAll(".lang_button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      setLanguage(this.getAttribute("data-lang"));
    });
  }
  setLanguage(getSavedLanguage());
}


// ---------- 2. Loader ----------
function hideLoader() {
  var loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("is-hidden");
  }
}


// ---------- 3. Header: transparent -> solid ----------
// A small invisible box sits at the top of the page.
// When it leaves the screen, the header becomes solid.
function initHeader() {
  var header = document.getElementById("header_area");
  var sentinel = document.getElementById("top_sentinel");
  if (!header || !sentinel || !("IntersectionObserver" in window)) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
  });
  observer.observe(sentinel);
}


// ---------- 4. Mobile menu ----------
function initMenu() {
  var menuButton = document.getElementById("menu_button");
  var gnavi = document.getElementById("gnavi");
  if (!menuButton || !gnavi) {
    return;
  }

  function openMenu(open) {
    gnavi.classList.toggle("open", open);
    document.body.classList.toggle("menu_open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  menuButton.addEventListener("click", function () {
    openMenu(!gnavi.classList.contains("open"));
  });

  // Close the menu when a link is chosen
  gnavi.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      openMenu(false);
    }
  });

  // Close the menu with the Esc key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && gnavi.classList.contains("open")) {
      openMenu(false);
      menuButton.focus();
    }
  });

  // Close the menu if the window becomes wide again
  var wide = window.matchMedia("(min-width: 1101px)");
  wide.addEventListener("change", function (event) {
    if (event.matches) {
      openMenu(false);
    }
  });
}


// ---------- 5. Scroll progress bar ----------
// requestAnimationFrame: update at most once per screen refresh
function initProgress() {
  var bar = document.querySelector("#scroll_progress span");
  if (!bar) {
    return;
  }
  var waiting = false;

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
    waiting = false;
  }

  window.addEventListener("scroll", function () {
    if (!waiting) {
      waiting = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}


// ---------- 6. Reveal animations ----------
function initReveal() {
  var targets = document.querySelectorAll(".reveal, .reveal_image, .route");

  // Cards inside .stagger appear one after another
  var groups = document.querySelectorAll(".stagger");
  for (var g = 0; g < groups.length; g++) {
    var children = groups[g].children;
    for (var c = 0; c < children.length; c++) {
      children[c].classList.add("reveal");
      children[c].style.transitionDelay = (c * 0.09) + "s";
    }
  }
  targets = document.querySelectorAll(".reveal, .reveal_image, .route");

  // Old browser or reduced motion: just show everything
  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add("is-visible");
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

  for (var j = 0; j < targets.length; j++) {
    observer.observe(targets[j]);
  }
}


// ---------- 7. "On this page" active link ----------
function initPageNav() {
  var links = document.querySelectorAll(".page_nav a[href^='#']");
  if (links.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  var map = {};
  var sections = [];
  for (var i = 0; i < links.length; i++) {
    var id = links[i].getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) {
      map[id] = links[i];
      sections.push(section);
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        for (var k = 0; k < links.length; k++) {
          links[k].classList.remove("active");
        }
        var link = map[entry.target.id];
        link.classList.add("active");
        // keep the active pill visible on small screens
        link.parentNode.parentNode.parentNode.scrollTo({
          left: link.offsetLeft - 80,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}


// ---------- 8. Back-to-top button ----------
// The button appears when the big hero leaves the screen
function initToTop() {
  var button = document.getElementById("to_top");
  var hero = document.getElementById("mainvisual") || document.getElementById("pagevisual");
  if (!button) {
    return;
  }

  if (hero && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      button.classList.toggle("show", !entries[0].isIntersecting);
    });
    observer.observe(hero);
  }

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("main").focus({ preventScroll: true });
  });
}


// ---------- 9. "Listen" buttons ----------
function initSpeech() {
  var buttons = document.querySelectorAll(".say_button");

  if (!("speechSynthesis" in window)) {
    document.documentElement.classList.add("no_speech");
    return;
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var button = this;
      var voice = new SpeechSynthesisUtterance(button.getAttribute("data-say"));
      voice.lang = "ja-JP";
      voice.rate = 0.85;
      voice.onend = function () {
        button.classList.remove("is-playing");
      };
      window.speechSynthesis.cancel();
      button.classList.add("is-playing");
      window.speechSynthesis.speak(voice);
    });
  }
}


// ---------- 10. Sakura petals ----------
// Each .petals box gets a few petals with random size, speed and position
function initPetals() {
  if (reduceMotion) {
    return;
  }
  var boxes = document.querySelectorAll(".petals");
  var count = window.innerWidth < 700 ? 8 : 16;

  for (var b = 0; b < boxes.length; b++) {
    var many = Number(boxes[b].getAttribute("data-count")) || count;
    for (var i = 0; i < many; i++) {
      var petal = document.createElement("span");
      petal.className = "petal";
      petal.style.setProperty("--x", Math.random() * 100 + "%");
      petal.style.setProperty("--size", (8 + Math.random() * 10) + "px");
      petal.style.setProperty("--alpha", (0.45 + Math.random() * 0.45).toFixed(2));
      petal.style.setProperty("--time", (11 + Math.random() * 10) + "s");
      petal.style.setProperty("--delay", (-Math.random() * 20) + "s");
      petal.style.setProperty("--drift", (Math.random() * 160 - 40) + "px");
      boxes[b].appendChild(petal);
    }
  }
}


// ---------- 11. Card tilt ----------
// Cards lean a little toward the mouse (only with a mouse, not on phones)
function initTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }
  var cards = document.querySelectorAll(".tilt");

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("pointermove", function (event) {
      var box = this.getBoundingClientRect();
      var x = (event.clientX - box.left) / box.width - 0.5;
      var y = (event.clientY - box.top) / box.height - 0.5;
      this.style.transform = "perspective(900px) rotateX(" + (-y * 6) + "deg) rotateY(" + (x * 6) + "deg) translateY(-6px)";
    });
    cards[i].addEventListener("pointerleave", function () {
      this.style.transform = "";
    });
  }
}


// ---------- 12. Tips carousel ----------
function initCarousel() {
  var track = document.querySelector(".tips_track");
  var prev = document.querySelector(".carousel_btn.prev");
  var next = document.querySelector(".carousel_btn.next");
  if (!track || !prev || !next) {
    return;
  }

  function step() {
    var card = track.querySelector(".tip_card");
    return card ? card.getBoundingClientRect().width + 24 : 300;
  }

  function updateButtons() {
    var max = track.scrollWidth - track.clientWidth - 4;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max;
  }

  prev.addEventListener("click", function () {
    track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" });
  });
  next.addEventListener("click", function () {
    track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" });
  });
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}


// ---------- 13. Ready checklist (traffic page) ----------
var CHECK_KEY = "enjoyJapanChecklist";

function updateChecklist() {
  var boxes = document.querySelectorAll(".ready_list input");
  var counter = document.getElementById("ready_count");
  var bar = document.querySelector(".meter_bar span");
  if (boxes.length === 0 || !counter) {
    return;
  }

  var done = 0;
  var saved = [];
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      done++;
      saved.push(boxes[i].id);
    }
  }

  counter.textContent = done + " / " + boxes.length;
  if (bar) {
    bar.style.transform = "scaleX(" + done / boxes.length + ")";
  }

  try {
    localStorage.setItem(CHECK_KEY, JSON.stringify(saved));
  } catch (error) {
    // do nothing
  }
}

function initChecklist() {
  var boxes = document.querySelectorAll(".ready_list input");
  if (boxes.length === 0) {
    return;
  }

  var saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(CHECK_KEY)) || [];
  } catch (error) {
    saved = [];
  }

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = saved.indexOf(boxes[i].id) !== -1;
    boxes[i].addEventListener("change", updateChecklist);
  }
  updateChecklist();
}


// ---------- 14. Photo fade-in ----------
function initImages() {
  var images = document.querySelectorAll("img.fade");
  for (var i = 0; i < images.length; i++) {
    if (images[i].complete) {
      images[i].classList.add("is-loaded");
    } else {
      images[i].addEventListener("load", markLoaded);
      images[i].addEventListener("error", markLoaded);
    }
  }
}

function markLoaded() {
  this.classList.add("is-loaded");
}


// ---------- Start everything ----------
document.addEventListener("DOMContentLoaded", function () {
  initLanguage();
  initHeader();
  initMenu();
  initProgress();
  initReveal();
  initPageNav();
  initToTop();
  initSpeech();
  initPetals();
  initTilt();
  initCarousel();
  initChecklist();
  initImages();

  // Hide the loader shortly after the page is ready
  // (we do not wait for every photo, so the page opens fast)
  window.setTimeout(hideLoader, 350);
});
