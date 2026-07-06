import React from 'react';
import { 
  GraduationCap, 
  Flame, 
  Award, 
  Zap, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { UserProgress, TopicId } from '../types';
import { ALL_BADGES } from '../utils/progressStore';
import { lessons } from '../data/lessonsData';

interface DashboardProps {
  progress: UserProgress;
  onSelectTopic: (topicId: TopicId, mode: 'lesson' | 'quiz') => void;
  onSimulateStreak: () => void;
  onResetProgress: () => void;
  onOpenConverter: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onSelectTopic,
  onSimulateStreak,
  onResetProgress,
  onOpenConverter
}) => {
  // Compute metrics
  const totalTopics = lessons.length;
  const topicsList = Object.values(progress.topics) as any[];
  const completedLessons = topicsList.filter(t => t.completedLesson).length;
  const quizzesCompleted = topicsList.filter(t => t.quizHighScore > 0).length;
  const averageHighScore = quizzesCompleted > 0 
    ? Math.round(topicsList.reduce((sum, t) => sum + t.quizHighScore, 0) / quizzesCompleted) 
    : 0;

  // Calculate overall completion percent (lessons read count + tests count with 80%+) / (2 * totalTopics)
  const highScoresCount = topicsList.filter(t => t.quizHighScore >= 80).length;
  const completionPercentage = Math.round(
    ((completedLessons + highScoresCount) / (totalTopics * 2)) * 100
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in" id="dashboard-container">
      
      {/* Top Bento Grid Row: Hero Intro + Quick Summary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-top-bento-row">
        
        {/* Main Hero Bento Card (col-span-8) */}
        <div 
          className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px] border border-slate-850"
          id="dashboard-hero"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
  
          <div className="relative z-10 space-y-3">
            <span className="inline-block bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold">
              Curso de Voz Pasiva en Inglés
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white leading-tight">
              Domina la Voz Pasiva
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed">
              Aprende de manera visual e interactiva cómo reestructurar oraciones en los 9 tiempos verbales más importantes.
            </p>
          </div>
  
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-medium">
              Estructuras gramaticales interactivas y retroalimentación inmediata.
            </span>
            <button
              onClick={onOpenConverter}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 cursor-pointer"
              id="btn-open-converter"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Analizador y Conversor</span>
            </button>
          </div>
        </div>

        {/* Overall Mastery Bento Card (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
              Progreso General del Curso
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-display font-extrabold text-slate-900 font-mono tracking-tight">
                {completionPercentage}%
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                Mastery
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Has completado <strong className="text-slate-800 font-semibold">{completedLessons}</strong> lecciones teóricas y aprobado <strong className="text-slate-800 font-semibold">{highScoresCount}</strong> exámenes del plan.
            </p>
          </div>
        </div>

      </div>

      {/* Primary Stats Bento Grid (4 Cards Row) */}
      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        id="dashboard-stats-grid"
      >
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-indigo-100 transition duration-200">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lecciones</div>
            <div className="text-xl font-display font-bold text-slate-900 font-mono">{completedLessons} / {totalTopics}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-amber-100 transition duration-200">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Flame className="w-5 h-5 fill-amber-500/20" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Racha</div>
            <div className="text-xl font-display font-bold text-slate-900 font-mono flex items-baseline gap-1">
              {progress.streak} <span className="text-xs text-slate-500 font-sans font-medium">{progress.streak === 1 ? 'día' : 'días'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-emerald-100 transition duration-200">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Zap className="w-5 h-5 fill-emerald-500/20" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Puntos XP</div>
            <div className="text-xl font-display font-bold text-slate-900 font-mono">{progress.xp} XP</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-pink-100 transition duration-200">
          <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logros</div>
            <div className="text-xl font-display font-bold text-slate-900 font-mono">
              {progress.unlockedBadges.length} / {ALL_BADGES.length}
            </div>
          </div>
        </div>
      </div>
 
      {/* Main Core Columns: Grid Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-main-grid">
        
        {/* Left Column: Curriculum Plan (col-span-8) */}
        <div className="lg:col-span-8 space-y-4" id="curriculum-container">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Plan de Estudio (9 Tiempos Verbales)</span>
            </h2>
            <span className="text-xs font-mono font-medium text-slate-400">
              Teoría y Examen
            </span>
          </div>
  
          <div className="grid gap-3" id="curriculum-list">
            {lessons.map((lesson, idx) => {
              const topicProgress = progress.topics[lesson.id];
              const completedLsn = !!topicProgress?.completedLesson;
              const quizScore = topicProgress?.quizHighScore || 0;
              const isPerfect = quizScore === 100;
              const hasPassed = quizScore >= 80;
  
              return (
                <div 
                  key={lesson.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden group"
                  id={`topic-card-${lesson.id}`}
                >
                  {/* Color stripe code indicator on the left border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    isPerfect ? 'bg-emerald-500' : hasPassed ? 'bg-indigo-600' : quizScore > 0 ? 'bg-amber-500' : 'bg-slate-200'
                  }`}></div>
  
                  <div className="pl-3 space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-400">
                        0{idx + 1}.
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors font-display">
                        {lesson.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {lesson.subtitle}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-1 bg-slate-50 border border-slate-100 rounded px-2 py-0.5 w-fit">
                      {lesson.formula}
                    </p>
                  </div>
  
                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto mt-2 md:mt-0">
                    <button
                      onClick={() => onSelectTopic(lesson.id, 'lesson')}
                      className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        completedLsn 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-150 shadow-xs' 
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100'
                      }`}
                      id={`btn-lesson-${lesson.id}`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${completedLsn ? 'text-emerald-500' : 'text-indigo-400'}`} />
                      <span>Teoría</span>
                    </button>
  
                    <button
                      onClick={() => onSelectTopic(lesson.id, 'quiz')}
                      className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        quizScore > 0 
                          ? quizScore >= 80 
                            ? 'bg-indigo-600 text-white border border-indigo-600 shadow-sm shadow-indigo-600/10'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                      id={`btn-quiz-${lesson.id}`}
                    >
                      <Zap className={`w-3.5 h-3.5 ${quizScore >= 80 ? 'text-emerald-300 fill-emerald-300' : quizScore > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
                      <span>{quizScore > 0 ? `${quizScore}%` : 'Examen'}</span>
                    </button>
  
                    <ChevronRight className="w-4 h-4 text-slate-300 hidden md:block group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Right Columns: Achievements and Simulators (col-span-4) */}
        <div className="lg:col-span-4 space-y-6" id="sidebar-container">
          
          {/* Achievement Badges Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm" id="badges-box">
            <h2 className="text-base font-display font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Medallas de Logros</span>
            </h2>
  
            <div className="grid grid-cols-1 gap-2.5" id="badges-list">
              {ALL_BADGES.map(badge => {
                const isUnlocked = progress.unlockedBadges.includes(badge.id);
  
                return (
                  <div 
                    key={badge.id}
                    className={`p-3.5 rounded-xl border flex items-center gap-3.5 transition-all duration-200 ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-amber-50/75 to-orange-50/25 border-amber-200 shadow-xs' 
                        : 'bg-slate-50/50 border-slate-100 grayscale opacity-40'
                    }`}
                    id={`badge-card-${badge.id}`}
                  >
                    <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-amber-100 text-amber-700 shadow-xs' : 'bg-slate-200 text-slate-400'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display">{badge.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          {/* Sandbox & Tools Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4" id="sandbox-box">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Simulador de Entorno
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Utiliza estos controles rápidos para realizar pruebas de racha de estudio o restablecer el estado completo.
              </p>
            </div>
  
            <div className="flex flex-col gap-2 pt-1" id="sandbox-actions">
              <button
                onClick={onSimulateStreak}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                id="btn-simulate-streak"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Simular Racha (Estudio +1 día)</span>
              </button>
  
              <button
                onClick={onResetProgress}
                className="w-full bg-rose-50/60 hover:bg-rose-50 text-rose-700 border border-rose-100 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                id="btn-reset-progress"
              >
                <RefreshCw className="w-4 h-4 text-rose-500" />
                <span>Restablecer Todo</span>
              </button>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
};
