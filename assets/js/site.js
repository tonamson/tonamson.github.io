(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Skip-ready: close mobile nav on escape / resize */
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");

  function setOpen(open) {
    if (!panel || !toggle) return;
    panel.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setOpen(!panel.classList.contains("is-open"));
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  /* Deep-link: jump after layout, force reveals visible */
  var hashId = location.hash.replace("#", "") || new URLSearchParams(location.search).get("s");
  if (hashId) {
    var hashEl = document.getElementById(hashId);
    if (hashEl) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-in");
      });
      setTimeout(function () { hashEl.scrollIntoView(); }, 50);
    }
  }

  /* Reveal */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Magnetic primary CTA - transform only, no React state */
  var mag = document.querySelector("[data-magnetic]");
  if (mag && !reduce) {
    var tx = 0;
    var ty = 0;
    var cx = 0;
    var cy = 0;
    var raf = 0;

    function tick() {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      mag.style.transform = "translate(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px)";
      raf = requestAnimationFrame(tick);
    }

    mag.addEventListener("pointermove", function (e) {
      var r = mag.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * 0.28;
      ty = (e.clientY - (r.top + r.height / 2)) * 0.28;
    });
    mag.addEventListener("pointerleave", function () {
      tx = 0;
      ty = 0;
    });
    raf = requestAnimationFrame(tick);
  }

  /* One kinetic moment: name scramble on hover */
  var nameEl = document.getElementById("name");
  if (nameEl && !reduce) {
    var WORD = nameEl.getAttribute("data-word") || "tonamson";
    var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    nameEl.textContent = "";
    var chars = WORD.split("").map(function (c) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = c;
      span.dataset.final = c;
      nameEl.appendChild(span);
      return span;
    });

    function scramble(el, steps) {
      if (el.dataset.busy === "1") return;
      el.dataset.busy = "1";
      el.classList.add("is-scrambling");
      var step = 0;
      (function tick() {
        if (step < steps) {
          el.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          step++;
          setTimeout(tick, 28);
        } else {
          el.textContent = el.dataset.final;
          el.classList.remove("is-scrambling");
          el.dataset.busy = "0";
        }
      })();
    }

    nameEl.addEventListener("pointerenter", function () {
      chars.forEach(function (el, i) {
        setTimeout(function () { scramble(el, 4 + (i % 3)); }, i * 40);
      });
    });
  }

  /* TOC active via IntersectionObserver (no scroll listener) */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      map[id] = a;
    });
    var tocIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
        var link = map[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) tocIo.observe(el);
    });
  }
})();
