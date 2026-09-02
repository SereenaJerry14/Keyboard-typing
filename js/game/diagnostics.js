import { FINGERS, KEY_FINGER_MAP } from '../config/finger_map.js';

export class DiagnosticsTracker {
    constructor() {
        this.fingerStats = this.loadStats();
        this.lastKeystrokeTime = null;
    }

    loadStats() {
        try {
            const saved = localStorage.getItem('fingerflow_diagnostics');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load diagnostics', e);
        }

        const initial = {};
        Object.keys(FINGERS).forEach(fid => {
            initial[fid] = {
                id: fid,
                totalHits: 0,
                correctHits: 0,
                errors: 0,
                totalLatencyMs: 0,
                latencyCount: 0
            };
        });
        return initial;
    }

    saveStats() {
        try {
            localStorage.setItem('fingerflow_diagnostics', JSON.stringify(this.fingerStats));
        } catch (e) {
            console.warn('Could not save diagnostics', e);
        }
    }

    recordKeystroke(char, isCorrect, fingerId) {
        if (!fingerId || !this.fingerStats[fingerId]) return;

        const now = performance.now();
        let latency = 0;
        if (this.lastKeystrokeTime) {
            latency = Math.min(2000, Math.max(20, now - this.lastKeystrokeTime));
        }
        this.lastKeystrokeTime = now;

        const stat = this.fingerStats[fingerId];
        stat.totalHits++;
        if (isCorrect) {
            stat.correctHits++;
            if (latency > 0) {
                stat.totalLatencyMs += latency;
                stat.latencyCount++;
            }
        } else {
            stat.errors++;
        }

        this.saveStats();
    }

    resetSessionTimer() {
        this.lastKeystrokeTime = null;
    }

    getFingerMetrics(fingerId) {
        const stat = this.fingerStats[fingerId];
        if (!stat || stat.totalHits === 0) {
            return {
                accuracy: 100,
                avgLatency: 0,
                totalHits: 0,
                errors: 0
            };
        }
        const accuracy = Math.round((stat.correctHits / stat.totalHits) * 100);
        const avgLatency = stat.latencyCount > 0 ? Math.round(stat.totalLatencyMs / stat.latencyCount) : 0;
        return {
            accuracy,
            avgLatency,
            totalHits: stat.totalHits,
            errors: stat.errors
        };
    }

    getAllMetrics() {
        const metrics = {};
        Object.keys(FINGERS).forEach(fid => {
            metrics[fid] = {
                ...FINGERS[fid],
                ...this.getFingerMetrics(fid)
            };
        });
        return metrics;
    }

    getWeakestFinger() {
        let weakest = null;
        let lowestScore = Infinity;

        Object.keys(FINGERS).forEach(fid => {
            const m = this.getFingerMetrics(fid);
            if (m.totalHits < 5) return; // Need at least 5 samples

            // Combined score: Accuracy * 10 - Latency / 10
            const score = m.accuracy * 10 - (m.avgLatency / 10);
            if (score < lowestScore) {
                lowestScore = score;
                weakest = fid;
            }
        });

        return weakest ? FINGERS[weakest] : null;
    }

    generateDrillForFinger(fingerId) {
        // Collect all keys mapped to this finger
        const fingerKeys = [];
        Object.entries(KEY_FINGER_MAP).forEach(([key, fId]) => {
            if (fId === fingerId && key.length === 1 && /^[a-zA-Z0-9,./;'`\-=\[\]]$/.test(key)) {
                if (!fingerKeys.includes(key.toLowerCase())) {
                    fingerKeys.push(key.toLowerCase());
                }
            }
        });

        if (fingerKeys.length === 0) {
            return 'asdf jkl; asdf jkl;';
        }

        // Generate patterns
        const patterns = [];
        // Single repeated drills
        fingerKeys.forEach(k => {
            patterns.push(`${k}${k} ${k}${k}${k} ${k}`);
        });

        // Combined pairs
        for (let i = 0; i < fingerKeys.length; i++) {
            for (let j = i + 1; j < fingerKeys.length; j++) {
                patterns.push(`${fingerKeys[i]}${fingerKeys[j]} ${fingerKeys[j]}${fingerKeys[i]}`);
            }
        }

        // Random sentence-like stream
        const tokens = [];
        for (let i = 0; i < 20; i++) {
            let word = '';
            const len = 2 + Math.floor(Math.random() * 3);
            for (let j = 0; j < len; j++) {
                word += fingerKeys[Math.floor(Math.random() * fingerKeys.length)];
            }
            tokens.push(word);
        }

        return `${patterns.slice(0, 4).join(' ')} ${tokens.join(' ')}`;
    }

    resetAllStats() {
        localStorage.removeItem('fingerflow_diagnostics');
        this.fingerStats = this.loadStats();
    }
}

export const diagnostics = new DiagnosticsTracker();
