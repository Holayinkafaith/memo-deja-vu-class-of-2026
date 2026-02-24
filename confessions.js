const SUPABASE_URL   = 'https://hwswintesajjitlmepnt.supabase.co';
const SUPABASE_ANON  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c3dpbnRlc2Fqaml0bG1lcG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NDkwMzQsImV4cCI6MjA4NzQyNTAzNH0.jl8cNK6GCqboXwhPHLmlLO0_Fj-kBbEnKLtwgd7R-K0';
const DEPARTMENT     = 'Educational Management 2026';
const ADMIN_PASSWORD = 'classrep2026';

async function sbSelect(table, filters = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filters}&order=created_at.desc`, {
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
  });
  return res.json();
}
async function sbInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function sbUpdate(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function sbDelete(table, id) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
  });
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Tag selector
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('confessionCategory').value = btn.dataset.tag;
  });
});

// Character counter
document.getElementById('confessionMessage').addEventListener('input', function () {
  document.getElementById('charCount').textContent = this.value.length;
});

// Form submit
document.getElementById('confessionForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const message = document.getElementById('confessionMessage').value.trim();
  if (!message) return;
  const submitBtn = document.getElementById('confessionSubmit');
  submitBtn.disabled = true;
  submitBtn.querySelector('.submit-text').textContent = 'Sending...';
  const payload = {
    to_person:  document.getElementById('confessionTo').value.trim() || null,
    message,
    category:   document.getElementById('confessionCategory').value,
    status:     'pending',
    department: DEPARTMENT
  };
  try {
    const result = await sbInsert('confessions', payload);
    if (result && result.length > 0) {
      document.getElementById('confessionForm').style.display    = 'none';
      document.getElementById('confessionSuccess').style.display = 'flex';
    } else {
      submitBtn.querySelector('.submit-text').textContent = 'Something went wrong. Try again.';
      submitBtn.disabled = false;
    }
  } catch {
    submitBtn.querySelector('.submit-text').textContent = 'No connection. Try again.';
    submitBtn.disabled = false;
  }
});

function resetConfessionForm() {
  document.getElementById('confessionForm').reset();
  document.getElementById('confessionForm').style.display    = 'flex';
  document.getElementById('confessionSuccess').style.display = 'none';
  document.getElementById('charCount').textContent           = '0';
  document.querySelectorAll('.tag-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.getElementById('confessionCategory').value = '💌 Confession';
  const btn = document.getElementById('confessionSubmit');
  btn.disabled = false;
  btn.querySelector('.submit-text').textContent = 'Send Anonymously';
}

// Drawer
const drawerOverlay = document.getElementById('confessionDrawerOverlay');

function openConfessionWall() {
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  loadConfessionWall();
}
function closeConfessionWall() {
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
drawerOverlay.addEventListener('click', e => { if (e.target === drawerOverlay) closeConfessionWall(); });

let touchStartY = 0;
drawerOverlay.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
drawerOverlay.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - touchStartY > 80) closeConfessionWall(); }, { passive: true });

async function loadConfessionWall() {
  const wall = document.getElementById('confessionWall');
  wall.innerHTML = '<div class="wall-loading">Loading confessions...</div>';
  try {
    const data = await sbSelect('confessions', `status=eq.approved&department=eq.${encodeURIComponent(DEPARTMENT)}`);
    const countEl = document.getElementById('drawerCount');
    if (countEl) countEl.textContent = data && data.length > 0 ? `${data.length} confession${data.length !== 1 ? 's' : ''}` : '0 confessions';
    if (!data || data.length === 0) {
      wall.innerHTML = '<div class="wall-empty"><span>🕊️</span><p>No confessions yet. Be the first to share something.</p></div>';
      return;
    }
    wall.innerHTML = data.map(c => `
      <div class="confession-card">
        <div class="confession-card-top">
          <span class="confession-cat">${c.category || '💌 Confession'}</span>
          <span class="confession-date">${formatDate(c.created_at)}</span>
        </div>
        ${c.to_person ? `<div class="confession-to">To: <em>${c.to_person}</em></div>` : ''}
        <p class="confession-body">"${c.message}"</p>
        <div class="confession-anon">— Anonymous</div>
      </div>`).join('');
  } catch {
    wall.innerHTML = '<div class="wall-loading">Could not load confessions.</div>';
  }
}

// Admin
let adminUnlocked = false;
function openAdminPanel() {
  const password = prompt('Enter admin password:');
  if (password !== ADMIN_PASSWORD) { alert('Incorrect password.'); return; }
  adminUnlocked = true;
  document.getElementById('adminPanel').style.display = 'block';
  document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' });
  loadAdminConfessions();
}
async function loadAdminConfessions() {
  if (!adminUnlocked) return;
  const container = document.getElementById('adminList');
  container.innerHTML = '<p style="color:var(--white-60);text-align:center;font-style:italic;">Loading...</p>';
  try {
    const data = await sbSelect('confessions', `department=eq.${encodeURIComponent(DEPARTMENT)}&status=eq.pending`);
    if (!data || data.length === 0) {
      container.innerHTML = '<p style="color:var(--white-60);text-align:center;font-style:italic;padding:1rem;">No pending confessions right now.</p>';
      return;
    }
    container.innerHTML = data.map(c => `
      <div class="admin-card" id="admin-card-${c.id}">
        <div class="admin-card-meta">
          <span class="confession-cat">${c.category || '💌 Confession'}</span>
          <span class="confession-date">${formatDate(c.created_at)}</span>
        </div>
        ${c.to_person ? `<div class="confession-to">To: <em>${c.to_person}</em></div>` : ''}
        <p class="admin-card-message">"${c.message}"</p>
        <div class="admin-card-actions">
          <button class="admin-approve-btn" onclick="approveConfession(${c.id})">✅ Approve</button>
          <button class="admin-reject-btn" onclick="rejectConfession(${c.id})">🗑️ Reject</button>
        </div>
      </div>`).join('');
  } catch {
    container.innerHTML = '<p style="color:var(--white-60);">Error loading confessions.</p>';
  }
}
async function approveConfession(id) {
  const card = document.getElementById(`admin-card-${id}`);
  card.style.opacity = '0.5'; card.style.pointerEvents = 'none';
  await sbUpdate('confessions', id, { status: 'approved' });
  card.innerHTML = '<p style="color:var(--gold);text-align:center;font-style:italic;padding:1rem;">✅ Approved — now live on the wall.</p>';
}
async function rejectConfession(id) {
  const card = document.getElementById(`admin-card-${id}`);
  card.style.opacity = '0.5'; card.style.pointerEvents = 'none';
  await sbDelete('confessions', id);
  card.innerHTML = '<p style="color:#e74c3c;text-align:center;font-style:italic;padding:1rem;">🗑️ Deleted.</p>';
}