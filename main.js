/* =============================================
   MEMO DE JAVU – Class of 2028
   Department of Educational Management
   main.js
   ============================================= */

/* ===== DATA ===== */

const students = [
  { name: "Adaeze Okonkwo",     nickname: "Ada",       initials: "AO", emojis: "👑✨📚", quote: "...", memory: "...", ambition: "..." },
  { name: "Chukwuemeka Eze",    nickname: "Chuks",     initials: "CE", emojis: "😂🎯🏆", quote: "...", memory: "...", ambition: "..." },
  { name: "Fatima Al-Hassan",   nickname: "Fati",      initials: "FA", emojis: "💫🕊️📖", quote: "...", memory: "...", ambition: "..." },
  { name: "Oluwaseun Badmus",   nickname: "Seun B",    initials: "OB", emojis: "🎤🔥😎", quote: "...", memory: "...", ambition: "..." },
  { name: "Blessing Nwachukwu", nickname: "Blessings", initials: "BN", emojis: "🌸💪🎓", quote: "...", memory: "...", ambition: "..." },
  { name: "Ibrahim Musa",       nickname: "Ibro",      initials: "IM", emojis: "📊🧠⚡", quote: "...", memory: "...", ambition: "..." },
  { name: "Chidinma Okeke",     nickname: "Chidi",     initials: "CO", emojis: "🎨🌈✍️", quote: "...", memory: "...", ambition: "..." },
  { name: "Tunde Abiola",       nickname: "T-Boy",     initials: "TA", emojis: "⚽🤝😄", quote: "...", memory: "...", ambition: "..." },
  { name: "Amaka Igwe",         nickname: "Maka",      initials: "AI", emojis: "📱💡🌍", quote: "...", memory: "...", ambition: "..." },
  { name: "Yakubu Sani",        nickname: "Yaks",      initials: "YS", emojis: "🏔️📜🔑", quote: "...", memory: "...", ambition: "..." },
  { name: "Ngozi Uche",         nickname: "Ngo",       initials: "NU", emojis: "💼👠🌟", quote: "...", memory: "...", ambition: "..." },
  { name: "Emeka Okafor",       nickname: "Emzy",      initials: "EO", emojis: "🎵📚🌙", quote: "...", memory: "...", ambition: "..." },
  { name: "Aisha Bello",        nickname: "Aish",      initials: "AB", emojis: "🌺🤲✨", quote: "...", memory: "...", ambition: "..." },
  { name: "Damilola Fasanya",   nickname: "Dami",      initials: "DF", emojis: "👨‍💻🚀💬", quote: "...", memory: "...", ambition: "..." },
  { name: "Kemi Adeyemi",       nickname: "Kemz",      initials: "KA", emojis: "📸🎬🌸", quote: "...", memory: "...", ambition: "..." },
  { name: "Seun Olawale",       nickname: "The Prof",  initials: "SO", emojis: "📐🏛️🎯", quote: "...", memory: "...", ambition: "..." },
];

const galleryItems = [
  { category: "back-to-school", caption: "First day, 2024 — everyone was trying to look like they had it together.",     size: "tall"   },
  { category: "lecture",        caption: "Dr. Adeyemi's 8am lecture — 60% attendance, 100% vibes.",                       size: "short"  },
  { category: "dinner",         caption: "Dinner Night 2026 — we cleaned up beautifully.",                                size: "medium" },
  { category: "exam",           caption: "Exam season survival face — say less.",                                          size: "short"  },
  { category: "back-to-school", caption: "Year 2 orientation — we were the seniors now.",                                 size: "medium" },
  { category: "lecture",        caption: "Group presentation mode: activated.",                                            size: "tall"   },
  { category: "dinner",         caption: "The moment someone hit the dancefloor at Dinner Night 2027.",                   size: "short"  },
  { category: "exam",           caption: "Library at 2am. Looks voluntary. Was not.",                                     size: "medium" },
  { category: "back-to-school", caption: "Departmental photo day — nobody warned us it would be emotional.",              size: "short"  },
  { category: "lecture",        caption: "When the projector stops working for the 4th time.",                            size: "tall"   },
  { category: "dinner",         caption: "Final Dinner Night 2028 — the whole department in gold.",                       size: "medium" },
  { category: "exam",           caption: "Post-exam relief faces hit different after five years.",                        size: "short"  },
];

