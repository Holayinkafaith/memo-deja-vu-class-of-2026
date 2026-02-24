/* =============================================
   MEMO DE JAVU – Class of 2028
   Live Voting — votes.js
   Add <script src="votes.js"></script> to your
   index.html just before </body>
   ============================================= */

/* ===== CONFIG ===== */
const VOTE_SUPABASE_URL  = 'https://hwswintesajjitlmepnt.supabase.co';
const VOTE_SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3c3dpbnRlc2Fqaml0bG1lcG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NDkwMzQsImV4cCI6MjA4NzQyNTAzNH0.jl8cNK6GCqboXwhPHLmlLO0_Fj-kBbEnKLtwgd7R-K0';
const VOTE_DEPARTMENT    = 'Educational Management 2026';

/* ===== DEVICE ID =====
   Generates a unique ID for this device and stores
   it in localStorage so it persists across visits.
   This is what prevents the same person voting twice.
===== */
function getDeviceId() {
  let id = localStorage.getItem('mdj_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('mdj_device_id', id);
  }
  return id;
}
const DEVICE_ID = getDeviceId();

/* ===== SUPABASE HELPERS ===== */
async function voteSelect(filters = '') {
  const res = await fetch(
    `${VOTE_SUPABASE_URL}/rest/v1/votes?${filters}`,
    {
      headers: {
        'apikey': VOTE_SUPABASE_ANON,
        'Authorization': `Bearer ${VOTE_SUPABASE_ANON}`
      }
    }
  );
  return res.json();
}

async function voteInsert(data) {
  const res = await fetch(`${VOTE_SUPABASE_URL}/rest/v1/votes`, {
    method: 'POST',
    headers: {
      'apikey': VOTE_SUPABASE_ANON,
      'Authorization': `Bearer ${VOTE_SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function voteDelete(awardIndex) {
  await fetch(
    `${VOTE_SUPABASE_URL}/rest/v1/votes?award_index=eq.${awardIndex}&device_id=eq.${DEVICE_ID}&department=eq.${encodeURIComponent(VOTE_DEPARTMENT)}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': VOTE_SUPABASE_ANON,
        'Authorization': `Bearer ${VOTE_SUPABASE_ANON}`
      }
    }
  );
}

/* ===== LOAD ALL VOTES ON PAGE START ===== */
async function loadAllVotes() {
  try {
    // Get all votes for this department
    const allVotes = await voteSelect(
      `department=eq.${encodeURIComponent(VOTE_DEPARTMENT)}`
    );

    // Get this device's votes to know what they already voted for
    const myVotes = await voteSelect(
      `device_id=eq.${DEVICE_ID}&department=eq.${encodeURIComponent(VOTE_DEPARTMENT)}`
    );

    // Build a map: awardIndex → nomineeIndex for this device
    const myVoteMap = {};
    myVotes.forEach(v => { myVoteMap[v.award_index] = v.nominee_index; });

    // Build vote counts: voteCounts[awardIndex][nomineeIndex] = count
    const voteCounts = awards.map(a => a.nominees.map(() => 0));
    allVotes.forEach(v => {
      if (voteCounts[v.award_index] && voteCounts[v.award_index][v.nominee_index] !== undefined) {
        voteCounts[v.award_index][v.nominee_index]++;
      }
    });

    // Render each award card with real data
    awards.forEach((a, awardIndex) => {
      const total     = voteCounts[awardIndex].reduce((s, v) => s + v, 0);
      const myVote    = myVoteMap[awardIndex]; // undefined if not voted yet
      const hasVoted  = myVote !== undefined;

      a.nominees.forEach((name, ni) => {
        const count   = voteCounts[awardIndex][ni];
        const pct     = total > 0 ? Math.round((count / total) * 100) : 0;
        const btn     = document.getElementById(`vbtn-${awardIndex}-${ni}`);
        const countEl = document.getElementById(`count-${awardIndex}-${ni}`);
        const bar     = document.getElementById(`bar-${awardIndex}-${ni}`);
        const row     = document.getElementById(`nominee-${awardIndex}-${ni}`);

        if (!btn || !countEl || !bar || !row) return;

        // Show real vote counts and bar
        countEl.textContent = `${count} vote${count !== 1 ? 's' : ''} · ${pct}%`;
        bar.style.width     = pct + '%';

        if (hasVoted) {
          if (ni === myVote) {
            // This is what they voted for
            btn.textContent = '✓ Voted';
            btn.classList.add('voted');
            btn.classList.remove('vote-disabled');
            btn.disabled = false;
            row.classList.add('nominee-voted');
            // Show "change vote" option
            btn.title = 'Click to change your vote';
            btn.onclick = () => changeVote(awardIndex, ni);
          } else {
            // Other nominees — allow switching
            btn.textContent = 'Switch';
            btn.disabled    = false;
            btn.classList.remove('voted');
            btn.classList.add('vote-switch');
            btn.onclick = () => changeVote(awardIndex, ni);
          }
        }
      });

      // Show leading candidate if votes exist
      if (hasVoted && total > 0) {
        const maxVotes  = Math.max(...voteCounts[awardIndex]);
        const leaderIdx = voteCounts[awardIndex].indexOf(maxVotes);
        const labelEl   = document.getElementById(`winner-label-${awardIndex}`);
        const nameEl    = document.getElementById(`winner-name-${awardIndex}`);
        if (labelEl && nameEl) {
          labelEl.style.display = 'block';
          nameEl.textContent    = a.nominees[leaderIdx];
        }
      }
    });

  } catch (err) {
    console.warn('Could not load votes:', err);
  }
}

