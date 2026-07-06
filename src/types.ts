export type TopicId =
  | 'present-simple'
  | 'present-continuous'
  | 'past-simple'
  | 'past-continuous'
  | 'present-perfect'
  | 'future-simple'
  | 'future-perfect'
  | 'infinitives'
  | 'modals';

export interface FormulaPart {
  id: string;
  label: string;
  type: 'subject' | 'auxiliary' | 'verb' | 'preposition' | 'agent' | 'addition' | 'other';
  isCorrectPlace?: boolean;
}

export interface Lesson {
  id: TopicId;
  title: string;
  subtitle: string;
  formula: string; // e.g., "Sujeto + am/is/are + participio pasado (+ by + agente)"
  formulaParts: FormulaPart[]; // For the interactive formula builder
  useCase: string;
  explanation: string;
  activeExample: string;
  activeExampleTranslation: string;
  passiveExample: string;
  passiveExampleTranslation: string;
  keyPoints: string[];
  tips: string;
}

export type ExerciseType = 'multiple-choice' | 'fill-blanks' | 'reorder' | 'active-to-passive';

export interface Exercise {
  id: string;
  topicId: TopicId;
  type: ExerciseType;
  instruction: string;
  question: string; // The sentence or cue
  options?: string[]; // For multiple choice
  correctAnswer: string; // The correct string answer or array of words (joined as string)
  explanation: string; // Why this is correct, highlighting the grammar rule
  activeSentence?: string; // For active-to-passive transformation
  hints?: string[]; // Extra hints if the user gets stuck
}

export interface TopicProgress {
  topicId: TopicId;
  completedLesson: boolean;
  quizHighScore: number; // percentage (0-100)
  quizAttempts: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  unlockedAt?: string;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  topics: { [key in TopicId]?: TopicProgress };
  unlockedBadges: string[]; // Badge IDs
  xp: number; // Experience points
}
