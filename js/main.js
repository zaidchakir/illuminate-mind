/* Illuminate Mind — interactions */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector(".site-header");
  var stickyCta = document.querySelector(".sticky-cta");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (stickyCta) stickyCta.classList.toggle("show", y > 560);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector(".hamburger");
  var menu = document.getElementById("mobileMenu");
  var scrim = document.querySelector(".scrim");
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    if (scrim) {
      scrim.hidden = false;
      scrim.classList.toggle("show", open);
      if (!open) setTimeout(function () { if (!menu.classList.contains("open")) scrim.hidden = true; }, 320);
    }
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
  if (menu) menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---- Testimonial carousel ---- */
  var track = document.getElementById("testiTrack");
  var dotsWrap = document.getElementById("testiDots");
  if (track && dotsWrap) {
    var slides = track.children;
    var n = slides.length, idx = 0, timer = null;
    for (var i = 0; i < n; i++) {
      var b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Testimonial " + (i + 1));
      (function (k) { b.addEventListener("click", function () { go(k); restart(); }); })(i);
      dotsWrap.appendChild(b);
    }
    var dots = dotsWrap.children;
    function go(k) {
      idx = (k + n) % n;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      for (var j = 0; j < n; j++) dots[j].classList.toggle("active", j === idx);
    }
    function next() { go(idx + 1); }
    function restart() { if (timer) clearInterval(timer); if (!prefersReduced) timer = setInterval(next, 6000); }
    go(0); restart();
    var sec = document.querySelector(".testi");
    sec.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    sec.addEventListener("mouseleave", restart);
  }

  /* ---- Cart count stub (so "Shop Now" feels alive in the demo) ---- */
  var count = document.querySelector(".cart-count");
  document.querySelectorAll(".pcard .btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (count) { count.textContent = String((parseInt(count.textContent, 10) || 0) + 1); }
      btn.textContent = "Added ✓";
      setTimeout(function () { btn.textContent = "Shop Now"; }, 1400);
    });
  });

  /* ---- Newsletter inline confirmation ---- */
  document.querySelectorAll(".join__form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var fld = f.querySelector(".join__field");
      fld.innerHTML = '<p style="margin:0;color:#fff;font-size:16px">✓ You\'re in. Welcome to the community.</p>';
    });
  });

  /* ---- Scroll reveal (above-the-fold shows immediately; nothing ever stays hidden) ---- */
  if (!prefersReduced && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".science__col li, .science__art, .purity__lead, .purity__points li, .pcard, .guarantee__inner, .testi__inner, .acc, .join__inner, .footer__col"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    var vh = window.innerHeight;
    targets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh - 30) { el.classList.add("in"); }     // already visible → show now
      else { el.classList.add("reveal"); io.observe(el); } // below the fold → animate in on scroll
    });
    // safety net: never leave anything hidden if the observer misfires
    setTimeout(function () { targets.forEach(function (el) { el.classList.add("in"); }); }, 2500);
  }
})();
