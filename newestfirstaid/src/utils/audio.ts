/**
 * Clean Web Audio API sound generator for timer completion
 * Generates gentle, audible notification chimes without external audio files
 */
export function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const playTone = (freq: number, delay: number, duration: number) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay);
    };

    // Pleasant two-tone medical chime (e.g. 587Hz -> 880Hz)
    playTone(587.33, 0, 0.4);
    playTone(880.00, 250, 0.6);
  } catch (e) {
    console.warn('Audio chime could not be played:', e);
  }
}
