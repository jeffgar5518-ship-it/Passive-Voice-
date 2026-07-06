import { UserProgress, TopicId, Badge } from '../types';

const STORAGE_KEY = 'passive_voice_progress_v1';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'Primeros Pasos',
    description: 'Completaste tu primera lección de voz pasiva.',
    icon: 'BookOpen'
  },
  {
    id: 'perfect-score',
    name: 'Puntuación Perfecta',
    description: 'Obtuviste un 100% en cualquiera de las evaluaciones.',
    icon: 'Award'
  },
  {
    id: 'grammar-guru',
    name: 'Gurú de la Gramática',
    description: 'Completaste la lectura teórica de los 9 temas.',
    icon: 'GraduationCap'
  },
  {
    id: 'exercise-champion',
    name: 'Campeón de Práctica',
    description: 'Completaste todos los exámenes con 80% o más de aciertos.',
    icon: 'Zap'
  },
  {
    id: 'streak-3',
    name: 'Fuego Constante',
    description: 'Alcanzaste una racha de estudio de 3 días.',
    icon: 'Flame'
  },
  {
    id: 'passive-fluent',
    name: 'Maestro Pasivo',
    description: 'Alcanzaste un total de 1,000 Puntos de Experiencia (XP).',
    icon: 'Sparkles'
  }
];

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  topics: {},
  unlockedBadges: [],
  xp: 0
};

export const progressStore = {
  getProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
        return DEFAULT_PROGRESS;
      }
      const parsed: UserProgress = JSON.parse(stored);
      
      // Validate and adjust streak
      return this.verifyStreak(parsed);
    } catch {
      return DEFAULT_PROGRESS;
    }
  },

  saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  verifyStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;

    if (today === lastActive) {
      return progress; // Already active today, streak is safe
    }

    const todayDate = new Date(today);
    const lastActiveDate = new Date(lastActive);
    const diffTime = Math.abs(todayDate.getTime() - lastActiveDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let updatedProgress = { ...progress };

    if (diffDays === 1) {
      // Studied yesterday, active today, but we haven't updated lastActiveDate yet in this read.
      // We will update it during action.
    } else if (diffDays > 1) {
      // Streak broken
      updatedProgress.streak = 1;
    }

    return updatedProgress;
  },

  recordActivity(topicId: TopicId, completedLesson: boolean, quizScore: number): { progress: UserProgress, newlyUnlockedBadges: Badge[] } {
    let progress = this.getProgress();
    const today = new Date().toISOString().split('T')[0];
    const originalBadges = [...progress.unlockedBadges];

    // Update streak and lastActiveDate
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (progress.lastActiveDate === yesterdayStr) {
        progress.streak += 1;
      } else {
        progress.streak = 1;
      }
      progress.lastActiveDate = today;
    }

    // Initialize or get topic progress
    const currentTopicProgress = progress.topics[topicId] || {
      topicId,
      completedLesson: false,
      quizHighScore: 0,
      quizAttempts: 0
    };

    let xpGain = 0;

    if (completedLesson && !currentTopicProgress.completedLesson) {
      currentTopicProgress.completedLesson = true;
      xpGain += 50; // XP for reading a lesson
    }

    if (quizScore > currentTopicProgress.quizHighScore) {
      const difference = quizScore - currentTopicProgress.quizHighScore;
      xpGain += Math.round(difference * 2.5); // 250 XP max for 100% score
      currentTopicProgress.quizHighScore = quizScore;
    }

    if (quizScore > 0) {
      currentTopicProgress.quizAttempts += 1;
    }

    progress.topics[topicId] = currentTopicProgress;
    progress.xp += xpGain;

    const topicsList = Object.values(progress.topics) as any[];

    // Badge triggers check
    const newlyUnlockedIds: string[] = [];

    // 1. First Steps
    if (!originalBadges.includes('first-steps')) {
      const totalCompletedLessons = topicsList.filter(t => t.completedLesson).length;
      if (totalCompletedLessons >= 1) {
        newlyUnlockedIds.push('first-steps');
      }
    }

    // 2. Perfect score
    if (!originalBadges.includes('perfect-score') && quizScore === 100) {
      newlyUnlockedIds.push('perfect-score');
    }

    // 3. Grammar Guru
    if (!originalBadges.includes('grammar-guru')) {
      const totalCompletedLessons = topicsList.filter(t => t.completedLesson).length;
      if (totalCompletedLessons >= 9) { // 9 topics
        newlyUnlockedIds.push('grammar-guru');
      }
    }

    // 4. Exercise Champion
    if (!originalBadges.includes('exercise-champion')) {
      const allTopicIds: TopicId[] = [
        'present-simple', 'present-continuous', 'past-simple', 'past-continuous',
        'present-perfect', 'future-simple', 'future-perfect', 'infinitives', 'modals'
      ];
      const hasAllExamScoresHigh = allTopicIds.every(id => {
        const topic = progress.topics[id];
        return topic && topic.quizHighScore >= 80;
      });
      if (hasAllExamScoresHigh) {
        newlyUnlockedIds.push('exercise-champion');
      }
    }

    // 5. Streak 3
    if (!originalBadges.includes('streak-3') && progress.streak >= 3) {
      newlyUnlockedIds.push('streak-3');
    }

    // 6. Passive Fluent (Master)
    if (!originalBadges.includes('passive-fluent') && progress.xp >= 1000) {
      newlyUnlockedIds.push('passive-fluent');
    }

    // Merge new badges
    progress.unlockedBadges = [...originalBadges, ...newlyUnlockedIds];
    this.saveProgress(progress);

    const newlyUnlockedBadges = ALL_BADGES.filter(b => newlyUnlockedIds.includes(b.id));

    return { progress, newlyUnlockedBadges };
  },

  // Helper for testing streaks easily
  simulateStreakBoost(): UserProgress {
    let progress = this.getProgress();
    progress.streak += 1;
    
    // Push the active date back so the boost represents a real gap or sequence
    const fakeActive = new Date();
    progress.lastActiveDate = fakeActive.toISOString().split('T')[0];
    
    // Check if streak 3 is unlocked
    if (progress.streak >= 3 && !progress.unlockedBadges.includes('streak-3')) {
      progress.unlockedBadges.push('streak-3');
    }
    
    this.saveProgress(progress);
    return progress;
  },

  resetProgress(): UserProgress {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
    return DEFAULT_PROGRESS;
  }
};
