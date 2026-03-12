function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(pairs) {
  const selected = shuffle(EMOJIS).slice(0, pairs);
  return shuffle([...selected, ...selected].map((emoji, id) => ({ id, emoji, matched: false, flipped: false })));
}

function buildGrid(board, deck, cols) {
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.innerHTML = '';
  deck.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.index = i;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${card.emoji}</div>
      </div>`;
    board.appendChild(el);
  });
}