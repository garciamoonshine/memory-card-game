class MemoryGame {
  constructor() {
    this.board = document.getElementById('board');
    this.movesEl = document.getElementById('moves');
    this.timerEl = document.getElementById('timer');
    this.bestEl = document.getElementById('best');
    this.gridKey = '4x4';
    this.deck = [];
    this.flipped = [];
    this.locked = false;
    this.moves = 0;
    this.matched = 0;
    this.timer = new GameTimer(t => { this.timerEl.textContent = t; });
    this.best = JSON.parse(localStorage.getItem('memory-best') || '{}');
    this.updateBest();
  }

  init(gridKey = this.gridKey) {
    this.gridKey = gridKey;
    const cfg = GRID_CONFIGS[gridKey];
    this.deck = buildDeck(cfg.pairs);
    buildGrid(this.board, this.deck, cfg.cols);
    this.flipped = [];
    this.locked = true; // locked during peek
    this.moves = 0;
    this.matched = 0;
    this.movesEl.textContent = '0';
    this.timerEl.textContent = '0:00';
    this.timer.reset();
    this.updateBest();

    // peek: show all cards for 800ms then hide
    const cards = this.board.querySelectorAll('.card');
    cards.forEach(el => el.classList.add('flipped'));
    setTimeout(() => {
      cards.forEach(el => el.classList.remove('flipped'));
      setTimeout(() => {
        this.locked = false;
        this.timer.start();
        cards.forEach(el => {
          el.addEventListener('click', () => this.onCardClick(el));
        });
      }, 450);
    }, 900);
  }

  onCardClick(el) {
    const idx = parseInt(el.dataset.index);
    const card = this.deck[idx];
    if (this.locked || card.flipped || card.matched) return;
    card.flipped = true;
    el.classList.add('flipped');
    this.flipped.push({ el, card });
    if (this.flipped.length === 2) {
      this.moves++;
      this.movesEl.textContent = this.moves;
      this.locked = true;
      this.checkMatch();
    }
  }

  checkMatch() {
    const [a, b] = this.flipped;
    if (a.card.emoji === b.card.emoji) {
      a.card.matched = b.card.matched = true;
      a.el.classList.add('matched');
      b.el.classList.add('matched');
      this.flipped = [];
      this.locked = false;
      this.matched++;
      if (this.matched === GRID_CONFIGS[this.gridKey].pairs) this.win();
    } else {
      setTimeout(() => {
        a.card.flipped = b.card.flipped = false;
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        this.flipped = [];
        this.locked = false;
      }, 900);
    }
  }

  win() {
    this.timer.stop();
    const key = this.gridKey;
    const current = { moves: this.moves, time: this.timer.elapsed };
    const prev = this.best[key];
    if (!prev || current.moves < prev.moves || (current.moves === prev.moves && current.time < prev.time)) {
      this.best[key] = current;
      localStorage.setItem('memory-best', JSON.stringify(this.best));
      this.updateBest();
    }
    setTimeout(() => {
      document.getElementById('win-stats').textContent =
        `${this.moves} moves in ${this.timer.formatted}`;
      document.getElementById('win-overlay').classList.remove('hidden');
    }, 400);
  }

  updateBest() {
    const b = this.best[this.gridKey];
    this.bestEl.textContent = b ? `${b.moves}m` : '--';
  }
}