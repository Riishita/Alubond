/* =====================================================
   ALUBOND — Main JS
   Apple-style scroll site: canvas frame scrub + white sections
   ===================================================== */

/* =================== CONSTANTS =================== */
const FRAME_COUNT = 241;
const FRAME_SPEED = 3.5;   // animation completes at p≈0.29 of 120vh ≈ 35vh scroll
const IMAGE_SCALE = 0.80;
const FRAME_PATH  = (n) => `/assets/frames/frame_${String(n).padStart(4,'0')}.webp`;

/* =================== DOM =================== */
const canvas          = document.getElementById('canvas');
const ctx             = canvas.getContext('2d');
const canvasWrap      = document.getElementById('canvas-wrap');
const loader          = document.getElementById('loader');
const loaderFill      = document.getElementById('loader-fill');
const loaderPct       = document.getElementById('loader-percent');
const heroEl          = document.querySelector('.hero');
const dissectionWrap  = document.getElementById('dissection-wrap');
const siteHeader      = document.getElementById('site-header');

/* =================== STATE =================== */
const frames     = new Array(FRAME_COUNT).fill(null);
let loadedCount  = 0;
let currentFrame = 0;
let bgColor      = 'white';
let rafPending   = false;

/* =================== CANVAS =================== */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);
  drawFrame(currentFrame);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function sampleBg(img) {
  try {
    const off = document.createElement('canvas');
    off.width = 4; off.height = 4;
    const c = off.getContext('2d');
    c.drawImage(img, 0, 0, 4, 4);
    const d = c.getImageData(0,0,1,1).data;
    bgColor = `rgb(${d[0]},${d[1]},${d[2]})`;
  } catch(_) {}
}

function drawFrame(index) {
  const img = frames[index];
  if (!img || !img.complete || !img.naturalWidth) return;
  const cw = window.innerWidth, ch = window.innerHeight;
  const iw = img.naturalWidth,  ih = img.naturalHeight;
  const scale = Math.max(cw/iw, ch/ih) * IMAGE_SCALE;
  const dw = iw * scale, dh = ih * scale;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw-dw)/2, (ch-dh)/2, dw, dh);
}

function scheduleFrame(index) {
  if (index === currentFrame) return;
  currentFrame = index;
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => { drawFrame(currentFrame); rafPending = false; });
  }
}

/* =================== PRELOAD =================== */
function loadFrame(index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      frames[index] = img;
      loadedCount++;
      const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
      loaderFill.style.width = pct + '%';
      loaderPct.textContent  = pct + '%';
      resolve(img);
    };
    img.onerror = () => { loadedCount++; resolve(null); };
    img.src = FRAME_PATH(index + 1);
  });
}

async function preloadFrames() {
  await Promise.all(Array.from({length:24}, (_,i) => loadFrame(i)));
  drawFrame(0);
  await Promise.all(Array.from({length:FRAME_COUNT-24}, (_,i) => loadFrame(i+24)));
  hideLoader();
}

function hideLoader() {
  gsap.to(loader, {
    opacity: 0, duration: 0.65, ease: 'power2.out',
    onComplete: () => { loader.style.display = 'none'; initHeroAnimation(); }
  });
}

/* =================== LENIS =================== */
function initLenis() {
  /* Smoother scroll: longer duration + gentle easing for premium feel */
  const lenis = new window.Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10*t)),
    smoothWheel: true,
    wheelMultiplier: 0.9   /* Slightly dampen wheel for elegance */
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* =================== HEADER MODE =================== */
function initHeader() {
  // Hero is full-bleed photo → start dark-mode (white text on dark hero)
  siteHeader.classList.add('dark-mode');

  // Globe section has white bg → switch to light-mode (black text)
  ScrollTrigger.create({
    trigger: '#global-presence',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
  });

  // Philosophy section has dark bg (navy) → switch to dark-mode (white text)
  ScrollTrigger.create({
    trigger: '#phil-sticky',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
  });

  // Dissection / composition is white bg canvas → switch to light-mode
  ScrollTrigger.create({
    trigger: '#dissection-wrap',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
  });

  // Brand bridge (navy bg) → switch to dark-mode
  ScrollTrigger.create({
    trigger: '#brand-bridge',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
  });

  // Fire section is white bg → switch to light-mode
  ScrollTrigger.create({
    trigger: '#fire-rating',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
  });

  // Re-enter dark on footer
  ScrollTrigger.create({
    trigger: '#footer',
    start: 'top 52px',
    onEnter:     () => { siteHeader.classList.replace('light-mode', 'dark-mode'); },
    onLeaveBack: () => { siteHeader.classList.replace('dark-mode', 'light-mode'); },
  });
}

