/* BarberApp landing — script.js (tanpa library) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  /* ---------- Menu mobile ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll(".nav__menu a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  var hasIO = "IntersectionObserver" in window;

  /* ---------- Reveal (fade/slide halus) ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !hasIO) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Tombol WA melayang: muncul setelah lewat hero ---------- */
  var hero = document.getElementById("hero");
  var fab = document.querySelector(".wa-float");
  if (hero && fab && hasIO) {
    new IntersectionObserver(function (entries) {
      var past = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      fab.classList.toggle("is-visible", past);
      fab.setAttribute("tabindex", past ? "0" : "-1");
      fab.setAttribute("aria-hidden", past ? "false" : "true");
    }).observe(hero);
  }
})();