const awards = [
  { icon: "🏆", title: "Most Likely to Succeed",   nominees: ["Ngozi Uche",         "Ibrahim Musa",       "Seun Olawale"      ] },
  { icon: "😂", title: "Department Comedian",       nominees: ["Chukwuemeka Eze",    "Tunde Abiola",       "Emeka Okafor"      ] },
  { icon: "🧠", title: "Silent Genius",             nominees: ["Ibrahim Musa",        "Fatima Al-Hassan",   "Aisha Bello"       ] },
  { icon: "👗", title: "Most Fashionable",          nominees: ["Kemi Adeyemi",        "Adaeze Okonkwo",     "Ngozi Uche"        ] },
  { icon: "👻", title: "Always MIA",                nominees: ["Tunde Abiola",        "Yakubu Sani",        "Damilola Fasanya"  ] },
  { icon: "📚", title: "Born Lecturer",             nominees: ["Seun Olawale",        "Fatima Al-Hassan",   "Ibrahim Musa"      ] },
  { icon: "💞", title: "Most Beloved",              nominees: ["Blessing Nwachukwu",  "Aisha Bello",        "Adaeze Okonkwo"    ] },
  { icon: "🚀", title: "Future Billionaire",        nominees: ["Damilola Fasanya",    "Amaka Igwe",         "Ngozi Uche"        ] },
  { icon: "🎤", title: "Motivational Speaker",      nominees: ["Oluwaseun Badmus",    "Chidinma Okeke",     "Emeka Okafor"      ] },
  { icon: "🕊️", title: "Peacemaker",               nominees: ["Fatima Al-Hassan",    "Aisha Bello",        "Blessing Nwachukwu"] },
];

const tracks = [
  { title: "Higher",      artist: "Burna Boy ft. Chris Martin", emoji: "🔥", src: "audio/higher.mp3"        },
  { title: "Essence",     artist: "Wizkid ft. Tems",            emoji: "🌙", src: "audio/essence.mp3"       },
  { title: "Fall ",     artist: "Davido",                      emoji: "🎵", src: "audio/fall.mp3"       },
  { title: "Yawa",        artist: "Fireboy DML",                 emoji: "🎶", src: "audio/yawa.mp3"          },
  { title: "Pray For Me", artist: "Ayra Starr",                  emoji: "🙏", src: "audio/pray-for-me.mp3"   },
  { title: "Peru",        artist: "Fireboy ft. Ed Sheeran",      emoji: "🎸", src: "audio/peru.mp3"          },
  { title: "Bank On It",  artist: "Asake",                       emoji: "💛", src: "audio/bank-on-it.mp3"    },
];

const lecturers = [
  { name: "Prof. A. Adeyemi", title: "HOD, Educational Management", emoji: "🎓" },
  { name: "Dr. N. Okafor",    title: "Educational Administration",   emoji: "📋" },
  { name: "Prof. B. Salisu",  title: "Curriculum Studies",           emoji: "📚" },
  { name: "Dr. I. Olawale",   title: "Educational Psychology",       emoji: "🧠" },
  { name: "Dr. C. Eze",       title: "Educational Policy",           emoji: "⚖️" },
  { name: "Prof. A. Bello",   title: "History of Education",         emoji: "🏛️" },
];

/* ===== PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left              = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay    = Math.random() * 10 + 's';
    const size = (1 + Math.random() * 3) + 'px';
    p.style.width  = size;
    p.style.height = size;
    container.appendChild(p);
  }
}
createParticles();

/* ===== NAV TOGGLE ===== */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== COUNT UP ===== */
function animateCount(el) {
  const target   = parseInt(el.dataset.target);
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = true;
      animateCount(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

/* ===== TIMELINE ===== */
function toggleYear(el) {
  const mem    = el.querySelector('.year-memories');
  const isOpen = mem.classList.contains('open');
  document.querySelectorAll('.year-memories').forEach(m => m.classList.remove('open'));
  if (!isOpen) mem.classList.add('open');
}

   
 

/* ===== LEGACY WALL — HOMEPAGE FEATURED ===== */

// Pick 3 random graduates to feature (rotates on each page load)
function renderFeaturedGrads() {
  const container = document.getElementById('featuredGrads');
  if (!container) return;

  const shuffled = [...students].sort(() => Math.random() - 0.5).slice(0, 3);

  container.innerHTML = shuffled.map((s, i) => `
    <div class="featured-card" style="animation-delay: ${i * 0.15}s">
      <div class="featured-avatar">${s.initials}</div>
      <div class="featured-name">${s.name}</div>
      <div class="featured-nickname">${s.nickname || 'Class of 2028'}</div>
      <div class="featured-emojis">${s.emojis}</div>
    </div>
  `).join('');
}

renderFeaturedGrads();

// Animated counter for the big number
function animateLegacyCount() {
  const el = document.getElementById('legacyCount');
  if (!el) return;

  const target = 127;
  let current  = 0;
  const step   = target / (2000 / 16);

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !el.dataset.counted) {
        el.dataset.counted = true;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  countObs.observe(el);
}

animateLegacyCount();

// Smooth fade-out transition to archive page
const archiveLink = document.getElementById('archiveLink');
if (archiveLink) {
  archiveLink.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => { window.location.href = this.href; }, 400);
  });
}


 

 

 