/* =================== HERO ENTRANCE =================== */
function initHeroAnimation() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const words   = document.querySelectorAll('.hero-heading .word-inner');
  const sub     = document.querySelector('.hero-sub');
  const cta     = document.querySelector('.hero-cta');
  const stats   = document.querySelectorAll('.hero-stat');

  /* Staggered hero entrance — smooth cascading reveal */
  gsap.timeline({ delay: 0.15 })
    .fromTo(eyebrow, {y:16, opacity:0}, {y:0, opacity:1, duration:0.7, ease:'power3.out'})
    .fromTo(words,   {y:'110%', opacity:0}, {y:'0%', opacity:1, stagger:0.1, duration:0.9, ease:'power4.out'}, '-=0.3')
    .fromTo(sub,     {y:18, opacity:0}, {y:0, opacity:1, duration:0.7, ease:'power3.out'}, '-=0.45')
    .fromTo(cta,     {y:12, opacity:0}, {y:0, opacity:1, duration:0.6, ease:'power3.out'}, '-=0.4')
    .fromTo(stats,   {y:10, opacity:0}, {y:0, opacity:1, stagger:0.08, duration:0.55, ease:'power3.out'}, '-=0.35');
}

/* =================== HERO SLIDER =================== */
function initHeroSlider() {
  const slides    = Array.from(document.querySelectorAll('.hs-slide'));
  const dotsWrap  = document.getElementById('hs-dots');
  const counterEl = document.getElementById('hs-cur');
  const progFill  = document.getElementById('hs-prog');
  const sliderEl  = document.getElementById('hero-slider');

  if (!slides.length) return;

  const DURATION = 3000; // ms per slide
  let current    = 0;
  let timer      = null;
  let paused     = false;
  let progTween  = null;

  // Build dot indicators
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'hs-dot' + (i === 0 ? ' is-active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function getDots() {
    return Array.from(dotsWrap.querySelectorAll('.hs-dot'));
  }

  function updateCounter(index) {
    if (counterEl) counterEl.textContent = String(index + 1).padStart(2, '0');
  }

  function startProgress() {
    if (progTween) progTween.kill();
    gsap.set(progFill, { scaleX: 0 });
    progTween = gsap.to(progFill, {
      scaleX: 1,
      duration: DURATION / 1000,
      ease: 'none',
      transformOrigin: 'left center'
    });
  }

  function kenBurns(slide) {
    const img = slide.querySelector('img');
    if (!img) return;
    gsap.fromTo(img,
      { scale: 1.08 },
      { scale: 1, duration: DURATION / 1000, ease: 'power1.out' }
    );
  }

  function activateSlide(index) {
    const dots = getDots();
    const prev = slides[current];

    // Mark leaving
    prev.classList.remove('is-active');
    prev.classList.add('is-leaving');
    setTimeout(() => prev.classList.remove('is-leaving'), 800);

    current = index;
    const next = slides[current];
    next.classList.add('is-active');

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));

    updateCounter(current);
    startProgress();
    kenBurns(next);
  }

  function goTo(index) {
    if (index === current) return;
    activateSlide((index + slides.length) % slides.length);
    resetTimer();
  }

  function advance() {
    activateSlide((current + 1) % slides.length);
  }

  function resetTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(advance, DURATION);
  }

  // Pause on hover
  sliderEl.addEventListener('mouseenter', () => {
    paused = true;
    clearInterval(timer);
    if (progTween) progTween.pause();
  });
  sliderEl.addEventListener('mouseleave', () => {
    paused = false;
    if (progTween) progTween.play();
    resetTimer();
  });

  // Init first slide
  slides[0].classList.add('is-active');
  updateCounter(0);
  startProgress();
  kenBurns(slides[0]);
  timer = setInterval(advance, DURATION);
}

