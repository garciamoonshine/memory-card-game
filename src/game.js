// Memory Card Game - Enhanced Phase 2
let cards = [], flipped = [], matched = 0, moves = 0;
let timerInterval, elapsedSeconds = 0;
let isLocked = false;

function startGame() {
  clearInterval(timerInterval);
  elapsedSeconds = 0; moves = 0; matched = 0; flipped = []; isLocked = false;
  document.getElementById('moves').textContent = 0;
  document.getElementById('timer').textContent = '0:00';
  document.getElementById('result-msg').textContent = '';
  if (multiplayerMode) initMultiplayer();

  const cols = parseInt(document.getElementById('difficulty').value);
  const pairs = cols * 4 / 2; // e.g. 6*4/2 = 12 pairs
  const pool = getThemeEmojis(activeTheme, pairs);

  // Fill with defaults if not enough
  const defaultPool = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮'];
  while (pool.length < pairs) pool.push(defaultPool[pool.length % defaultPool.length]);

  const doubled = [...pool, ...pool].sort(() => Math.random() - 0.5);
  cards = doubled.map((emoji, i) => ({ id: i, emoji, isFlipped: false, isMatched: false }));

  const grid = document.getElementById('card-grid');
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.innerHTML = '';
  cards.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.index = i;
    el.innerHTML = '<span class="card-back">🌟</span>';
    el.addEventListener('click', () => flipCard(i, el));
    grid.appendChild(el);
  });

  timerInterval = setInterval(() => {
    elapsedSeconds++;
    const m = Math.floor(elapsedSeconds/60), s = elapsedSeconds % 60;
    document.getElementById('timer').textContent = `${m}:${s.toString().padStart(2,'0')}`;
  }, 1000);
}

function flipCard(index, el) {
  if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;
  cards[index].isFlipped = true;
  el.classList.add('flipped');
  const isCustomImg = typeof cards[index].emoji === 'string' && cards[index].emoji.startsWith('data:');
  el.innerHTML = isCustomImg
    ? `<img src="${cards[index].emoji}" style="width:80%;height:80%;object-fit:cover;border-radius:8px">`
    : `<span style="font-size:28px">${cards[index].emoji}</span>`;
  flipped.push(index);
  if (flipped.length === 2) { moves++; document.getElementById('moves').textContent = moves; checkMatch(); }
}

function checkMatch() {
  isLocked = true;
  const [a, b] = flipped;
  const isMatch = cards[a].emoji === cards[b].emoji;
  if (isMatch) {
    cards[a].isMatched = cards[b].isMatched = true;
    document.querySelectorAll('.card')[a].classList.add('matched');
    document.querySelectorAll('.card')[b].classList.add('matched');
    matched += 2;
    if (multiplayerMode) onPairFound(true);
    flipped = []; isLocked = false;
    if (matched === cards.length) endGame();
  } else {
    if (multiplayerMode) onPairFound(false);
    setTimeout(() => {
      [a, b].forEach(i => {
        cards[i].isFlipped = false;
        const el = document.querySelectorAll('.card')[i];
        el.classList.remove('flipped');
        el.innerHTML = '<span class="card-back">🌟</span>';
      });
      flipped = []; isLocked = false;
    }, 900);
  }
}

function endGame() {
  clearInterval(timerInterval);
  const bestKey = `memoryBest_${activeTheme}_${document.getElementById('difficulty').value}`;
  const prev = parseInt(localStorage.getItem(bestKey)) || Infinity;
  if (moves < prev) localStorage.setItem(bestKey, moves);
  document.getElementById('best-moves').textContent = Math.min(moves, prev);
  const msg = multiplayerMode ? getWinner() : `🎉 Done in ${moves} moves & ${Math.floor(elapsedSeconds/60)}:${(elapsedSeconds%60).toString().padStart(2,'0')}!`;
  document.getElementById('result-msg').textContent = msg;
}

startGame();
