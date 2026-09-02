import { LESSON_STAGES } from '../config/lessons.js';

export class AcademyManager {
    constructor() {
        this.progress = this.loadProgress();
        this.currentStageIndex = 0;
        this.currentLessonIndex = 0;
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('fingerflow_academy_progress');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load progress', e);
        }

        // Default initial progress: First lesson unlocked
        const initial = {
            unlockedLessons: ['s1-l1'],
            lessonScores: {}, // lessonId -> { stars: 3, bestWpm: 45, bestAcc: 99 }
            totalStars: 0
        };
        return initial;
    }

    saveProgress() {
        try {
            localStorage.setItem('fingerflow_academy_progress', JSON.stringify(this.progress));
        } catch (e) {
            console.warn('Could not save progress', e);
        }
    }

    calculateStars(wpm, accuracy) {
        if (accuracy < 80) return 0;
        if (accuracy >= 98 && wpm >= 35) return 3;
        if (accuracy >= 94 && wpm >= 20) return 2;
        if (accuracy >= 85) return 1;
        return 1;
    }

    recordLessonCompletion(lessonId, stats) {
        const stars = this.calculateStars(stats.wpm, stats.accuracy);
        const existing = this.progress.lessonScores[lessonId] || { stars: 0, bestWpm: 0, bestAcc: 0 };

        const newStars = Math.max(existing.stars, stars);
        const bestWpm = Math.max(existing.bestWpm, stats.wpm);
        const bestAcc = Math.max(existing.bestAcc, stats.accuracy);

        this.progress.lessonScores[lessonId] = {
            stars: newStars,
            bestWpm,
            bestAcc
        };

        // Unlock next lesson
        const allLessons = [];
        LESSON_STAGES.forEach(st => st.lessons.forEach(l => allLessons.push(l.id)));
        const currentIndex = allLessons.indexOf(lessonId);
        if (currentIndex >= 0 && currentIndex + 1 < allLessons.length) {
            const nextLessonId = allLessons[currentIndex + 1];
            if (!this.progress.unlockedLessons.includes(nextLessonId)) {
                this.progress.unlockedLessons.push(nextLessonId);
            }
        }

        // Recalculate total stars
        let total = 0;
        Object.values(this.progress.lessonScores).forEach(score => {
            total += score.stars;
        });
        this.progress.totalStars = total;

        this.saveProgress();
        return { stars, isNewUnlock: true };
    }

    isLessonUnlocked(lessonId) {
        return this.progress.unlockedLessons.includes(lessonId);
    }

    getLessonScore(lessonId) {
        return this.progress.lessonScores[lessonId] || { stars: 0, bestWpm: 0, bestAcc: 0 };
    }

    getCurrentLesson() {
        const stage = LESSON_STAGES[this.currentStageIndex];
        if (!stage) return null;
        return stage.lessons[this.currentLessonIndex] || null;
    }

    selectLesson(stageIndex, lessonIndex) {
        this.currentStageIndex = stageIndex;
        this.currentLessonIndex = lessonIndex;
        return this.getCurrentLesson();
    }

    nextLesson() {
        const stage = LESSON_STAGES[this.currentStageIndex];
        if (this.currentLessonIndex + 1 < stage.lessons.length) {
            this.currentLessonIndex++;
            return this.getCurrentLesson();
        } else if (this.currentStageIndex + 1 < LESSON_STAGES.length) {
            this.currentStageIndex++;
            this.currentLessonIndex = 0;
            return this.getCurrentLesson();
        }
        return null;
    }
}

export const academy = new AcademyManager();