/* =================== DISSECTION =================== */
function initDissection() {
  canvasWrap.style.clipPath = 'none';
  canvasWrap.style.opacity  = '0';

  const layerLabels     = document.getElementById('layer-labels');
  const layerEls        = layerLabels ? [...layerLabels.querySelectorAll('.layer-label')] : [];

  // Info boxes — 5 boxes synced 1-to-1 with layer labels
  const infoBoxEls = [0,1,2,3,4].map(i => document.getElementById(`dsct-box-${i}`));

  // Layer thresholds — when each layer label appears on the right
  const layerThresholds = [0.06, 0.24, 0.42, 0.60, 0.78];

  // Info box ranges synced to layer thresholds: [fadeIn start, fadeIn end, fadeOut start, fadeOut end]
  const infoRanges = [
    [0.04, 0.10, 0.21, 0.26],   // box 0: Specialised Coating — synced with layer 1
    [0.22, 0.28, 0.39, 0.44],   // box 1: Top Metal Skin — synced with layer 2
    [0.40, 0.46, 0.57, 0.62],   // box 2: Fire Rated Core — synced with layer 3
    [0.58, 0.64, 0.75, 0.80],   // box 3: Bottom Metal Skin — synced with layer 4
    [0.76, 0.82, 0.93, 0.98],   // box 4: Base Treatment — synced with layer 5, fades out
  ];

  /* Canvas crossfade — smooth fade-in as user scrolls from philosophy into composition.
     Ends at 'top 40%' for a gentler, more gradual reveal (not abrupt). */
  ScrollTrigger.create({
    trigger: dissectionWrap,
    start: 'top bottom',
    end:   'top 40%',
    scrub: 0.6,
    onUpdate: (self) => {
      /* Ease-in curve for a soft reveal instead of linear pop */
      const p = self.progress;
      canvasWrap.style.opacity = p * p;  /* Quadratic ease-in */
    }
  });

  // Hide canvas + info boxes only once dissection zone has fully scrolled out (bottom at top of viewport)
  const infoBoxesWrap = document.getElementById('dsct-info-boxes');
  ScrollTrigger.create({
    trigger: dissectionWrap,
    start: 'bottom top',
    onEnter:     () => {
      canvasWrap.style.visibility = 'hidden';
      canvasWrap.style.willChange = 'auto';
      if (infoBoxesWrap) infoBoxesWrap.style.visibility = 'hidden';
      if (layerLabels) layerLabels.style.visibility = 'hidden';
    },
    onLeaveBack: () => {
      canvasWrap.style.visibility = 'visible';
      canvasWrap.style.willChange = 'transform, opacity';
      if (infoBoxesWrap) infoBoxesWrap.style.visibility = 'visible';
      if (layerLabels) layerLabels.style.visibility = 'visible';
    },
  });

  /* Main scrub — higher scrub value (0.6) for smoother, lag-free animation */
  ScrollTrigger.create({
    trigger: dissectionWrap,
    start: 'top top',
    end:   'bottom bottom',
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;

      // ── Frame scrub (0 → p≈0.40) ────────────────────────────
      const accelerated = Math.min(p * FRAME_SPEED, 1);
      scheduleFrame(Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1));

      // Layer labels: appear during animation, hide near end of scroll zone
      const labelsVisible = p < 0.98;
      if (layerLabels) layerLabels.style.opacity = labelsVisible ? 1 : 0;
      layerEls.forEach((el, i) => {
        el.classList.toggle('ll-visible', p >= layerThresholds[i] && labelsVisible);
      });

      // ── Info boxes: each slides up + fades in sync with its layer label ────────
      infoBoxEls.forEach((el, i) => {
        if (!el) return;
        const [e0, e1, x0, x1] = infoRanges[i];
        let opacity, ty = 30;

        if (p <= e0) {
          opacity = 0;
          ty = 30;
        } else if (p < e1) {
          const t = (p - e0) / (e1 - e0);
          opacity = t;
          ty = (1 - t) * 30;
        } else if (p < x0) {
          opacity = 1;
          ty = 0;
        } else if (x0 < x1 && p < x1) {
          const t = (p - x0) / (x1 - x0);
          opacity = 1 - t;
          ty = 0;
        } else if (x0 === x1) {
          opacity = 1;
          ty = 0;
        } else {
          opacity = 0;
        }

        el.style.opacity = opacity;
        el.style.transform = `translateY(${ty}px)`;
      });
    }
  });
}


