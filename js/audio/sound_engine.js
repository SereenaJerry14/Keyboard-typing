// Web Audio API procedural sound synthesizer for mechanical switches & musical feedback
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.switchSound = 'blue'; // 'blue', 'brown', 'red', 'typewriter', 'mute'
        this.volume = 0.5;
        this.scaleNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // Pentatonic major
        this.initialized = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.initialized = true;
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setSwitchType(type) {
        this.switchSound = type;
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
    }

    playKeyClick(isSpace = false) {
        if (this.switchSound === 'mute' || this.volume === 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        if (this.switchSound === 'blue') {
            // Clicky Cherry MX Blue: High snap click + bottom-out resonance
            const clickOsc = this.ctx.createOscillator();
            const clickGain = this.ctx.createGain();
            clickOsc.type = 'triangle';
            clickOsc.frequency.setValueAtTime(isSpace ? 1800 : 2600 + Math.random() * 400, now);
            clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.015);
            clickGain.gain.setValueAtTime(0.3 * this.volume, now);
            clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
            clickOsc.connect(clickGain);
            clickGain.connect(this.ctx.destination);
            clickOsc.start(now);
            clickOsc.stop(now + 0.02);

            // Bottom-out thud
            const thudOsc = this.ctx.createOscillator();
            const thudGain = this.ctx.createGain();
            thudOsc.type = 'sine';
            thudOsc.frequency.setValueAtTime(isSpace ? 120 : 180 + Math.random() * 30, now + 0.005);
            thudOsc.frequency.exponentialRampToValueAtTime(40, now + 0.04);
            thudGain.gain.setValueAtTime(0.4 * this.volume, now + 0.005);
            thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
            thudOsc.connect(thudGain);
            thudGain.connect(this.ctx.destination);
            thudOsc.start(now + 0.005);
            thudOsc.stop(now + 0.05);

        } else if (this.switchSound === 'brown') {
            // Tactile Cherry MX Brown: Thoccy, warmer low-mid click
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(isSpace ? 160 : 280 + Math.random() * 50, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.035);
            gain.gain.setValueAtTime(0.5 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.045);

        } else if (this.switchSound === 'red') {
            // Linear Cherry MX Red: Soft, smooth pop
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(isSpace ? 140 : 220, now);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.025);
            gain.gain.setValueAtTime(0.35 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.035);

        } else if (this.switchSound === 'typewriter') {
            // Vintage Typewriter snap
            const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseBuffer.length; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = noiseBuffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(3200, now);
            filter.Q.setValueAtTime(3, now);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.6 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start(now);
        }
    }

    playError() {
        if (this.switchSound === 'mute' || this.volume === 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.12);
        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
    }

    playStreakChime(streakCount) {
        if (this.switchSound === 'mute' || this.volume === 0) return;
        if (streakCount <= 0 || streakCount % 5 !== 0) return;
        this.init();
        if (!this.ctx) return;

        const noteIndex = Math.min(Math.floor(streakCount / 5) % this.scaleNotes.length, this.scaleNotes.length - 1);
        const freq = this.scaleNotes[noteIndex];
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    playSuccessFanfare() {
        if (this.switchSound === 'mute' || this.volume === 0) return;
        this.init();
        if (!this.ctx) return;

        const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
        chords.forEach((freq, idx) => {
            const startTime = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.3 * this.volume, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.45);
        });
    }
}

export const sounds = new SoundEngine();
