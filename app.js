/* ════════════════════════════════════════════════
   POLARIS v3.0 — APP ENGINE
   Features: Liquid BG · 3D Cover · Spring Physics
             Grain · Particles · Reactive Blur
════════════════════════════════════════════════ */
'use strict';

/* ── STATE ── */
const S = {
  emotion:   null,
  genre:     null,
  song:      null,
  particles: [],
  raf:       null,
  tilt:      { x: 0, y: 0, tx: 0, ty: 0 }, // spring state
  touching:  false
};

/* ── DOM ── */
const $  = id  => document.getElementById(id);
const qs = sel => document.querySelector(sel);
const qa = sel => document.querySelectorAll(sel);

/* Screens map */
const Screen = {
  home:    $('screen-home'),
  emotion: $('screen-emotion'),
  song:    $('screen-song')
};

/* ════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 10000);
  buildGrain();
  buildParticles();
  buildGrid();
  bindEvents();
  runSpringLoop();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

/* ════════════════════════════════════════════════
   CLOCK
════════════════════════════════════════════════ */
function updateClock() {
  const el = $('status-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/* ════════════════════════════════════════════════
   GRAIN CANVAS
════════════════════════════════════════════════ */
function buildGrain() {
  const canvas = $('grain-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 256, H = 256;
  canvas.width = W; canvas.height = H;
  const img = ctx.createImageData(W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i+1] = img.data[i+2] = v;
    img.data[i+3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

/* ════════════════════════════════════════════════
   PARTICLE SYSTEM
════════════════════════════════════════════════ */
function buildParticles() {
  const canvas = $('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Spawn 50 particles */
  for (let i = 0; i < 50; i++) {
    S.particles.push({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      r:  Math.random() * 1.6 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a:  Math.random() * 0.4 + 0.06,
      color: 'rgba(255,255,255,0.6)'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    S.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.a;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

function setParticleColor(palette) {
  S.particles.forEach((p, i) => {
    p.color = palette[i % palette.length];
  });
}

/* ════════════════════════════════════════════════
   SCREEN TRANSITIONS
════════════════════════════════════════════════ */
function show(name) {
  Object.values(Screen).forEach(s => s.classList.remove('active'));
  requestAnimationFrame(() => requestAnimationFrame(() => {
    Screen[name].classList.add('active');
    Screen[name].scrollTop = 0;
  }));
}

/* ════════════════════════════════════════════════
   BACKGROUND SYSTEM
════════════════════════════════════════════════ */
function setBg(colors, intensity = 1.0) {
  const grad = $('bg-gradient');
  const oa = $('orb-a'), ob = $('orb-b'), oc = $('orb-c'), od = $('orb-d');

  if (!colors) {
    grad.style.background = '#050508';
    [oa,ob,oc,od].forEach(o => { o.style.opacity = '0'; });
    setParticleColor(['rgba(255,255,255,0.4)']);
    return;
  }

  grad.style.background = colors.bg;
  oa.style.background   = colors.orb1; oa.style.opacity = String(0.65 * intensity);
  ob.style.background   = colors.orb2; ob.style.opacity = String(0.5  * intensity);
  oc.style.background   = colors.orb3; oc.style.opacity = String(0.35 * intensity);
  od.style.background   = colors.orb1; od.style.opacity = String(0.25 * intensity);

  setParticleColor([colors.orb1, colors.orb2, colors.orb3]);
}

/* ════════════════════════════════════════════════
   HOME GRID
════════════════════════════════════════════════ */
function buildGrid() {
  const grid = $('emotions-grid');
  grid.innerHTML = '';

  POLARIS_DATA.emotions.forEach((em, idx) => {
    const genres   = POLARIS_DATA.genres[em.id] || [];
    const songCnt  = genres.reduce((n, g) => n + g.songs.length, 0);

    const card = document.createElement('div');
    card.className = 'em-card' + (idx === 0 ? ' wide' : '');

    /* Glow */
    const glow = document.createElement('div');
    glow.className = 'em-glow';
    glow.style.background =
      `radial-gradient(ellipse at 30% 30%, ${em.colors.orb1}55, ${em.colors.orb2}30, transparent 70%)`;

    /* Number */
    const num = document.createElement('div');
    num.className = 'em-number';
    num.textContent = String(idx + 1).padStart(2,'0');

    /* Emoji */
    const emoji = document.createElement('div');
    emoji.className = 'em-emoji';
    emoji.textContent = em.emoji;

    /* Body */
    const body = document.createElement('div');
    body.className = 'em-body';
    body.innerHTML = `
      <div class="em-title">${em.title}</div>
      <div class="em-meta">${genres.length} genres · ${songCnt} songs</div>
    `;

    if (idx === 0) {
      card.append(glow, emoji, body);
    } else {
      card.append(glow, num, emoji, body);
    }

    /* Hover preview */
    card.addEventListener('mouseenter', () => setBg(em.colors, 0.45));
    card.addEventListener('mouseleave', () => { if (!S.emotion) setBg(null); });

    /* Tap / click */
    card.addEventListener('click', () => openEmotion(em));

    /* Touch press feedback */
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.94)';
    }, { passive: true });
    card.addEventListener('touchend', () => {
      card.style.transform = '';
      if (!S.touching) openEmotion(em);
    }, { passive: true });

    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════════════
   OPEN EMOTION
════════════════════════════════════════════════ */
function openEmotion(em) {
  S.emotion = em;
  setBg(em.colors, 1);

  $('hero-emoji').textContent   = em.emoji;
  $('hero-title').textContent   = em.title;
  $('hero-desc').textContent    = em.desc;
  $('nav-emotion-title').textContent = em.title;

  /* Stats chips */
  const genres  = POLARIS_DATA.genres[em.id] || [];
  const songs   = genres.reduce((n,g) => n + g.songs.length, 0);
  $('hero-chips').innerHTML = `
    <span class="h-chip">🎵 ${songs} songs</span>
    <span class="h-chip">📂 ${genres.length} genres</span>
  `;

  buildGenreTabs(genres);
  if (genres[0]) loadGenre(genres[0]);

  show('emotion');
}

/* ════════════════════════════════════════════════
   GENRE TABS
════════════════════════════════════════════════ */
function buildGenreTabs(genres) {
  const strip = $('genre-strip');
  strip.innerHTML = '';

  genres.forEach((g, i) => {
    const btn = document.createElement('button');
    btn.className = 'g-tab' + (i === 0 ? ' active' : '');
    btn.textContent = g.name;
    btn.addEventListener('click', () => {
      qa('.g-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      loadGenre(g);
    });
    strip.appendChild(btn);
  });
}

/* ════════════════════════════════════════════════
   LOAD GENRE
════════════════════════════════════════════════ */
function loadGenre(genre) {
  S.genre = genre;
  const list = $('tracks-list');
  list.innerHTML = '';
  $('tracks-count').textContent = `${genre.songs.length} tracks`;

  genre.songs.forEach((song, i) => {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.innerHTML = `
      <span class="t-num">${String(i+1).padStart(2,'0')}</span>
      <img class="t-thumb" src="${song.cover}" alt="${song.title}" loading="lazy"
           onerror="this.style.background='rgba(255,255,255,0.08)';this.src=''"/>
      <div class="t-text">
        <div class="t-title">${song.title}</div>
        <div class="t-artist">${song.artist}</div>
      </div>
      <svg class="t-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9,18 15,12 9,6"/>
      </svg>
    `;

    row.addEventListener('click', () => openSong(song));

    /* Stagger entrance */
    row.style.opacity = '0';
    row.style.transform = 'translateY(12px)';
    list.appendChild(row);
    setTimeout(() => {
      row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, i * 48);
  });
}

/* ════════════════════════════════════════════════
   OPEN SONG
════════════════════════════════════════════════ */
function openSong(song) {
  S.song = song;
  const em = S.emotion;
  const c  = em?.colors;

  /* Reactive blur backdrop */
  const blurBg = $('cover-blur-bg');
  blurBg.style.backgroundImage = `url('${song.cover}')`;
  blurBg.classList.add('visible');

  /* Cover image with fade */
  const img = $('cover-img');
  img.style.opacity = '0';
  img.onload = () => { img.style.opacity = '1'; };
  img.src = '';
  setTimeout(() => { img.src = song.cover; img.alt = song.title; }, 30);

  /* Aura color */
  if (c) {
    $('cover-aura').style.background =
      `radial-gradient(ellipse, ${c.orb1}70 0%, ${c.orb2}40 50%, transparent 80%)`;
  }

  /* Pill */
  $('pill-thumb').src   = song.cover;
  $('pill-title').textContent  = song.title;
  $('pill-artist').textContent = song.artist;

  /* Meta */
  $('song-genre-pill').textContent  = S.genre?.name ?? '';
  $('song-name').textContent        = song.title;
  $('song-by').textContent          = song.artist;

  /* Story */
  $('story-en').textContent = song.storyEn;
  $('story-ar').textContent = song.storyAr;

  /* Reset language to EN */
  qa('.lang-opt').forEach(b => b.classList.remove('active'));
  qs('.lang-opt[data-lang="en"]').classList.add('active');
  $('story-en').classList.remove('hidden');
  $('story-ar').classList.add('hidden');
  positionLangIndicator('en');

  /* Spotify */
  $('spotify-cta').href = song.spotify;

  /* Reset tilt */
  S.tilt.x = S.tilt.y = S.tilt.tx = S.tilt.ty = 0;
  applyTilt(0, 0);

  show('song');
}

/* ════════════════════════════════════════════════
   SPRING TILT LOOP (3D Cover)
════════════════════════════════════════════════ */
function runSpringLoop() {
  const STIFFNESS = 0.08;
  const DAMPING   = 0.75;

  function tick() {
    /* Spring interpolation */
    S.tilt.x += (S.tilt.tx - S.tilt.x) * STIFFNESS;
    S.tilt.y += (S.tilt.ty - S.tilt.y) * STIFFNESS;

    if (Screen.song.classList.contains('active')) {
      applyTilt(S.tilt.x, S.tilt.y);
    }

    requestAnimationFrame(tick);
  }
  tick();
}

function setTiltTarget(rx, ry) {
  S.tilt.tx = rx;
  S.tilt.ty = ry;
}

function applyTilt(rx, ry) {
  const card = $('cover-card');
  if (!card) return;
  card.style.transform =
    `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${1 + Math.abs(rx+ry)*0.002})`;

  /* Shift gloss based on tilt */
  const gloss = card.querySelector('.cover-gloss');
  if (gloss) {
    const gx = 50 - ry * 2;
    const gy = 50 - rx * 2;
    gloss.style.background = `
      radial-gradient(circle at ${gx}% ${gy}%,
        rgba(255,255,255,0.25) 0%,
        rgba(255,255,255,0.06) 40%,
        transparent 70%
      )
    `;
  }
}

/* ════════════════════════════════════════════════
   LANGUAGE INDICATOR
════════════════════════════════════════════════ */
function positionLangIndicator(lang) {
  const ind  = $('lang-indicator');
  const btn  = qs(`.lang-opt[data-lang="${lang}"]`);
  if (!ind || !btn) return;
  const parent = btn.closest('.lang-switch');
  const pr = parent.getBoundingClientRect();
  const br = btn.getBoundingClientRect();
  ind.style.left   = (br.left - pr.left - 3) + 'px';
  ind.style.width  = (br.width + 6) + 'px';
  ind.style.top    = '3px';
  ind.style.bottom = '3px';
}

/* ════════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════ */
let toastTimer;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ════════════════════════════════════════════════
   EVENTS
════════════════════════════════════════════════ */
function bindEvents() {

  /* ── Back: emotion → home ── */
  $('back-emotion').addEventListener('click', () => {
    S.emotion = null;
    setBg(null);
    $('cover-blur-bg').classList.remove('visible');
    show('home');
  });

  /* ── Back: song → emotion ── */
  $('back-song').addEventListener('click', () => {
    $('cover-blur-bg').classList.remove('visible');
    setTiltTarget(0, 0);
    show('emotion');
  });

  /* ── Shuffle ── */
  $('shuffle-btn').addEventListener('click', () => {
    if (!S.genre?.songs?.length) return;
    const songs = S.genre.songs;
    const pick  = songs[Math.floor(Math.random() * songs.length)];
    openSong(pick);
    toast('🔀 Shuffling…');
    const btn = $('shuffle-btn');
    btn.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    btn.style.transform  = 'scale(0.93) rotate(6deg)';
    setTimeout(() => { btn.style.transform = ''; }, 350);
  });

  /* ── Language switch ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-opt');
    if (!btn) return;
    const lang = btn.dataset.lang;
    qa('.lang-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    positionLangIndicator(lang);
    if (lang === 'en') {
      $('story-en').classList.remove('hidden');
      $('story-ar').classList.add('hidden');
    } else {
      $('story-ar').classList.remove('hidden');
      $('story-en').classList.add('hidden');
    }
  });

  /* ── Logo click ── */
  $('logo-lockup').addEventListener('click', () => {
    const mark = $('logo-mark');
    mark.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
    mark.style.transform  = 'rotate(360deg) scale(1.3)';
    setTimeout(() => {
      mark.style.transition = 'transform 0.4s ease';
      mark.style.transform  = '';
    }, 700);
  });

  /* ── Mouse tilt on song screen ── */
  document.addEventListener('mousemove', e => {
    if (!Screen.song.classList.contains('active')) return;
    const wrapper = $('cover-3d');
    if (!wrapper) return;
    const r  = wrapper.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    setTiltTarget(-dy * 12, dx * 12);
  });

  /* Reset tilt when leaving cover area */
  document.addEventListener('mouseleave', () => setTiltTarget(0, 0));

  /* ── Device orientation (iPhone gyro) ── */
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (!Screen.song.classList.contains('active')) return;
      const rx = Math.max(-12, Math.min(12, (e.beta  ?? 0) / 7));
      const ry = Math.max(-12, Math.min(12, (e.gamma ?? 0) / 5));
      setTiltTarget(-rx, ry);
    }, { passive: true });
  }

  /* ── Touch tilt (drag on cover) ── */
  const coverHero = $('song-cover-hero');
  if (coverHero) {
    let startX = 0, startY = 0;
    coverHero.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    coverHero.addEventListener('touchmove', e => {
      const dx = (e.touches[0].clientX - startX) / 15;
      const dy = (e.touches[0].clientY - startY) / 15;
      setTiltTarget(
        Math.max(-10, Math.min(10, -dy)),
        Math.max(-10, Math.min(10,  dx))
      );
    }, { passive: true });
    coverHero.addEventListener('touchend', () => setTiltTarget(0, 0), { passive: true });
  }

  /* ── Swipe-back gesture ── */
  let swipeStartX = 0;
  document.addEventListener('touchstart', e => {
    swipeStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - swipeStartX;
    if (dx > 72) {
      const active = qs('.screen.active');
      if (active === Screen.emotion) $('back-emotion').click();
      if (active === Screen.song)    $('back-song').click();
    }
  }, { passive: true });

  /* ── Keyboard (desktop) ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Backspace') {
      const active = qs('.screen.active');
      if (active === Screen.song)    $('back-song').click();
      else if (active === Screen.emotion) $('back-emotion').click();
    }
  });

  /* ── Position lang indicator on load ── */
  setTimeout(() => positionLangIndicator('en'), 100);
  window.addEventListener('resize', () => {
    const active = qs('.lang-opt.active');
    if (active) positionLangIndicator(active.dataset.lang);
  });
}