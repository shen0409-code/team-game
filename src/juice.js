import { ctx } from './main.js';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function playLaserSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
}

export class ScreenShake {
    constructor() {
        this.shakeDuration = 0;
        this.intensity = 0;
    }

    trigger(intensity = 8, duration = 10) {
        this.intensity = intensity;
        this.shakeDuration = duration;
    }

    apply() {
        if (this.shakeDuration > 0) {
            const dx = (Math.random() - 0.5) * this.intensity;
            const dy = (Math.random() - 0.5) * this.intensity;
            ctx.translate(dx, dy);
            this.shakeDuration--;
        }
    }
}