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

  /* ---------- Slider screenshot (scroll-snap + tombol + titik) ---------- */
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track = slider.querySelector(".slider__track");
    var slides = Array.prototype.slice.call(track.children);
    var prev = slider.querySelector("[data-prev]");
    var next = slider.querySelector("[data-next]");
    var dotsWrap = slider.querySelector(".slider__dots");
    if (slides.length < 2) { slider.classList.add("is-single"); return; }

    var current = 0;
    var dots = slides.map(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "slider__dot";
      b.setAttribute("aria-label", "Gambar " + (i + 1) + " dari " + slides.length);
      b.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      var s = slides[i];
      var snapStart = getComputedStyle(s).scrollSnapAlign.indexOf("start") === 0;
      var pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      var left = snapStart ? s.offsetLeft - pad : s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2;
      track.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
    }

    function update() {
      var center = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      if (track.scrollLeft <= 4) best = 0;
      else if (atEnd) best = slides.length - 1;
      current = best;
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === current ? "true" : "false"); });
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = atEnd;
    }

    var raf;
    track.addEventListener("scroll", function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener("resize", update);
    prev.addEventListener("click", function () { go(current - 1); });
    next.addEventListener("click", function () { go(current + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
    });
    update();
  });

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
