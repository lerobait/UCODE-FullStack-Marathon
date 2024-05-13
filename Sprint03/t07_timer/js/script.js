class Timer {
  constructor(title, delay, stopCount) {
    this.title = title;
    this.delay = delay;
    this.stopCount = stopCount;
    this.remainingCount = stopCount;
    this.intervalId = null;
  }

  start() {
    console.log(
      `Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCount})`
    );
    this.intervalId = setInterval(() => this.tick(), this.delay);
  }

  tick() {
    if (this.remainingCount > 0) {
      console.log(
        `Timer ${this.title} Tick! | cycles left ${this.remainingCount - 1}`
      );
      this.remainingCount--;
    } else {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.intervalId);
    console.log(`Timer ${this.title} stopped`);
  }
}

const runTimer = (id, delay, counter) => {
  const timer = new Timer(id, delay, counter);
  timer.start();
};