/* =================== GLOBE — Global Presence =================== */
function initGlobe() {
  /* Globe entrance — gentler reveal with will-change cleanup */
  /* Globe section: no entrance animation, sits flush under hero */

  /* Legend groups staggered with longer duration for smoothness */
  gsap.fromTo(
    document.querySelectorAll('.globe-legend-group'),
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.globe-legend', start: 'top 88%' }
    }
  );

  // Location data
  var locationData = {
    uae:     { title: 'UAE',     type: 'Manufacturing', address: 'Alubond U.S.A\nDubai Investment Park\nP.O. Box 29353, Dubai\nUnited Arab Emirates' },
    india:   { title: 'India',   type: 'Manufacturing', address: 'Alubond India\nPlot No. 26, Sector 6\nIMT Manesar, Gurugram\nHaryana 122052, India' },
    europe:  { title: 'Europe',  type: 'Manufacturing', address: 'Alubond Europe\nIndustrial Zone\nEurope' },
    usa:     { title: 'USA',     type: 'Office',        address: 'Alubond U.S.A Inc.\n5 Columbus Circle, Suite 801\nNew York, NY 10019\nUnited States' },
    canada:  { title: 'Canada',  type: 'Office',        address: 'Alubond Canada\nToronto, Ontario\nCanada' },
    egypt:   { title: 'Egypt',   type: 'Office',        address: 'Alubond Egypt\nCairo, Egypt' },
    turkey:  { title: 'Turkey',  type: 'Office',        address: 'Alubond Turkey\nIstanbul, Turkey' },
    vietnam: { title: 'Vietnam', type: 'Office',        address: 'Alubond Vietnam\nHo Chi Minh City\nVietnam' }
  };

  var infoBox   = document.getElementById('globe-info-box');
  var infoTitle = document.getElementById('globe-info-title');
  var infoType  = document.getElementById('globe-info-type');
  var infoAddr  = document.getElementById('globe-info-address');
  var closeBtn  = document.getElementById('globe-info-close');
  var allItems  = document.querySelectorAll('.globe-legend-list li[data-location]');

  allItems.forEach(function(li) {
    li.addEventListener('click', function() {
      var key = li.getAttribute('data-location');
      var loc = locationData[key];
      if (!loc) return;

      // Toggle off if same pill clicked again
      if (infoBox.classList.contains('visible') && infoTitle.textContent === loc.title) {
        infoBox.classList.remove('visible');
        li.classList.remove('active');
        return;
      }

      // Remove active from all pills
      allItems.forEach(function(el) { el.classList.remove('active'); });
      li.classList.add('active');

      // Populate and show
      infoTitle.textContent = loc.title;
      infoType.textContent  = loc.type;
      infoAddr.textContent  = loc.address;
      infoBox.classList.add('visible');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      infoBox.classList.remove('visible');
      allItems.forEach(function(el) { el.classList.remove('active'); });
    });
  }

  // ── Mini Clocks ──
  var clockEls = document.querySelectorAll('.mini-clock');
  clockEls.forEach(function(el) {
    var tz = el.getAttribute('data-tz');
    var label = el.getAttribute('data-label');

    // Build clock DOM
    var face = document.createElement('div');
    face.className = 'mini-clock-face';

    // 12 hour markers
    for (var m = 0; m < 12; m++) {
      var dot = document.createElement('div');
      dot.className = 'mini-clock-marker' + (m % 3 === 0 ? ' major' : '');
      var rad = (m * 30 - 90) * Math.PI / 180;
      dot.style.left = (50 + 40 * Math.cos(rad)) + '%';
      dot.style.top = (50 + 40 * Math.sin(rad)) + '%';
      face.appendChild(dot);
    }

    // Hands
    var hHand = document.createElement('div');
    hHand.className = 'mini-clock-hand mini-clock-hand--hour';
    var mHand = document.createElement('div');
    mHand.className = 'mini-clock-hand mini-clock-hand--minute';
    var sHand = document.createElement('div');
    sHand.className = 'mini-clock-hand mini-clock-hand--second';
    var center = document.createElement('div');
    center.className = 'mini-clock-center';

    face.appendChild(hHand);
    face.appendChild(mHand);
    face.appendChild(sHand);
    face.appendChild(center);
    el.appendChild(face);

    // Label
    var lbl = document.createElement('div');
    lbl.className = 'mini-clock-label';
    lbl.textContent = label;
    el.appendChild(lbl);

    // Store refs for update
    el._hands = { h: hHand, m: mHand, s: sHand, face: face, lbl: lbl, tz: tz };
  });

  function updateClocks() {
    var now = new Date();
    clockEls.forEach(function(el) {
      var ref = el._hands;
      if (!ref) return;
      var parts = now.toLocaleString('en-US', { timeZone: ref.tz, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).split(':');
      var h24 = parseInt(parts[0]);
      var h = h24 % 12;
      var min = parseInt(parts[1]);
      var sec = parseInt(parts[2]);
      var hDeg = (h + min / 60) * 30;
      var mDeg = (min + sec / 60) * 6;
      var sDeg = sec * 6;
      ref.h.style.transform = 'translateX(-50%) rotate(' + hDeg + 'deg)';
      ref.m.style.transform = 'translateX(-50%) rotate(' + mDeg + 'deg)';
      ref.s.style.transform = 'translateX(-50%) rotate(' + sDeg + 'deg)';
    });
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* =================== PHILOSOPHY ENTRANCE =================== */
function initPhilosophy() {
  const philInner = document.querySelector('.phil-inner');
  if (!philInner) return;

  const philEls = philInner.querySelectorAll('.phil-header, .phil-quote-block, .phil-divider, .phil-body');
  philEls.forEach(el => { el.style.willChange = 'transform, opacity'; });

  /* Staggered entrance — slightly longer durations for premium pacing */
  gsap.fromTo(philEls,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '#phil-sticky', start: 'top 55%' },
      onComplete: () => { philEls.forEach(el => { el.style.willChange = 'auto'; }); }
    }
  );
}

/* =================== BRAND BRIDGE =================== */
function initBrandBridge() {
  const stats = document.querySelector('.bridge-stats');
  const headline = document.querySelector('.bridge-headline');
  const sub = document.querySelector('.bridge-sub');
  if (!stats) return;

  // Counter animation
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.round(ease * target).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* Brand bridge reveal — trigger slightly earlier for smooth entrance */
  ScrollTrigger.create({
    trigger: '.brand-bridge',
    start: 'top 65%',
    once: true,
    onEnter: () => {
      stats.classList.add('bs-visible');
      if (headline) headline.classList.add('bh-visible');
      if (sub) sub.classList.add('bsub-visible');

      /* Clean up will-change after animations settle */
      setTimeout(() => {
        stats.style.willChange = 'auto';
        if (headline) headline.style.willChange = 'auto';
        if (sub) sub.style.willChange = 'auto';
      }, 1200);

      // Animate each counter
      document.querySelectorAll('.bridge-stat').forEach(stat => {
        const target = parseInt(stat.dataset.target, 10);
        const numEl = stat.querySelector('.bridge-stat-num');
        if (numEl && target) animateCounter(numEl, target, 1800);
      });
    }
  });
}


/* =================== FIRE RATING SECTION =================== */
function initFireSection() {
  const col1 = document.querySelectorAll('.fire-vid-text > *');
  const badges = document.querySelectorAll('.fire-badge');

  /* Fire section text — smooth stagger */
  gsap.fromTo(col1,
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.fire-section', start: 'top 82%' }
    }
  );
  /* Badges — slightly delayed stagger for cascading feel */
  gsap.to(badges, {
    y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.fire-badge-grid', start: 'top 85%' }
  });
}

