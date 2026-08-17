(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==================== THEME SWITCHER ==================== */
  var themeToggle = document.querySelector("[data-theme-toggle]");
  function getPreferredTheme() {
    var stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
      var next = current === "light" ? "dark" : "light";
      applyTheme(next);
      if (window.appendTerminalLine) {
        window.appendTerminalLine("system: theme switched to " + next.toUpperCase(), "hud-highlight");
      }
    });
  }

  /* ==================== TOAST NOTIFICATION ==================== */
  var toastTimer = null;
  function showToast(message) {
    var toast = document.getElementById("toast-notice");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notice";
      toast.className = "toast-notice";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="ph ph-check-circle" style="color: var(--success);" aria-hidden="true"></i> <span>' + message + '</span>';
    toast.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2500);
  }

  /* ==================== QUICK CLIPBOARD COPY ==================== */
  document.addEventListener("click", function (e) {
    var copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      e.preventDefault();
      var textToCopy = copyBtn.getAttribute("data-copy");
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          showToast("Copied: " + textToCopy);
        }).catch(function () {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    }
  });

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Copied: " + text);
    } catch (err) {
      showToast("Copy failed, please copy manually.");
    }
    document.body.removeChild(ta);
  }

  /* ==================== INTERACTIVE HUD TERMINAL ==================== */
  var consoleEl = document.getElementById("hud-console");
  var inputEl = document.getElementById("hud-input");
  var history = [];
  var historyIdx = -1;

  window.appendTerminalLine = function (text, className) {
    if (!consoleEl) return;
    var line = document.createElement("div");
    line.className = "hud-line " + (className || "hud-response");
    line.innerHTML = text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  };

  var commands = {
    help: function () {
      return "Available commands: <span class='hud-highlight'>projects</span>, <span class='hud-highlight'>stack</span>, <span class='hud-highlight'>whoami</span>, <span class='hud-highlight'>vibe</span>, <span class='hud-highlight'>theme</span>, <span class='hud-highlight'>clear</span>, <span class='hud-highlight'>contact</span>";
    },
    whoami: function () {
      return "<span class='hud-highlight'>tonamson</span> — Systems & Full-Stack Tool Builder.<br>Focus: AI Agentic Workflows, EVM/Move Blockchain Tooling, Clean Web Utilities.";
    },
    projects: function () {
      return "Featured Repositories:<br>" +
             "• <span class='hud-highlight'>switch-acc-ai</span> (AI workflow session switcher)<br>" +
             "• <span class='hud-highlight'>translate-ai-extension</span> (Contextual translation extension)<br>" +
             "• <span class='hud-highlight'>scan-wallet-evm</span> (Multi-chain EVM token & tx scanner)<br>" +
             "• <span class='hud-highlight'>wimt</span> (Where Is My Token CLI analyzer)<br>" +
             "• <span class='hud-highlight'>scan-wallet-balance</span> (Fast on-chain balance indexer)<br>" +
             "• <span class='hud-highlight'>language-noob</span> (Language learning engine)<br>" +
             "• <span class='hud-highlight'>sui-blockchain</span> (Move smart contracts)";
    },
    stack: function () {
      return "Technical Stack: TypeScript, JavaScript, Solidity, Move, Node.js, Chrome Manifest V3, LLM APIs (Gemini/OpenAI), Web3 RPCs.";
    },
    vibe: function () {
      return "Vibe Code Stack: RTK, Headroom, Caveman, Serena, Code Review Graph, Superpowers, Ponytail, Tasteskill. See: <a href='./vibe-code.html' style='color: var(--accent); text-decoration: underline;'>vibe-code.html</a>";
    },
    contact: function () {
      return "GitHub: <a href='https://github.com/tonamson' target='_blank' style='color: var(--accent);'>github.com/tonamson</a>";
    },
    theme: function () {
      var current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
      var next = current === "light" ? "dark" : "light";
      applyTheme(next);
      return "Switched theme to: <span class='hud-highlight'>" + next.toUpperCase() + "</span>";
    },
    date: function () {
      return new Date().toISOString();
    },
    clear: function () {
      if (consoleEl) consoleEl.innerHTML = "";
      return null;
    }
  };

  function executeCommand(rawCmd) {
    var cmd = (rawCmd || "").trim().toLowerCase();
    if (!cmd) return;
    
    window.appendTerminalLine("<span class='hud-prompt'>$</span> " + escapeHtml(rawCmd), "hud-command-line");

    if (commands[cmd]) {
      var res = commands[cmd]();
      if (res) window.appendTerminalLine(res, "hud-response");
    } else if (cmd.startsWith("clone ")) {
      var repo = cmd.replace("clone ", "").trim();
      var fullRepo = repo.indexOf("/") === -1 ? "tonamson/" + repo : repo;
      var cloneCmd = "gh repo clone " + fullRepo;
      window.appendTerminalLine("Cloning: <span class='hud-highlight'>" + cloneCmd + "</span>", "hud-response");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cloneCmd);
        showToast("Copied: " + cloneCmd);
      }
    } else {
      window.appendTerminalLine("command not found: " + escapeHtml(cmd) + ". Type <span class='hud-highlight'>help</span> for commands.", "hud-response");
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  if (inputEl) {
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var val = inputEl.value;
        if (val.trim()) {
          history.push(val);
          historyIdx = history.length;
          executeCommand(val);
          inputEl.value = "";
        }
      } else if (e.key === "ArrowUp") {
        if (historyIdx > 0) {
          historyIdx--;
          inputEl.value = history[historyIdx] || "";
        }
      } else if (e.key === "ArrowDown") {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          inputEl.value = history[historyIdx] || "";
        } else {
          historyIdx = history.length;
          inputEl.value = "";
        }
      }
    });
  }

  /* Handle clicking quick chips in HUD */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-run]");
    if (chip) {
      var cmd = chip.getAttribute("data-run");
      if (cmd) {
        if (inputEl) inputEl.value = cmd;
        executeCommand(cmd);
      }
    }
  });

  /* ==================== WORK CATEGORY FILTERING ==================== */
  var filterBtns = document.querySelectorAll("[data-filter]");
  var workCards = document.querySelectorAll(".work-card[data-category]");

  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetCat = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        workCards.forEach(function (card) {
          var cardCats = (card.getAttribute("data-category") || "").split(" ");
          if (targetCat === "all" || cardCats.indexOf(targetCat) !== -1) {
            card.classList.remove("is-hidden");
          } else {
            card.classList.add("is-hidden");
          }
        });
      });
    });
  }

  /* ==================== MOBILE NAVIGATION ==================== */
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

  /* ==================== DEEP-LINK SCROLL ==================== */
  var hashId = location.hash.replace("#", "") || new URLSearchParams(location.search).get("s");
  if (hashId) {
    var hashEl = document.getElementById(hashId);
    if (hashEl) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-in");
      });
      setTimeout(function () { hashEl.scrollIntoView(); }, 60);
    }
  }

  /* ==================== REVEAL ON SCROLL ==================== */
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
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ==================== MAGNETIC BUTTONS ==================== */
  var mag = document.querySelector("[data-magnetic]");
  if (mag && !reduce) {
    var tx = 0, ty = 0, cx = 0, cy = 0;
    function tick() {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      mag.style.transform = "translate(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px)";
      requestAnimationFrame(tick);
    }
    mag.addEventListener("pointermove", function (e) {
      var r = mag.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * 0.32;
      ty = (e.clientY - (r.top + r.height / 2)) * 0.32;
    });
    mag.addEventListener("pointerleave", function () {
      tx = 0;
      ty = 0;
    });
    requestAnimationFrame(tick);
  }

  /* ==================== KINETIC TEXT SCRAMBLE ==================== */
  var nameEl = document.getElementById("name");
  if (nameEl && !reduce) {
    var WORD = nameEl.getAttribute("data-word") || "tonamson";
    var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
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

    function triggerScramble() {
      chars.forEach(function (el, i) {
        setTimeout(function () { scramble(el, 5 + (i % 4)); }, i * 45);
      });
    }

    nameEl.addEventListener("pointerenter", triggerScramble);
    setTimeout(triggerScramble, 400);
  }

  /* ==================== TOC SCROLL SPY ==================== */
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
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0.01 });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) tocIo.observe(el);
    });
  }
})();
