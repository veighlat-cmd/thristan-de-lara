/* =====================================================================
   main.js: renders js/data.js into the page and wires up interactions.
   You normally don't need to edit this file; edit js/data.js instead.
   ===================================================================== */
(() => {
  "use strict";

  const D = window.PORTFOLIO;
  if (!D) { console.error("js/data.js did not load"); return; }

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.documentElement;
  const mqReduced = matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => mqReduced.matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // "", "#" and "TBD" mean "not filled in yet": those parts are hidden
  const isTBD = (v) => !v || ["#", "TBD"].includes(String(v).trim().toUpperCase());
  const PLACEHOLDER_PHOTO = "assets/profile-placeholder.svg";

  /* ---------- UI icons (inline SVG, Feather-style) ---------- */
  const ICONS = {
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    arrowUpRight: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    chevL: '<polyline points="15 18 9 12 15 6"/>',
    chevR: '<polyline points="9 18 15 12 9 6"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    school: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><line x1="22" y1="10" x2="22" y2="16"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="12" y1="6" x2="12.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  };
  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
  const fillIcons = (scope = document) => $$("[data-icon]", scope).forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

  /* ---------- Logos (official SVGs in assets/icons, listed in data.js) ---------- */
  const logo = (name) => { const l = (D.logos || {})[name]; return typeof l === "string" ? { src: l } : l; };
  const logoSrc = (name) => logo(name)?.src;
  const logoColor = (name) => logo(name)?.color || "";
  const logoImg = (name, size) =>
    logoSrc(name) ? `<img src="${esc(logoSrc(name))}" alt="" width="${size}" height="${size}" loading="lazy" decoding="async">` : "";
  const techTag = (t) =>
    `<li class="tech">${logoSrc(t) ? `<span class="logo-chip logo-chip--xs">${logoImg(t, 14)}</span>` : ""}${esc(t)}</li>`;
  const techList = (tech) => (tech || []).filter((t) => !isTBD(t)).map(techTag).join("");
  const linkAttrs = (url) => (/^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "");

  /* ---------- Shared helpers ---------- */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(d || "");
    if (!m) return d && d !== "TBD" ? d : "Date TBD";
    return [m[3] ? Number(m[3]) : "", m[2] ? MONTHS[Number(m[2]) - 1] : "", m[1]].filter(Boolean).join(" ");
  };
  const byNewest = (a, b) => {
    const ka = /^\d{4}/.test(a.date) ? a.date : "0000", kb = /^\d{4}/.test(b.date) ? b.date : "0000";
    return kb.localeCompare(ka); // "TBD" dates sink to the bottom
  };
  const certificates = () => [...(D.achievements || [])].sort(byNewest);
  const isPdf = (f) => /\.pdf(\?|#|$)/i.test(f || "");
  const issuerText = (a) => (a.issuer && a.issuer !== "TBD" ? a.issuer : "Issuer TBD");
  const autoValue = (v) => {
    if (v === "auto:projects") return D.projects.length;
    if (v === "auto:certificates") return certificates().length;
    return v;
  };
  const usePhoto = (img) => {
    const crop = (D.profile.photoCrop || {})[img.dataset.crop];
    if (crop) {
      img.style.setProperty("--px", crop.x || "50%");
      img.style.setProperty("--py", crop.y || "50%");
      img.style.setProperty("--zoom", crop.zoom || 1);
    }
    img.src = D.profile.photo;
    img.alt = D.profile.photoAlt || D.profile.name;
    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      ["--px", "--py", "--zoom"].forEach((v) => img.style.removeProperty(v)); // crop is for the real photo only
      img.src = PLACEHOLDER_PHOTO;
    });
  };

  // Count a number up from 0 (keeps decimals, e.g. 99.7)
  function countUp(el, duration = 1300) {
    const to = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = (String(el.dataset.count).split(".")[1] || "").length;
    const out = (v) => { el.textContent = v.toFixed(decimals) + suffix; };
    if (reduced() || !Number.isFinite(to)) { out(to || 0); return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      out(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* =================================================================
     THEME (light / dark)  · initial theme is set by the inline script in <head>
     ================================================================= */
  let network = null; // hero canvas, re-reads its color when the theme changes
  let maskSeq = 0;
  const themeSvg = () => {
    const id = `moonMask${++maskSeq}`;
    const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r = (a * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
      return `<line x1="${(12 + 8.2 * c).toFixed(2)}" y1="${(12 + 8.2 * s).toFixed(2)}" x2="${(12 + 10.6 * c).toFixed(2)}" y2="${(12 + 10.6 * s).toFixed(2)}"/>`;
    }).join("");
    return `<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <mask id="${id}"><rect x="-6" y="-6" width="36" height="36" fill="#fff"/><circle class="moon-cut" cx="24" cy="5" r="6" fill="#000"/></mask>
      <circle class="sun-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#${id})"/>
      <g class="sun-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">${rays}</g>
    </svg>`;
  };
  function applyTheme(theme, animate) {
    if (animate && !reduced()) {
      root.classList.add("theme-anim");
      clearTimeout(applyTheme.timer);
      applyTheme.timer = setTimeout(() => root.classList.remove("theme-anim"), 450);
    }
    root.setAttribute("data-theme", theme);
    const next = theme === "dark" ? "light" : "dark";
    $$(".js-theme-label").forEach((el) => { el.textContent = `${next === "dark" ? "Dark" : "Light"} mode`; });
    const btn = $("#themeToggle");
    btn.setAttribute("aria-label", `Switch to ${next} mode`);
    btn.title = `Switch to ${next} mode`;
    $$('meta[name="theme-color"]').forEach((m) => { m.content = theme === "dark" ? "#0b1120" : "#f8fafc"; });
    if (network) network.refresh();
  }
  function initTheme() {
    $$(".js-theme-toggle .theme-icon").forEach((el) => { el.innerHTML = themeSvg(); });
    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    $$(".js-theme-toggle").forEach((b) => b.addEventListener("click", () => {
      const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(theme, true);
      try { localStorage.setItem("theme", theme); } catch (_) { /* storage blocked: still works for this visit */ }
    }));
    // follow the system setting until the visitor picks a theme themselves
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch (_) { /* ignore */ }
      if (saved !== "light" && saved !== "dark") applyTheme(e.matches ? "dark" : "light", true);
    });
  }

  /* =================================================================
     HERO
     ================================================================= */
  function renderHero() {
    const p = D.profile;
    $$("[data-bind]").forEach((el) => { const v = p[el.dataset.bind]; if (v != null) el.textContent = v; });
    $("#year").textContent = new Date().getFullYear();

    // name: one span per word so they can animate in
    const words = String(p.name).split(/\s+/);
    $("#heroName").innerHTML = words
      .map((w, i) => `<span class="word" style="--i:${i}">${esc(w)}</span>`)
      .join(" ");

    const typed = p.typedRoles && p.typedRoles.length ? p.typedRoles : (p.roles || []).slice(1);
    $("#heroRole").innerHTML = `${esc((p.roles || [])[0] || "")}<span class="sep" aria-hidden="true">·</span>`
      + `<span class="sr-only">, ${esc(typed.join(", "))}</span>`
      + `<span class="typed" id="typed" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span>`;

    $("#heroHighlights").innerHTML = (p.highlights || [])
      .map((h) => {
        const v = autoValue(h.value);
        const num = typeof v === "number" || /^\d+(\.\d+)?$/.test(String(v));
        return `<li><strong${num ? ` data-count="${esc(v)}"` : ""}>${num ? "0" : esc(v)}</strong><span>${esc(h.label)}</span></li>`;
      })
      .join("");
    $$(".js-photo").forEach(usePhoto);
  }

  function initTyping() {
    const el = $("#typed");
    const p = D.profile;
    const roles = p.typedRoles && p.typedRoles.length ? p.typedRoles : (p.roles || []).slice(1);
    if (!el || !roles.length) return;
    if (reduced()) { el.textContent = roles.join(" · "); return; }
    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      let delay = deleting ? 35 : 70 + Math.random() * 45;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1100); // start once the name has animated in
  }

  function initHighlights() {
    const nums = $$("#heroHighlights [data-count]");
    const start = () => nums.forEach((n) => countUp(n, 1400));
    setTimeout(start, reduced() ? 0 : Math.max(0, 1300 - performance.now()));
  }

  /* ---------- Hero background: a soft "neural network" of drifting dots ---------- */
  function initNetwork() {
    const hero = $("#home");
    const canvas = $("#heroCanvas");
    if (reduced() || !canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext("2d");
    hero.classList.add("has-canvas");
    const LINK = 130, MOUSE = 170;
    let w = 0, h = 0, pts = [], raf = 0, onScreen = true;
    let rgb = "37, 99, 235", alpha = 0.5;
    const mouse = { x: 0, y: 0, on: false };

    const refresh = () => {
      const cs = getComputedStyle(root);
      rgb = cs.getPropertyValue("--canvas-rgb").trim() || rgb;
      alpha = parseFloat(cs.getPropertyValue("--canvas-alpha")) || alpha;
    };
    const resize = () => {
      const rect = hero.getBoundingClientRect();
      w = rect.width; h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(80, Math.max(22, (w * h) / 17000)));
      pts = Array.from({ length: n }, (_, k) => (pts[k] && pts[k].x <= w && pts[k].y <= h)
        ? pts[k]
        : { x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32 });
    };
    const frame = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        if (mouse.on) { // gentle pull toward the cursor
          const dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx * dx + dy * dy;
          if (d2 < MOUSE * MOUSE) { const f = (1 - Math.sqrt(d2) / MOUSE) * 0.012; p.x += dx * f; p.y += dy * f; }
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${rgb}, ${((1 - Math.sqrt(d2) / LINK) * alpha * 0.55).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse.on) {
          const dx = a.x - mouse.x, dy = a.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < MOUSE * MOUSE) {
            ctx.strokeStyle = `rgba(${rgb}, ${((1 - Math.sqrt(d2) / MOUSE) * alpha * 0.8).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill(); }
      schedule();
    };
    // only animate while the hero is on screen and the tab is visible
    const schedule = () => { if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame); };
    new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; schedule(); }).observe(hero);
    document.addEventListener("visibilitychange", schedule);
    let resizeRaf = 0;
    new ResizeObserver(() => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(resize); }).observe(hero);
    if (finePointer) {
      hero.addEventListener("pointermove", (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
      });
      hero.addEventListener("pointerleave", () => { mouse.on = false; });
    }
    refresh();
    resize();
    schedule();
    return { refresh };
  }

  /* =================================================================
     ABOUT
     ================================================================= */
  function renderAbout() {
    const p = D.profile;
    $("#aboutBio").innerHTML = (p.bio || []).map((t, i) => `<p class="reveal" style="--d:${0.12 + i * 0.08}s">${esc(t)}</p>`).join("");
    $("#aboutFacts").innerHTML = (p.facts || [])
      .map((f) => `<div class="fact"><span class="fact__icon">${icon(f.icon)}</span><div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div></div>`)
      .join("");
  }

  /* =================================================================
     PROJECTS
     ================================================================= */
  const projectLinks = (p, size) => [
    isTBD(p.demo) ? "" : `<a class="btn btn--outline ${size}" href="${esc(p.demo)}"${linkAttrs(p.demo)}>Live demo ${icon("external")}</a>`,
    isTBD(p.github) ? "" : `<a class="btn btn--outline ${size}" href="${esc(p.github)}"${linkAttrs(p.github)}>${icon("github")} Code</a>`,
  ].join("");
  // tag can be one badge or a list of badges; icon/color add a small project icon
  const projectMeta = (p) => {
    const tags = (Array.isArray(p.tag) ? p.tag : [p.tag]).filter((t) => !isTBD(t));
    const mark = p.icon && ICONS[p.icon] ? `<span class="project-icon" style="--pc:${esc(p.color || "var(--accent)")}" aria-hidden="true">${icon(p.icon)}</span>` : "";
    const text = [p.category, p.year].filter((x) => !isTBD(x)).join(" · ");
    return `${mark}${text ? `<span>${esc(text)}</span>` : ""}${tags.map((t) => `<span class="badge">${esc(t)}</span>`).join("")}`;
  };
  const projectShots = (p) => (p.gallery && p.gallery.length ? p.gallery : (p.cover || []).map((src) => ({ src, caption: "" })));

  // Animated detection box drawn over the live screenshot (coordinates in image pixels)
  function scanOverlay(s) {
    const [W, H] = s.size;
    const [x, y, w, h] = s.box;
    const lh = 38, ly = y - lh - 6, lw = Math.min(w, 470);
    return `<svg class="scan" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2dd4bf" stop-opacity="0"/><stop offset=".8" stop-color="#2dd4bf" stop-opacity=".28"/><stop offset="1" stop-color="#99f6e4" stop-opacity=".95"/>
        </linearGradient>
        <clipPath id="scanClip"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
      </defs>
      <g clip-path="url(#scanClip)"><rect class="scan__sweep" style="--y0:-90px;--y1:${h + 10}px" x="${x}" y="${y}" width="${w}" height="90" fill="url(#scanGrad)"/></g>
      <path class="scan__box" d="M${x} ${y}h${w}v${h}h${-w}Z" pathLength="100" fill="none" stroke="#fb7185" stroke-width="7" stroke-linejoin="round"/>
      <g class="scan__label">
        <rect x="${x}" y="${ly}" width="${lw}" height="${lh}" rx="10" fill="#fb7185"/>
        <text x="${x + 16}" y="${ly + 26}" fill="#fff" font-family="Inter, system-ui, sans-serif" font-size="21" font-weight="700" textLength="${lw - 32}" lengthAdjust="spacingAndGlyphs">${esc(s.label)}</text>
      </g>
    </svg>`;
  }

  function projectCard(p, i, wide) {
    const cover = p.cover && p.cover.length ? p.cover : [projectShots(p)[0]?.src].filter(Boolean);
    let media;
    if (p.device === "phone") {
      const main = p.scan ? p.scan.cover : Math.floor(Math.min(cover.length, 3) / 2);
      media = `<div class="pmedia pmedia--phones">${cover.slice(0, 3).map((src, n) => `
        <div class="phone${n === main ? " phone--main" : ""}">
          <img src="${esc(src)}" alt="" width="720" height="1515" loading="lazy" decoding="async">
          ${n === main && p.scan ? scanOverlay(p.scan) : ""}
        </div>`).join("")}</div>`;
    } else {
      media = `<div class="pmedia pmedia--desktop"><img src="${esc(cover[0] || "")}" alt="" width="1600" height="767" loading="lazy" decoding="async"${p.coverPosition ? ` style="object-position:${esc(p.coverPosition)}"` : ""}></div>`;
    }
    return `
      <article class="project card reveal${p.featured ? " project--featured" : ""}${wide ? " project--wide" : ""}" data-id="${esc(p.id)}" style="--d:${0.1 + i * 0.1}s">
        <div class="project__media" aria-hidden="true">${media}<span class="media-cta">View case study ${icon("arrowRight")}</span></div>
        <div class="project__body">
          ${p.featured ? `<p class="featured-label">${icon("star")} Featured project</p>` : ""}
          <p class="project__meta">${projectMeta(p)}</p>
          <h3 class="project__title">${esc(p.title)}</h3>
          <p class="project__desc">${esc(p.description)}</p>
          <ul class="techs" aria-label="Technologies used">${techList(p.tech)}</ul>
          <div class="project__actions">
            <button class="btn btn--primary btn--sm project__open" type="button" aria-haspopup="dialog">View case study ${icon("arrowRight")}</button>
            ${projectLinks(p, "btn--sm")}
          </div>
        </div>
      </article>`;
  }

  function renderProjects() {
    // featured project first (the big bento tile), the rest keep their order
    const list = [...D.projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    // a lone tile in the last row spans the full width instead of leaving an empty gap
    const rest = list.filter((p) => !p.featured).length;
    $("#projectsGrid").innerHTML = list.map((p, i) => projectCard(p, i, !p.featured && i === list.length - 1 && rest % 2 === 1)).join("");
  }

  // Soft glow that follows the mouse inside each project card (desktop only)
  function initSpotlight() {
    if (!finePointer || reduced()) return;
    const grid = $("#projectsGrid");
    grid.classList.add("has-spot");
    let raf = 0, card = null, x = 0, y = 0;
    grid.addEventListener("pointermove", (e) => {
      card = e.target.closest(".project");
      if (!card) return;
      const r = card.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
      });
    });
  }

  /* =================================================================
     SKILLS
     ================================================================= */
  function renderSkills() {
    // logo marquee: the list is repeated so it can loop seamlessly; copies are hidden from screen readers
    const names = (D.marquee || Object.keys(D.logos || {})).filter(logoSrc);
    const item = (n, hidden) => `<span class="marquee__item"${hidden ? ' aria-hidden="true"' : ""}><span class="logo-chip">${logoImg(n, 20)}</span>${esc(n)}</span>`;
    const half = names.map((n) => item(n, false)).join("") + names.map((n) => item(n, true)).join("");
    const marquee = $("#logoMarquee");
    marquee.setAttribute("role", "group");
    marquee.setAttribute("aria-label", "Technologies I use");
    marquee.innerHTML = `<div class="marquee__track">${half}${half.replace(/class="marquee__item">/g, 'class="marquee__item" aria-hidden="true">')}</div>`;

    $("#skillsGroups").innerHTML = (D.skills || [])
      .map((g) => `
        <div class="skills__group">
          <h3 class="skills__group-title reveal">${esc(g.group)}</h3>
          <ul class="skill-grid">
            ${g.items.map((s, i) => {
              const logos = (s.logos || []).filter(logoSrc);
              const brand = logos.length ? logoColor(logos[0]) : "";
              return `
              <li class="skill card reveal" style="--d:${0.06 + i * 0.09}s">
                ${logos.length ? `<span class="logo-chip logo-chip--lg${logos.length > 1 ? " logo-chip--pair" : ""}"${brand ? ` style="--brand:${esc(brand)}"` : ""}>${logos.map((l) => logoImg(l, 28)).join("")}</span>` : ""}
                <div class="skill__body">
                  <div class="skill__head">
                    <h4 class="skill__name">${esc(s.name)}</h4>
                    <span class="level level--${esc(String(s.level).toLowerCase())}">${esc(s.level)}</span>
                  </div>
                  <p class="skill__desc">${esc(s.description)}</p>
                </div>
              </li>`;
            }).join("")}
          </ul>
        </div>`)
      .join("");
    $("#softSkills").innerHTML = (D.softSkills || []).map((s, i) => `<li class="reveal" style="--d:${0.05 + i * 0.06}s">${esc(s)}</li>`).join("");
  }

  /* =================================================================
     ACHIEVEMENTS (certificate timeline)
     ================================================================= */
  function renderCertificates() {
    $("#certGrid").innerHTML = certificates()
      .map((c, i) => `
        <li class="tl-item reveal" style="--d:${0.05 + i * 0.06}s">
          <span class="tl-dot" aria-hidden="true"></span>
          <button class="cert card" type="button" data-index="${i}" aria-haspopup="dialog" aria-label="View certificate: ${esc(c.title)}">
            <span class="cert__thumb">
              <img src="${esc(c.thumb || c.file)}" alt="" width="640" height="452" loading="lazy" decoding="async">
              ${isPdf(c.file) ? '<span class="cert__badge">PDF</span>' : ""}
            </span>
            <span class="cert__body">
              <span class="cert__date">${icon("calendar")} ${esc(fmtDate(c.date))}</span>
              <span class="cert__title">${esc(c.title)}</span>
              <span class="cert__meta">${esc(issuerText(c))}</span>
              <span class="cert__view">View certificate ${icon("arrowRight")}</span>
            </span>
          </button>
        </li>`)
      .join("");
  }

  /* =================================================================
     CONTACT
     ================================================================= */
  const socials = () => (D.socials || []).filter((s) => !isTBD(s.url));
  const socialMark = (s, size) => (s.logo && logoSrc(s.logo) ? logoImg(s.logo, size) : icon(s.icon || "external"));

  function renderContact() {
    $("#contactHeading").textContent = D.contact.heading;
    $("#contactText").textContent = D.contact.text;
    $("#contactLinks").innerHTML = socials()
      .map((s, i) => {
        const isMail = /^mailto:/i.test(s.url);
        const copy = isMail
          ? `<button class="btn btn--outline copy-btn" type="button" data-copy="${esc(s.url.replace(/^mailto:/i, "").split("?")[0])}" aria-label="Copy email address">${icon("copy")}<span>Copy</span></button>`
          : "";
        return `
          <li class="contact-item reveal" style="--d:${0.12 + i * 0.08}s">
            <a class="contact-link card" href="${esc(s.url)}"${linkAttrs(s.url)}>
              <span class="logo-chip logo-chip--md">${socialMark(s, 22)}</span>
              <span class="contact-link__text"><strong>${esc(s.label)}</strong><small>${esc(s.handle)}</small></span>
              ${icon(isMail ? "mail" : "arrowUpRight")}
            </a>
            ${copy}
          </li>`;
      })
      .join("");
    $("#footerLinks").innerHTML = socials()
      .map((s) => `<li><a href="${esc(s.url)}"${linkAttrs(s.url)} aria-label="${esc(s.label)}" title="${esc(s.label)}">${socialMark(s, 18)}</a></li>`)
      .join("");
  }

  /* =================================================================
     BEHAVIOUR
     ================================================================= */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $$(".nav__link");
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    links.forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
    });

    // highlight the section in the middle of the viewport
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        const a = byId.get(en.target.id);
        if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  // One rAF-throttled scroll handler: progress bar, glass navbar, back-to-top ring, timeline line
  function initScroll() {
    const nav = $("#nav");
    const bar = $("#scrollProgress");
    const toTop = $("#toTop");
    const ring = $("#toTopBar");
    const timeline = $("#certTimeline");
    const line = $("#timelineLine");
    const items = $$(".tl-item");
    const C = 2 * Math.PI * 21;
    ring.style.strokeDasharray = C.toFixed(2);
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
      nav.classList.toggle("is-scrolled", y > 12);
      toTop.classList.toggle("is-visible", y > innerHeight * 0.8);
      ring.style.strokeDashoffset = (C * (1 - p)).toFixed(2);
      // the timeline line "draws" down to 60% of the screen; dots pop in once the line reaches them
      const mark = innerHeight * 0.6;
      const r = timeline.getBoundingClientRect();
      const tp = reduced() ? 1 : Math.min(1, Math.max(0, (mark - r.top) / r.height));
      line.style.setProperty("--p", tp.toFixed(4));
      items.forEach((it) => {
        const dot = it.querySelector(".tl-dot");
        it.classList.toggle("is-reached", reduced() || dot.getBoundingClientRect().top < mark);
      });
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" }); // any part on screen; tall cards never get stuck hidden
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Dialog helpers (case study + lightbox) ---------- */
  function openDialog(dlg, opener) {
    dlg._opener = opener || document.activeElement;
    document.body.classList.add("modal-open");
    dlg.showModal();
  }
  function wireDialog(dlg) {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
    });
    dlg.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (dlg._opener && document.contains(dlg._opener)) dlg._opener.focus({ preventScroll: true });
    });
  }

  /* ---------- Project case study ---------- */
  function initProjects() {
    const modal = $("#projectModal");
    const img = $("#pmImg");
    const thumbs = $("#pmThumbs");
    let shots = [], idx = 0, current = null;
    wireDialog(modal);

    const show = (i) => {
      idx = (i + shots.length) % shots.length;
      const s = shots[idx];
      img.src = s.src;
      img.alt = s.caption ? `${current.title}: ${s.caption}` : `${current.title} screenshot ${idx + 1}`;
      $("#pmCaption").textContent = shots.length > 1 ? `${s.caption || "Screenshot"} (${idx + 1} of ${shots.length})` : s.caption || "";
      $$(".viewer__thumb", thumbs).forEach((b, n) => b.setAttribute("aria-current", n === idx));
    };

    function open(id, opener) {
      const p = D.projects.find((x) => x.id === id);
      if (!p) return;
      current = p;
      shots = projectShots(p);
      modal.classList.remove("is-animated");
      modal.classList.toggle("is-phone", p.device === "phone");
      $("#pmMeta").innerHTML = projectMeta(p);
      $("#pmTitle").textContent = p.fullTitle || p.title;
      $("#pmDesc").textContent = p.description;
      $("#pmViewer").hidden = !shots.length;
      const multi = shots.length > 1;
      $("#pmPrev").hidden = !multi;
      $("#pmNext").hidden = !multi;
      thumbs.hidden = !multi;
      thumbs.innerHTML = multi
        ? shots.map((s, n) => `<button class="viewer__thumb" type="button" data-n="${n}" aria-label="Show screenshot ${n + 1}: ${esc(s.caption || "")}"><img src="${esc(s.src)}" alt="" loading="lazy"></button>`).join("")
        : "";
      $("#pmNote").textContent = p.galleryNote || "";
      $("#pmNote").hidden = !p.galleryNote;

      const block = (title, body, wide) => `<section class="case__block${wide ? " case__block--wide" : ""}"><h4><span>${title}</span></h4>${body}</section>`;
      const features = (p.features || []).filter((f) => !isTBD(f));
      const tech = techList(p.tech);
      const bars = p.bars && (p.bars.items || []).length
        ? block(esc(p.bars.title || "Results"), `<div class="bars">${p.bars.items.map((b, n) => `
            <div class="bar-row">
              <span class="bar-row__label">${esc(b.label)}</span>
              <span class="bar"><span style="--v:${Number(b.value)}%; --bd:${0.15 + n * 0.12}s"></span></span>
              <span class="bar-row__value" data-count="${esc(b.value)}" data-suffix="%">0%</span>
            </div>`).join("")}</div>${p.bars.note ? `<p class="case__note">${esc(p.bars.note)}</p>` : ""}`, true)
        : "";
      $("#pmCase").innerHTML = [
        isTBD(p.problem) ? "" : block("Problem", `<p>${esc(p.problem)}</p>`),
        isTBD(p.solution) ? "" : block("Solution", `<p>${esc(p.solution)}</p>`),
        isTBD(p.role) ? "" : block("My role", `<p>${esc(p.role)}</p>`),
        tech ? block("Tech used", `<ul class="techs">${tech}</ul>`) : "",
        isTBD(p.process) ? "" : block("Process", `<p>${esc(p.process)}</p>`),
        isTBD(p.results) ? "" : block("Results", `<p>${esc(p.results)}</p>`),
        bars,
        features.length ? block("Key features", `<ul class="features">${features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul>`, true) : "",
      ].join("");
      $("#pmActions").innerHTML = projectLinks(p, "");
      if (shots.length) show(0);
      openDialog(modal, opener);
      modal.scrollTop = 0;
      // animate the results chart once the dialog is on screen
      requestAnimationFrame(() => requestAnimationFrame(() => {
        modal.classList.add("is-animated");
        $$("[data-count]", modal).forEach((el) => countUp(el, 1200));
      }));
    }

    $("#projectsGrid").addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // demo / code links work normally
      const card = e.target.closest(".project");
      if (card && e.target.closest(".project__open, .project__media")) open(card.dataset.id, $(".project__open", card));
    });
    thumbs.addEventListener("click", (e) => {
      const t = e.target.closest(".viewer__thumb");
      if (t) show(Number(t.dataset.n));
    });
    $("#pmPrev").addEventListener("click", () => show(idx - 1));
    $("#pmNext").addEventListener("click", () => show(idx + 1));
    modal.addEventListener("keydown", (e) => {
      if (shots.length < 2) return;
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Certificate lightbox ---------- */
  function initLightbox() {
    const lb = $("#lightbox");
    const img = $("#lbImg");
    const certs = certificates();
    let idx = 0;
    wireDialog(lb);

    const show = (i) => {
      idx = (i + certs.length) % certs.length;
      const c = certs[idx];
      const pdf = isPdf(c.file);
      img.src = pdf ? c.thumb : c.file;
      img.alt = `Certificate: ${c.title}`;
      $("#lbTitle").textContent = c.title;
      $("#lbMeta").textContent = `${issuerText(c)} · ${fmtDate(c.date)}`;
      $("#lbCount").textContent = `${idx + 1} / ${certs.length}`;
    };
    $("#certGrid").addEventListener("click", (e) => {
      const btn = e.target.closest(".cert");
      if (!btn) return;
      show(Number(btn.dataset.index));
      openDialog(lb, btn);
    });
    const single = certs.length < 2;
    $("#lbPrev").hidden = single;
    $("#lbNext").hidden = single;
    $("#lbPrev").addEventListener("click", () => show(idx - 1));
    $("#lbNext").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Toast ---------- */
  function toast(message) {
    const t = $("#toast");
    t.innerHTML = `${icon("check")}<span>${esc(message)}</span>`;
    t.classList.remove("is-on");
    void t.offsetWidth; // restart the animation
    t.classList.add("is-on");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  /* ---------- Copy email ---------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fallback for browsers/pages without clipboard permission
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (__) { ok = false; }
      ta.remove();
      return ok;
    }
  }
  function initCopy() {
    $("#contactLinks").addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const ok = await copyText(btn.dataset.copy);
      btn.classList.toggle("is-copied", ok);
      btn.innerHTML = `${icon(ok ? "check" : "copy")}<span>${ok ? "Copied!" : "Copy failed"}</span>`;
      btn.setAttribute("aria-label", ok ? "Email address copied" : "Copy failed");
      if (ok) toast("Email address copied!");
      clearTimeout(btn._t);
      btn._t = setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.innerHTML = `${icon("copy")}<span>Copy</span>`;
        btn.setAttribute("aria-label", "Copy email address");
      }, 2200);
    });
  }

  /* =================================================================
     BOOT
     ================================================================= */
  renderHero();
  renderAbout();
  renderProjects();
  renderSkills();
  renderCertificates();
  renderContact();
  fillIcons();

  network = initNetwork();
  initTheme();
  initTyping();
  initHighlights();
  initNav();
  initScroll();
  initProjects();
  initSpotlight();
  initLightbox();
  initCopy();
  initReveal();
})();
