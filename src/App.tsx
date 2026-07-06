import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Flame, 
  Zap, 
  Award, 
  BookOpen, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { TopicId, UserProgress } from './types';
import { progressStore } from './utils/progressStore';
import { lessons } from './data/lessonsData';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { ExerciseView } from './components/ExerciseView';
import { ActivePassiveConverter } from './components/ActivePassiveConverter';

export default function App() {
  const [screen, setScreen] = useState<'dashboard' | 'lesson' | 'quiz' | 'converter'>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and load user progress
  useEffect(() => {
    const userProgress = progressStore.getProgress();
    setProgress(userProgress);
  }, []);

  // Display helpful toast notifications
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  if (!progress) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <RefreshIcon className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Cargando tu progreso...</p>
        </div>
      </div>
    );
  }

  // Find active selected lesson data
  const selectedLesson = lessons.find(l => l.id === selectedTopicId);

  // Handle choosing a topic from Dashboard
  const handleSelectTopic = (topicId: TopicId, mode: 'lesson' | 'quiz') => {
    setSelectedTopicId(topicId);
    setScreen(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle lesson reading complete
  const handleCompleteLesson = () => {
    if (!selectedTopicId) return;
    const result = progressStore.recordActivity(selectedTopicId, true, 0);
    setProgress(result.progress);
    
    // Notify about XP and any potential badge unlocked
    showToast("¡Lección completada! +50 XP obtenidos");
    if (result.newlyUnlockedBadges.length > 0) {
      result.newlyUnlockedBadges.forEach(badge => {
        showToast(`🏆 ¡Logro desbloqueado: ${badge.name}!`);
      });
    }
  };

  // Handle quiz completed score
  const handleCompleteQuiz = (score: number) => {
    if (!selectedTopicId) return;
    const result = progressStore.recordActivity(selectedTopicId, false, score);
    setProgress(result.progress);

    const gainedXp = Math.round(score * 2.5);
    showToast(`¡Examen finalizado! Puntuación: ${score}%. +${gainedXp} XP obtenidos.`);
    
    if (result.newlyUnlockedBadges.length > 0) {
      result.newlyUnlockedBadges.forEach(badge => {
        showToast(`🏆 ¡Logro desbloqueado: ${badge.name}!`);
      });
    }
  };

  // Simulation handlers
  const handleSimulateStreak = () => {
    const updated = progressStore.simulateStreakBoost();
    setProgress(updated);
    showToast(`🔥 Racha incrementada a ${updated.streak} días.`);
  };

  const handleResetProgress = () => {
    if (confirm("¿Estás seguro de que deseas restablecer todo tu progreso de estudio? Esto eliminará tus medallas y puntuaciones de examen.")) {
      const reseted = progressStore.resetProgress();
      setProgress(reseted);
      setScreen('dashboard');
      showToast("🔄 Todo tu progreso ha sido restablecido de forma segura.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/65 font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 pb-16">
      
      {/* Universal Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => {
              setScreen('dashboard');
              setSelectedTopicId(null);
            }}
            className="flex items-center gap-2 text-left cursor-pointer group"
            id="brand-logo-btn"
          >
            <div className="bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white p-2 rounded-xl group-hover:scale-105 transition shadow-md shadow-indigo-600/15">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 tracking-tight block">Voz Pasiva</span>
              <span className="text-[10px] text-indigo-600 font-mono font-bold tracking-widest uppercase block -mt-1">Academy</span>
            </div>
          </button>

          {/* Real-time stats pills */}
          <div className="flex items-center gap-2 sm:gap-4" id="header-stats-panel">
            {/* Streak Counter */}
            <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-sm">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="font-mono">{progress.streak}d</span>
            </div>

            {/* XP counter */}
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-sm">
              <Zap className="w-4 h-4 text-indigo-500 fill-indigo-100" />
              <span className="font-mono">{progress.xp} XP</span>
            </div>

            {/* Converter Quick shortcut */}
            {screen !== 'converter' && (
              <button
                onClick={() => {
                  setScreen('converter');
                  setSelectedTopicId(null);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-1 shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Conversor</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Primary Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" id="main-content-area">
        
        {/* Toast Notification HUD */}
        {toastMessage && (
          <div 
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold flex items-center gap-3 animate-slide-in"
            id="toast-notification"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dynamic Screen Routing */}
        {screen === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectTopic={handleSelectTopic}
            onSimulateStreak={handleSimulateStreak}
            onResetProgress={handleResetProgress}
            onOpenConverter={() => {
              setScreen('converter');
              setSelectedTopicId(null);
            }}
          />
        )}

        {screen === 'lesson' && selectedLesson && (
          <LessonView
            lesson={selectedLesson}
            onBack={() => {
              setScreen('dashboard');
              setSelectedTopicId(null);
            }}
            onCompleteLesson={handleCompleteLesson}
            onStartQuiz={() => setScreen('quiz')}
          />
        )}

        {screen === 'quiz' && selectedTopicId && (
          <ExerciseView
            topicId={selectedTopicId}
            title={selectedLesson?.title || ''}
            onBack={() => {
              setScreen('dashboard');
              setSelectedTopicId(null);
            }}
            onCompleteQuiz={handleCompleteQuiz}
            onReadLesson={() => setScreen('lesson')}
          />
        )}

        {screen === 'converter' && (
          <ActivePassiveConverter
            onBack={() => {
              setScreen('dashboard');
            }}
          />
        )}

      </main>
    </div>
  );
}

// Simple internal icon component to prevent extra imports
function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M16 3h5v5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 21H3v-5" />
    </svg>
  );
}
