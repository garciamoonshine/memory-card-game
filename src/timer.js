class GameTimer {
  constructor(onTick) {
    this.elapsed = 0;
    this.running = false;
    this.interval = null;
    this.onTick = onTick;
  }

  start() {
    this.elapsed = 0;
    this.running = true;
    this.interval = setInterval(() => {
      this.elapsed++;
      if (this.onTick) this.onTick(this.formatted);
    }, 1000);
  }

  stop() {
    this.running = false;
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.stop();
    this.elapsed = 0;
  }

  get formatted() {
    const m = Math.floor(this.elapsed / 60);
    const s = this.elapsed % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }
}