/* =================== FINISHES (video + swatches) =================== */
function initFinishes() {
  const vidWood  = document.getElementById('vid-wood');

  const catDescs = {
    wood:          'Wood-grain ACP finishes — natural warmth and depth for façades and interiors.',
    metalic:       'Metallic series from the Alubond catalog — high-shine and brushed metal character.',
    'stone-marbles': 'Stone and marble-look panels — veined, polished, and architectural stone effects.',
    patina:        'Patina and aged-metal character — verdigris, bronze, and weathered tonal depth.',
    concrete:      'Concrete-look finishes — industrial texture and tonal concrete for modern envelopes.',
    texture:       'Texture series — tactile surface interest for feature walls and cladding.',
    brush:         'Brush-finished metals — directional grain and refined metallic movement.',
    anodise:       'Anodised-look finishes — even, durable colour with a premium metal edge.',
    najdi:         'Najdi series — regional palette and pattern options from the panel library.',
    prismatic:     'Prismatic and iridescent effects — colour shift and landmark façade presence.',
    sparkle:       'Sparkle finishes — subtle reflectivity and luminous surface highlights.'
  };

  const swatchGroups = document.querySelectorAll('.swatch-group');
  const nameEl       = document.getElementById('swatch-name');
  const descEl       = document.getElementById('finishes-cat-desc');

  function revealSwatches(cat) {
    const sw = document.querySelectorAll(`.swatch-group[data-category="${cat}"] .swatch`);
    gsap.fromTo(sw,
      { scale: 0.92, y: 8 },
      { scale: 1, y: 0, stagger: 0.045, duration: 0.45, ease: 'power3.out' }
    );
  }

  // Reveal on scroll enter
  ScrollTrigger.create({
    trigger: '.finishes-swatches-zone',
    start: 'top 92%',
    once: true,
    onEnter: () => revealSwatches('wood')
  });

  // Tab / video switching
  document.querySelectorAll('.fvtab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      const vid = tab.dataset.vid;

      // Tab UI
      document.querySelectorAll('.fvtab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch video
      vidWood.classList.remove('active');
      if (vid === 'vid-wood') {
        vidWood.classList.add('active');
        if (vidWood.paused) vidWood.play();
      }

      // Switch swatch group
      swatchGroups.forEach(g => { g.classList.remove('active'); g.style.display = 'none'; });
      const tgt = document.querySelector(`.swatch-group[data-category="${cat}"]`);
      if (tgt) { tgt.classList.add('active'); tgt.style.display = 'flex'; }

      // Update desc
      descEl.textContent = catDescs[cat] || '';
      nameEl.textContent = '\u00a0';
      revealSwatches(cat);
    });
  });

  // Swatch hover
  document.querySelectorAll('.swatch').forEach((sw) => {
    sw.addEventListener('mouseenter', () => { nameEl.textContent = sw.dataset.name || ''; });
    sw.addEventListener('mouseleave', () => { nameEl.textContent = '\u00a0'; });
  });

  // Animate finishes-vid-text on scroll
  const vidText = document.querySelectorAll('.finishes-vid-eyebrow, .finishes-vid-heading, .finishes-vid-tabs');
  gsap.fromTo(vidText,
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.finishes-video-zone', start: 'top 88%' }
    }
  );
}