/* ===== VOTE FOR A NOMINEE ===== */
async function voteFor(awardIndex, nomineeIndex) {
  const btn = document.getElementById(`vbtn-${awardIndex}-${nomineeIndex}`);
  if (btn) { btn.disabled = true; btn.textContent = '...'; }

  try {
    const result = await voteInsert({
      award_index:   awardIndex,
      nominee_index: nomineeIndex,
      device_id:     DEVICE_ID,
      department:    VOTE_DEPARTMENT
    });

    if (result && result.length > 0) {
      // Success — reload all votes to show updated counts
      await loadAllVotes();
    } else {
      // Already voted — just reload to show current state
      await loadAllVotes();
    }
  } catch (err) {
    console.warn('Vote failed:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Vote'; }
  }
}

/* ===== CHANGE VOTE ===== */
async function changeVote(awardIndex, newNomineeIndex) {
  // Disable all buttons in this award while processing
  awards[awardIndex].nominees.forEach((_, ni) => {
    const btn = document.getElementById(`vbtn-${awardIndex}-${ni}`);
    if (btn) { btn.disabled = true; btn.textContent = '...'; }
  });

  try {
    // Delete old vote first
    await voteDelete(awardIndex);
    // Insert new vote
    await voteInsert({
      award_index:   awardIndex,
      nominee_index: newNomineeIndex,
      device_id:     DEVICE_ID,
      department:    VOTE_DEPARTMENT
    });
    // Reload to show updated counts
    await loadAllVotes();
  } catch (err) {
    console.warn('Change vote failed:', err);
    await loadAllVotes();
  }
}

/* ===== ADD SWITCH BUTTON STYLE ===== */
const voteStyle = document.createElement('style');
voteStyle.textContent = `
  .vote-btn.vote-switch {
    border-color: var(--white-60);
    color: var(--white-60);
    font-size: 0.6rem;
    letter-spacing: 1px;
  }
  .vote-btn.vote-switch:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: transparent;
  }
  .awards-loading {
    text-align: center;
    color: var(--white-60);
    font-family: var(--font-serif);
    font-style: italic;
    padding: 1rem;
    grid-column: 1 / -1;
  }
`;
document.head.appendChild(voteStyle);

/* ===== INIT — load votes when page is ready ===== */
loadAllVotes();
