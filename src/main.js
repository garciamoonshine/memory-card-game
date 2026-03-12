window.addEventListener('DOMContentLoaded', () => {
  const game = new MemoryGame();
  game.init('4x4');

  // difficulty buttons
  const diffBtns = document.querySelectorAll('.diff-btn');
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = btn.dataset.size;
      // map button labels to grid keys
      const labels = ['4x4','6x4','6x6'];
      const idx = [...diffBtns].indexOf(btn);
      game.init(labels[idx]);
      document.getElementById('win-overlay').classList.add('hidden');
    });
  });

  document.getElementById('restart-btn').addEventListener('click', () => {
    game.init();
    document.getElementById('win-overlay').classList.add('hidden');
  });

  document.getElementById('play-again').addEventListener('click', () => {
    document.getElementById('win-overlay').classList.add('hidden');
    game.init();
  });
});