/* =================== APPLICATIONS =================== */
function initApplications() {
  const header  = document.querySelectorAll('.applications-header > *');
  const cards   = document.querySelectorAll('.app-card');
  const outer   = document.getElementById('app-track-outer');
  const progBar = document.getElementById('app-progress-bar');

  gsap.fromTo(header,
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.applications-section', start: 'top 90%' }
    }
  );

  gsap.to(cards, {
    y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: 'power3.out',
    scrollTrigger: { trigger: '.app-track-outer', start: 'top 92%' }
  });

  // Drag scroll
  let isDragging = false, startX = 0, scrollLeft = 0;

  outer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - outer.offsetLeft;
    scrollLeft = outer.scrollLeft;
    outer.style.userSelect = 'none';
  });
  window.addEventListener('mouseup', () => { isDragging = false; outer.style.userSelect = ''; });
  outer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    outer.scrollLeft = scrollLeft - (e.pageX - outer.offsetLeft - startX) * 1.5;
    updateProg();
  });
  outer.addEventListener('scroll', updateProg);

  function updateProg() {
    const max = outer.scrollWidth - outer.clientWidth;
    if (max > 0) progBar.style.width = (outer.scrollLeft / max * 100) + '%';
  }
}

/* =================== GALLERY (Sticky Scroll) =================== */
function initGallery() {
  /* Fade-in the intro text */
  gsap.fromTo(
    document.querySelectorAll('.gallery-intro-content > *'),
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-section', start: 'top 85%' }
    }
  );
  /* Fade-in each gallery figure */
  document.querySelectorAll('.sg-fig').forEach((fig, i) => {
    gsap.fromTo(fig,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: (i % 5) * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: fig, start: 'top 95%' }
      }
    );
  });
}

/* =================== FOOTER =================== */
function initFooter() {
  gsap.fromTo(
    document.querySelectorAll('.footer-eyebrow, .footer-heading, .footer-sub, .footer-btn'),
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.08, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: '.footer-cta', start: 'top 88%' }
    }
  );

  // Downloads toggle
  var dlToggle = document.getElementById('downloads-toggle');
  var dlPanel = document.getElementById('downloads-panel');
  if (dlToggle && dlPanel) {
    dlToggle.addEventListener('click', function(e) {
      e.preventDefault();
      dlPanel.classList.toggle('open');
    });
  }

  // Set folder colors from data attribute
  document.querySelectorAll('.dl-folder').forEach(function(folder) {
    var color = folder.getAttribute('data-color');
    if (color) folder.style.setProperty('--folder-color', color);
  });
}

/* =================== INIT =================== */
function init() {
  gsap.registerPlugin(ScrollTrigger);
  initLenis();
  initHeader();
  initHeroSlider();
  initDissection();
  initGlobe();
  initPhilosophy();
  initBrandBridge();
  initFireSection();
  initFinishes();
  initApplications();
  initGallery();
  initFooter();
  preloadFrames();
}

window.addEventListener('DOMContentLoaded', init);