/* ===== GALLERY ===== */
const galleryGrid = document.getElementById('galleryGrid');
const galleryColors = ['#0f2044', '#1a3060', '#0a2050', '#091a38', '#0d2550'];
const galleryEmojis = ['📸', '🎓', '🎉', '📚', '✨', '🌟', '🎤', '👑'];

function renderGallery(filter) {
  galleryGrid.innerHTML = '';
  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.category === filter);

  filtered.forEach((item, i) => {
    const div   = document.createElement('div');
    div.className = 'gallery-item';
    const color = galleryColors[i % galleryColors.length];
    const emoji = galleryEmojis[i % galleryEmojis.length];
    div.innerHTML = `
      <div class="gallery-img ${item.size}" style="background:linear-gradient(${120 + i * 30}deg, ${color}, #0a1628); display:flex; align-items:center; justify-content:center;">
        <span style="font-size:2rem; opacity:0.3">${emoji}</span>
      </div>
      <div class="gallery-overlay">
        <p class="gallery-caption">${item.caption}</p>
      </div>
    `;
    div.addEventListener('click', () => openLightbox(item.caption, i));
    galleryGrid.appendChild(div);
  });
}

renderGallery('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

/* ===== LIGHTBOX ===== */
function openLightbox(caption, i) {
  const img   = document.getElementById('lightboxImg');
  const emoji = galleryEmojis[i % galleryEmojis.length];
  img.innerHTML         = `<span style="font-size:3rem; opacity:0.4">${emoji}</span>`;
  img.style.display     = 'flex';
  img.style.alignItems  = 'center';
  img.style.justifyContent = 'center';
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== AWARDS ===== */
/* ===== AWARDS ===== */
const awardsGrid = document.getElementById('awardsGrid');
 

awards.forEach((a, awardIndex) => {
  const nomineesHTML = a.nominees.map((name, nomineeIndex) => `
    <div class="nominee-row" id="nominee-${awardIndex}-${nomineeIndex}">
      <div class="nominee-info">
        <span class="nominee-medal">${['🥇','🥈','🥉'][nomineeIndex]}</span>
        <span class="nominee-name">${name}</span>
      </div>
      <div class="nominee-right">
        <div class="vote-bar-wrap">
          <div class="vote-bar" id="bar-${awardIndex}-${nomineeIndex}"></div>
        </div>
        <span class="vote-count" id="count-${awardIndex}-${nomineeIndex}">0</span>
        <button class="vote-btn" onclick="voteFor(${awardIndex}, ${nomineeIndex})" id="vbtn-${awardIndex}-${nomineeIndex}">
          Vote
        </button>
      </div>
    </div>
  `).join('');

  const div = document.createElement('div');
  div.className = 'award-card reveal';
  div.innerHTML = `
    <span class="award-icon">${a.icon}</span>
    <div class="award-title">${a.title}</div>
    <div class="nominees-list">${nomineesHTML}</div>
    <div class="award-winner-label" id="winner-label-${awardIndex}" style="display:none;">
      👑 Leading: <span id="winner-name-${awardIndex}"></span>
    </div>
  `;
  awardsGrid.appendChild(div);
  observer.observe(div);
});

 
  

    

 

/* ===== COUNTDOWN TIMER ===== */
function updateCountdown() {
  const targetDate = new Date('January 1, 2033 00:00:00').getTime();
  const now        = Date.now();
  const diff       = targetDate - now;

  if (diff <= 0) {
    document.getElementById('cdDays').textContent  = '000';
    document.getElementById('cdHours').textContent = '00';
    document.getElementById('cdMins').textContent  = '00';
    document.getElementById('cdSecs').textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cdDays').textContent  = String(days).padStart(3, '0');
  document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cdMins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cdSecs').textContent  = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== TIME CAPSULE ===== */
function lockCapsule() {
  const name = document.getElementById('capsuleName').value.trim();
  const msg  = document.getElementById('capsuleMessage').value.trim();

  if (!name || !msg) {
    alert('Please enter your name and write your message first.');
    return;
  }

  const btn = document.getElementById('lockBtn');
  btn.innerHTML = '<span>🔐</span> Message Sealed';
  btn.classList.add('locked');
  btn.disabled = true;

  document.getElementById('capsuleSuccess').style.display = 'block';
  document.getElementById('capsuleName').disabled    = true;
  document.getElementById('capsuleMessage').disabled = true;
}

/* ===== LECTURERS ===== */
const lecturerCards = document.getElementById('lecturerCards');

lecturers.forEach(l => {
  const div = document.createElement('div');
  div.className = 'lecturer-card reveal';
  div.innerHTML = `
    <div class="lecturer-avatar">${l.emoji}</div>
    <div class="lecturer-name">${l.name}</div>
    <div class="lecturer-title">${l.title}</div>
  `;
  lecturerCards.appendChild(div);
  observer.observe(div);
});

/* ===== SOUNDTRACK ===== */
const tracksGrid = document.getElementById('tracksGrid');
let nowPlaying = null;
const audioPlayer = new Audio();

tracks.forEach((t, i) => {
  const div = document.createElement('div');
  div.className = 'track-card reveal';
  div.style.transitionDelay = (i * 0.05) + 's';
  div.innerHTML = `
    <div class="track-cover">${t.emoji}</div>
    <div class="track-info">
      <div class="track-title">${t.title}</div>
      <div class="track-artist">${t.artist}</div>
    </div>
    <button class="track-play" onclick="event.stopPropagation(); playTrack(${i})">▶</button>
  `;
  div.addEventListener('click', () => playTrack(i));
  tracksGrid.appendChild(div);
  observer.observe(div);
});

function playTrack(i) {
  const cards = document.querySelectorAll('.track-card');
  const t = tracks[i];

  // If the same track is already playing, pause it
  if (nowPlaying === i && !audioPlayer.paused) {
    audioPlayer.pause();
    cards[i].classList.remove('playing');
    cards[i].querySelector('.track-play').textContent = '▶';
    document.getElementById('nowPlayingBar').style.display = 'none';
    nowPlaying = null;
    return;
  }

  // Stop whatever is currently playing
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  // Load and play the new track
  audioPlayer.src = t.src;
  audioPlayer.play().catch(err => {
    console.warn('Audio playback failed:', err);
    alert(`Could not play "${t.title}". Make sure the file "${t.src}" exists in your project folder.`);
  });

  // Update all card UIs
  cards.forEach((c, j) => {
    c.classList.toggle('playing', j === i);
    c.querySelector('.track-play').textContent = j === i ? '■' : '▶';
  });

  // Update now-playing bar
  document.getElementById('npTrack').textContent = `${t.title} · ${t.artist}`;
  document.getElementById('nowPlayingBar').style.display = 'flex';
  nowPlaying = i;

  // When track finishes, reset UI
  audioPlayer.onended = () => {
    cards[i].classList.remove('playing');
    cards[i].querySelector('.track-play').textContent = '▶';
    document.getElementById('nowPlayingBar').style.display = 'none';
    nowPlaying = null;
  };
}

function stopTrack() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  document.querySelectorAll('.track-card').forEach(c => {
    c.classList.remove('playing');
    c.querySelector('.track-play').textContent = '▶';
  });
  document.getElementById('nowPlayingBar').style.display = 'none';
  nowPlaying = null;
}

/* ===== AUDIO TOGGLE ===== */
let audioOn = false;
document.getElementById('audioToggle').addEventListener('click', () => {
  audioOn = !audioOn;
  document.getElementById('audioToggle').innerHTML = audioOn ? '🔇' : '♪';
  // In production: control actual <audio> element here
});

/* ===== PARALLAX ===== */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
  }
});

