// ════════════════════════════════════════════════
//   POLARIS v2.0 — APPLICATION LOGIC
// ════════════════════════════════════════════════

'use strict';

/* ══════════════════════════════════════════════
   STATE
══════════════════════════════════════════════ */
const App = {
  emotion: null,
  genre:   null,
  song:    null,
  particles: [],
  raf: null
};

/* ══════════════════════════════════════════════
   DOM HELPERS
══════════════════════════════════════════════ */
const get  = id  => document.getElementById(id);
const qs   = sel => document.querySelector(sel);
const qsa  = sel => document.querySelectorAll(sel);

const Screens = {
  home:    get('screen-home'),
  emotion: get('screen-emotion'),
  song:    get('screen-song')
};

/* ══════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  initParticles();
  bindEvents();
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});

/* ══════════════════════════════════════════════
   SCREEN NAVIGATION
══════════════════════════════════════════════ */
function showScreen(name) {
  Object.values(Screens).forEach(s => {
    s.classList.remove('active');
  });
  // Small tick so CSS transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      Screens[name].classList.add('active');
      Screens[name].scrollTop = 0;
    });
  });
}

/* ══════════════════════════════════════════════
   HOME — BUILD EMOTIONS GRID
══════════════════════════════════════════════ */
function buildGrid() {
  const grid = get('emotions-grid');
  grid.innerHTML = '';

  POLARIS_DATA.emotions.forEach((em, idx) => {
    const genres = POLARIS_DATA.genres[em.id] || [];
    const songCount = genres.reduce((n, g) => n + g.songs.length, 0);

    const card = document.createElement('div');
    card.className = 'emotion-card' + (idx === 0 ? ' card-wide' : '');
    card.dataset.id = em.id;

    // Inner glow (colored)
    const glow = document.createElement('div');
    glow.className = 'card-inner-glow';
    glow.style.background =
      `radial-gradient(ellipse at 30% 30%, ${em.colors.orb1}, ${em.colors.orb2}, transparent 70%)`;

    // Number
    const num = document.createElement('div');
    num.className = 'card-number';
    num.textContent = String(idx + 1).padStart(2, '0');

    // Emoji
    const emoji = document.createElement('div');
    emoji.className = 'card-emoji';
    emoji.textContent = em.emoji;

    // Info
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `
      <div class="card-title">${em.title}</div>
      <div class="card-meta">${genres.length} genres · ${songCount} tracks</div>
    `;

    if (idx === 0) {
      // Wide layout
      card.append(glow, emoji, info);
    } else {
      card.append(glow, num, emoji, info);
    }

    // Hover preview
    card.addEventListener('mouseenter', () => setBg(em.colors, 0.5));
    card.addEventListener('mouseleave', () => {
      if (!App.emotion) setBg(null);
    });

    // Click
    card.addEventListener('click', () => openEmotion(em));

    // Touch press effect
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.95)';
    }, { passive: true });
    card.addEventListener('touchend', () => {
      card.style.transform = '';
    }, { passive: true });

    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════
   OPEN EMOTION SCREEN
══════════════════════════════════════════════ */
function openEmotion(em) {
  App.emotion = em;

  // Background
  setBg(em.colors, 1);

  // Header
  get('emotion-emoji-big').textContent = em.emoji;
  get('emotion-name').textContent      = em.title;
  get('emotion-desc').textContent      = em.desc;
  get('emotion-top-title').textContent = em.title;

  // Stats
  const genres = POLARIS_DATA.genres[em.id] || [];
  const songs  = genres.reduce((n, g) => n + g.songs.length, 0);
  get('emotion-stats').innerHTML = `
    <span class="stat-chip">🎵 ${songs} songs</span>
    <span class="stat-chip">📂 ${genres.length} genres</span>
  `;

  // Tabs
  buildTabs(genres);

  // Load first genre
  if (genres[0]) loadGenre(genres[0]);

  showScreen('emotion');
}

