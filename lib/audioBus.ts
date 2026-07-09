"use client";

// Singleton ambient-audio manager, shared between the AudioPlayer control
// and any component that needs to duck the background music (e.g. the
// Escale gallery fading it out while a project video plays).
class AudioBus {
  private audio: HTMLAudioElement | null = null;
  private userVolume = 0.6;
  private duckFactor = 1;
  private duckRaf: number | null = null;
  private duckCount = 0;

  private ensure() {
    if (!this.audio) {
      const a = new Audio("/assets/ambiance.mp3");
      a.loop = true;
      a.volume = this.userVolume;
      this.audio = a;
    }
    return this.audio;
  }

  play() {
    const a = this.ensure();
    a.volume = this.userVolume * this.duckFactor;
    a.play().catch(() => {});
  }

  pause() {
    this.audio?.pause();
  }

  isPlaying() {
    return !!this.audio && !this.audio.paused;
  }

  setUserVolume(v: number) {
    this.userVolume = v;
    if (this.audio) this.audio.volume = v * this.duckFactor;
  }

  private animateDuck(target: number, duration: number) {
    if (this.duckRaf) cancelAnimationFrame(this.duckRaf);
    const start = this.duckFactor;
    const startTime = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - startTime) / duration);
      this.duckFactor = start + (target - start) * p;
      if (this.audio) this.audio.volume = this.userVolume * this.duckFactor;
      if (p < 1) this.duckRaf = requestAnimationFrame(step);
    };
    this.duckRaf = requestAnimationFrame(step);
  }

  // Reference-counted so multiple videos playing/pausing in sequence don't
  // prematurely restore the volume.
  duck() {
    this.duckCount += 1;
    this.animateDuck(0.08, 500);
  }

  unduck() {
    this.duckCount = Math.max(0, this.duckCount - 1);
    if (this.duckCount === 0) this.animateDuck(1, 700);
  }
}

export const audioBus = new AudioBus();
