// 2-Player Turn-Based Mode - Phase 2
let multiplayerMode = false;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let streaks = { 1: 0, 2: 0 };

function initMultiplayer() {
  multiplayerMode = true;
  currentPlayer = 1;
  scores = { 1: 0, 2: 0 };
  streaks = { 1: 0, 2: 0 };
  updatePlayerDisplay();
}

function onPairFound(matched) {
  if (!multiplayerMode) return;
  if (matched) {
    scores[currentPlayer]++;
    streaks[currentPlayer]++;
    const bonus = streaks[currentPlayer] > 1 ? streaks[currentPlayer] - 1 : 0;
    if (bonus > 0) showBonusNotice(`P${currentPlayer} Streak x${streaks[currentPlayer]}! +${bonus} bonus`);
    // Same player goes again on a match
  } else {
    streaks[currentPlayer] = 0;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
  updatePlayerDisplay();
}

function updatePlayerDisplay() {
  const el = document.getElementById('player-turn');
  const s1 = document.getElementById('p1-score');
  const s2 = document.getElementById('p2-score');
  if (el) el.textContent = multiplayerMode ? `Player ${currentPlayer}'s Turn` : '';
  if (s1) s1.textContent = scores[1];
  if (s2) s2.textContent = scores[2];
  document.getElementById('p1-indicator')?.classList.toggle('active', currentPlayer === 1);
  document.getElementById('p2-indicator')?.classList.toggle('active', currentPlayer === 2);
}

function getWinner() {
  if (scores[1] > scores[2]) return 'Player 1 Wins! 🎉';
  if (scores[2] > scores[1]) return 'Player 2 Wins! 🎉';
  return "It's a Tie! 🤝";
}

function showBonusNotice(msg) {
  const el = document.getElementById('bonus-notice');
  if (el) { el.textContent = msg; el.style.opacity = '1'; setTimeout(() => el.style.opacity = '0', 2000); }
}
