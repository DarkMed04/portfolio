class SoundEffectsEngine {
  private sfxEnabled = false;
  private ambientEnabled = false;
  private ctx: AudioContext | null = null;
  private audioEl: HTMLAudioElement | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  public setSfxEnabled(val: boolean): void {
    this.sfxEnabled = val;
    if (val) {
      this.ensureContext();
    }
  }

  public isAmbientEnabled(): boolean {
    return this.ambientEnabled;
  }

  // Uses a calm external/local MP3 if present at /audio/ambient.mp3 at low volume.
  // Never plays harsh synthesized drones.
  public setAmbientEnabled(val: boolean): void {
    if (typeof window === "undefined") return;

    if (val) {
      if (!this.audioEl) {
        this.audioEl = new Audio("/audio/ambient.mp3");
        this.audioEl.loop = true;
        this.audioEl.volume = 0.08;
      }

      this.audioEl
        .play()
        .then(() => {
          this.ambientEnabled = true;
        })
        .catch(() => {
          this.ambientEnabled = false;
        });
    } else {
      this.stopAmbient();
    }
  }

  public stopAmbient(): void {
    this.ambientEnabled = false;
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
    }
  }

  // Ultra-soft subtle micro-tap when SFX is manually enabled
  public playClick(): void {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.025);

      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.0002, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Ignore audio errors
    }
  }

  // Soft muted tap for visual/gallery interactions
  public playShutter(): void {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.035);

      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.0002, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignore audio errors
    }
  }
}

export const soundFx = new SoundEffectsEngine();