/* ══════════════════════════════════════════════
   BUILD GENRE TABS
══════════════════════════════════════════════ */
function buildTabs(genres) {
  const container = get('genre-tabs');
  container.innerHTML = '';

  genres.forEach((g, i) => {
    const btn = document.createElement('button');
    btn.className = 'genre-tab' + (i === 0 ? ' active' : '');
    btn.textContent = g.name;
    btn.addEventListener('click', () => {
      qsa('.genre-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      loadGenre(g);
    });
    container.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════
   LOAD GENRE SONGS
══════════════════════════════════════════════ */
function loadGenre(genre) {
  App.genre = genre;
  const list = get('songs-list');
  list.innerHTML = '';

  genre.songs.forEach((song, i) => {
    const row = document.createElement('div');
    row.className = 'song-row';
    row.innerHTML = `
      <span class="song-num">${String(i + 1).padStart(2, '0')}</span>
      <img
        class="song-thumb"
        src="${song.cover}"
        alt="${song.title}"
        loading="lazy"
        onerror="this.src=''; this.style.background='rgba(255,255,255,0.08)'"
      />
      <div class="song-text">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <svg class="song-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9,18 15,12 9,6"/>
      </svg>
    `;

    row.addEventListener('click', () => openSong(song));

    // Stagger entrance
    row.style.opacity = '0';
    row.style.transform = 'translateY(14px)';
    list.appendChild(row);

    setTimeout(() => {
      row.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, i * 55);
  });
}

/* ══════════════════════════════════════════════
   OPEN SONG SCREEN
══════════════════════════════════════════════ */
function openSong(song) {
  App.song = song;

  const em = App.emotion;
  const c  = em?.colors;

  // Cover
  const img = get('song-cover-img');
  img.src = '';
  // Fade in image
  img.onload = () => { img.style.opacity = '1'; };
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.4s ease';
  img.src = song.cover;
  img.alt = song.title;

  // Cover shadow matches emotion color
  if (c) {
    get('cover-shadow').style.background =
      `radial-gradient(ellipse, ${c.orb1}80, ${c.orb2}50, transparent 70%)`;
  }

  // Meta
  get('genre-badge').textContent       = App.genre?.name ?? '';
  get('song-title-display').textContent = song.title;
  get('song-artist-display').textContent = song.artist;

  // Story
  get('story-en').textContent = song.storyEn;
  get('story-ar').textContent = song.storyAr;

  // Reset to EN
  qsa('.lang-btn').forEach(b => b.classList.remove('active'));
  qs('.lang-btn[data-lang="en"]').classList.add('active');
  get('story-en').classList.remove('hidden');
  get('story-ar').classList.add('hidden');

  // Spotify
  get('spotify-link').href = song.spotify;

  showScreen('song');
}

/* ══════════════════════════════════════════════
   BACKGROUND SYSTEM
══════════════════════════════════════════════ */
function setBg(colors, intensity = 1) {
  const bg = get('bg-layer');
  const o1 = get('orb1');
  const o2 = get('orb2');
  const o3 = get('orb3');

  if (!colors) {
    bg.style.background = '#050508';
    [o1, o2, o3].forEach(o => { o.style.opacity = '0'; });
    updateParticleColors(['#6366f1', '#8b5cf6', '#3b82f6']);
    return;
  }

  bg.style.background = colors.bg;

  o1.style.background = colors.orb1;
  o2.style.background = colors.orb2;
  o3.style.background = colors.orb3;
  o1.style.opacity = String(0.7 * intensity);
  o2.style.opacity = String(0.5 * intensity);
  o3.style.opacity = String(0.3 * intensity);

  updateParticleColors([colors.orb1, colors.orb2, colors.orb3]);
}

/* ══════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════ */
function initParticles() {
  const canvas = get('particles-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Spawn
  for (let i = 0; i < 55; i++) {
    App.particles.push({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.8 + 0.4,
      dx:    (Math.random() - 0.5) * 0.35,
      dy:    (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.08,
      color: 'rgba(255,255,255,0.5)'
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    App.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0)             p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0)             p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    App.raf = requestAnimationFrame(tick);
  }

  tick();
}

function updateParticleColors(palette) {
  App.particles.forEach((p, i) => {
    p.color = palette[i % palette.length];
  });
}

/* ══════════════════════════════════════════════
   EVENTS
══════════════════════════════════════════════ */
function bindEvents() {

  /* ── Back buttons ── */
  get('back-from-emotion').addEventListener('click', () => {
    App.emotion = null;
    setBg(null);
    showScreen('home');
  });

  get('back-from-song').addEventListener('click', () => {
    showScreen('emotion');
  });

  /* ── Shuffle ── */
  get('shuffle-btn').addEventListener('click', () => {
    if (!App.genre) return;
    const songs = App.genre.songs;
    const pick  = songs[Math.floor(Math.random() * songs.length)];
    openSong(pick);

    // Button spin animation
    const btn = get('shuffle-btn');
    btn.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    btn.style.transform  = 'scale(0.92) rotate(8deg)';
    setTimeout(() => { btn.style.transform = ''; }, 300);
  });

  /* ── Language toggle ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    qsa('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (lang === 'en') {
      get('story-en').classList.remove('hidden');
      get('story-ar').classList.add('hidden');
    } else {
      get('story-ar').classList.remove('hidden');
      get('story-en').classList.add('hidden');
    }
  });

  /* ── Logo spin ── */
  get('logo-icon').addEventListener('click', () => {
    const svg = get('logo-icon').querySelector('svg');
    svg.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
    svg.style.transform  = 'rotate(360deg) scale(1.25)';
    setTimeout(() => {
      svg.style.transition = 'transform 0.4s ease';
      svg.style.transform  = '';
    }, 700);
  });

  /* ── Swipe back gesture ── */
  let swipeX = 0;
  document.addEventListener('touchstart', e => {
    swipeX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - swipeX;
    if (delta > 70) {
      const active = qs('.screen.active');
      if (active === Screens.emotion) get('back-from-emotion').click();
      if (active === Screens.song)    get('back-from-song').click();
    }
  }, { passive: true });

  /* ── Cover tilt (mouse) ── */
  document.addEventListener('mousemove', e => {
    if (!Screens.song.classList.contains('active')) return;
    const img = get('song-cover-img');
    const rx  = ((e.clientY / window.innerHeight) - 0.5) * -12;
    const ry  = ((e.clientX / window.innerWidth)  - 0.5) *  12;
    img.style.transform =
      `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });

  /* ── Device tilt (iOS) ── */
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (!Screens.song.classList.contains('active')) return;
      const img = get('song-cover-img');
      const rx  = Math.max(-10, Math.min(10, (e.beta  ?? 0) / 8));
      const ry  = Math.max(-10, Math.min(10, (e.gamma ?? 0) / 5));
      img.style.transform =
        `perspective(700px) rotateX(${-rx}deg) rotateY(${ry}deg) scale(1.02)`;
    }, { passive: true });
  }

  /* ── Reset cover transform on song screen leave ── */
  get('back-from-song').addEventListener('click', () => {
    const img = get('song-cover-img');
    if (img) img.style.transform = '';
  });
}