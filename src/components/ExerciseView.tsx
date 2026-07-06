import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Award, 
  RefreshCw,
  Zap,
  BookOpen
} from 'lucide-react';
import { Exercise, TopicId } from '../types';
import { exercises } from '../data/exercisesData';

interface ExerciseViewProps {
  topicId: TopicId;
  title: string;
  onBack: () => void;
  onCompleteQuiz: (score: number) => void;
  onReadLesson: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  topicId,
  title,
  onBack,
  onCompleteQuiz,
  onReadLesson
}) => {
  // Get exercises for this topic
  const topicExercises = exercises.filter(e => e.topicId === topicId);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Word Reordering state
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  
  // Feedback state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Quiz overall score
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentExercise: Exercise | undefined = topicExercises[currentIndex];

  // Initialize current exercise
  useEffect(() => {
    if (!currentExercise) return;

    setUserAnswer('');
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);

    if (currentExercise.type === 'reorder') {
      // Split the correct answer into words, filter spaces, and scramble
      const words = currentExercise.correctAnswer.split(' ').filter(w => w.length > 0);
      const scrambled = [...words].sort(() => Math.random() - 0.5);
      setShuffledWords(scrambled);
      setAssembledWords([]);
    }
  }, [currentIndex, topicId]);

  if (!currentExercise) {
    return (
      <div className="bg-white p-8 rounded-2xl border text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold">No hay ejercicios para este tema todavía.</h2>
        <button onClick={onBack} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Volver al Dashboard
        </button>
      </div>
    );
  }

  // Handle word selection in reorder
  const handleSelectWord = (word: string, index: number) => {
    if (isSubmitted) return;
    setAssembledWords([...assembledWords, word]);
    // Remove exactly one instance of that word at that index
    setShuffledWords(shuffledWords.filter((_, idx) => idx !== index));
  };

  // Handle word removal in reorder
  const handleDeselectWord = (word: string, index: number) => {
    if (isSubmitted) return;
    setShuffledWords([...shuffledWords, word]);
    setAssembledWords(assembledWords.filter((_, idx) => idx !== index));
  };

  // Standard string comparison helper to ignore tiny casing/punctuation errors
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '') // remove punctuation
      .replace(/\s+/g, ' ') // collapse multi-spaces
      .trim();
  };

  // Handle submission
  const handleSubmit = () => {
    if (isSubmitted) return;

    let answeredCorrectly = false;
    let finalAnswer = '';

    if (currentExercise.type === 'multiple-choice') {
      answeredCorrectly = selectedOption === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'fill-blanks') {
      finalAnswer = userAnswer.trim();
      answeredCorrectly = normalizeText(finalAnswer) === normalizeText(currentExercise.correctAnswer);
    } else if (currentExercise.type === 'reorder') {
      finalAnswer = assembledWords.join(' ');
      answeredCorrectly = normalizeText(finalAnswer) === normalizeText(currentExercise.correctAnswer);
    } else if (currentExercise.type === 'active-to-passive') {
      finalAnswer = userAnswer.trim();
      answeredCorrectly = normalizeText(finalAnswer) === normalizeText(currentExercise.correctAnswer);
    }

    setIsCorrect(answeredCorrectly);
    setIsSubmitted(true);
    if (answeredCorrectly) {
      setCorrectCount(prev => prev + 1);
    }
  };

  // Go to next question or end quiz
  const handleNext = () => {
    if (currentIndex < topicExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed!
      setQuizFinished(true);
      const scorePercentage = Math.round(( (correctCount + (isCorrect ? 1 : 0)) / topicExercises.length ) * 100);
      onCompleteQuiz(scorePercentage);
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setQuizFinished(false);
    setUserAnswer('');
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const scorePercentage = Math.round((correctCount / topicExercises.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in" id="quiz-view-container">
      
      {/* Quiz Top bar */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-3" id="quiz-topbar">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-indigo-600 font-bold flex items-center gap-1.5 transition text-xs font-sans cursor-pointer"
          id="btn-quiz-back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Abandonar Examen</span>
        </button>

        {!quizFinished && (
          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
            Pregunta {currentIndex + 1} de {topicExercises.length}
          </div>
        )}
      </div>

      {/* Main Container */}
      {!quizFinished ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          
          {/* Progress Indicator Dots */}
          <div className="flex gap-1.5" id="quiz-progress-dots">
            {topicExercises.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  idx < currentIndex 
                    ? 'bg-indigo-600 shadow-2xs' 
                    : idx === currentIndex 
                      ? 'bg-indigo-400 ring-4 ring-indigo-50' 
                      : 'bg-slate-100'
                }`}
              />
            ))}
          </div>

          {/* Prompt & Instruction */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">
              Evaluación Práctica
            </span>
            <h3 className="text-base md:text-lg font-display font-extrabold text-slate-900 leading-tight">
              {currentExercise.instruction}
            </h3>
          </div>

          {/* Active sentence cue if applicable */}
          {currentExercise.activeSentence && (
            <div className="bg-indigo-50/45 border border-indigo-100/60 rounded-xl p-4 space-y-1">
              <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-widest font-mono">
                Oración Activa de Referencia:
              </span>
              <p className="text-xs md:text-sm font-bold text-slate-850 leading-relaxed font-sans">
                "{currentExercise.activeSentence}"
              </p>
            </div>
          )}

          {/* The Question Text */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 text-center shadow-2xs">
            <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed font-mono">
              {currentExercise.question}
            </p>
          </div>

          {/* Inputs based on type */}
          <div className="pt-1" id="quiz-input-field">
            
            {/* MULTIPLE CHOICE */}
            {currentExercise.type === 'multiple-choice' && currentExercise.options && (
              <div className="grid gap-3" id="options-grid">
                {currentExercise.options.map((option, oIdx) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === currentExercise.correctAnswer;
                  
                  let optionStyle = "border-slate-200 hover:bg-slate-50 hover:border-slate-350 bg-white";
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                    } else if (isSelected) {
                      optionStyle = "bg-rose-50 border-rose-300 text-rose-900 font-bold";
                    } else {
                      optionStyle = "bg-white border-slate-100 opacity-55";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-indigo-50/40 border-indigo-500 text-indigo-900 ring-2 ring-indigo-50/50 font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 text-xs md:text-sm font-medium transition cursor-pointer flex justify-between items-center ${optionStyle}`}
                    >
                      <span className="font-sans">{option}</span>
                      {isSubmitted && isCorrectAnswer && (
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrectAnswer && (
                        <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* FILL IN THE BLANKS */}
            {currentExercise.type === 'fill-blanks' && (
              <div className="space-y-2">
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe la respuesta aquí..."
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-indigo-500 focus:outline-none font-mono tracking-wide placeholder-slate-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswer.trim() !== '') {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            )}

            {/* REORDER WORDS */}
            {currentExercise.type === 'reorder' && (
              <div className="space-y-4">
                {/* Visual Assembly Box */}
                <div className="min-h-[72px] bg-slate-50 rounded-2xl p-4 border-2 border-dashed border-slate-200 flex flex-wrap gap-2 items-center justify-center">
                  {assembledWords.length === 0 ? (
                    <span className="text-xs text-slate-400 italic font-medium font-sans">
                      Pulsa sobre las palabras abajo para ordenarlas...
                    </span>
                  ) : (
                    assembledWords.map((word, idx) => (
                      <button
                        key={`assembled-${idx}`}
                        disabled={isSubmitted}
                        onClick={() => handleDeselectWord(word, idx)}
                        className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold rounded-lg transition hover:scale-95 cursor-pointer font-sans"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>

                {/* Scrambled Pool */}
                {shuffledWords.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center py-2 border-t border-slate-100 mt-2">
                    {shuffledWords.map((word, idx) => (
                      <button
                        key={`scrambled-${idx}`}
                        disabled={isSubmitted}
                        onClick={() => handleSelectWord(word, idx)}
                        className="px-3.5 py-2 bg-white border border-slate-200 text-xs text-slate-700 font-bold rounded-xl transition hover:bg-slate-50 active:scale-95 cursor-pointer shadow-2xs font-sans"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ACTIVE TO PASSIVE */}
            {currentExercise.type === 'active-to-passive' && (
              <div className="space-y-2.5">
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe la oración pasiva completa correspondiente..."
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-indigo-500 focus:outline-none font-medium tracking-wide placeholder-slate-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswer.trim() !== '') {
                      handleSubmit();
                    }
                  }}
                />
                <span className="text-[10px] text-slate-400 font-medium block leading-relaxed font-sans">
                  Consejo: Cuida la concordancia del verbo "be" (singular/plural) y el uso correcto del participio pasado.
                </span>
              </div>
            )}

          </div>

          {/* Hint Trigger */}
          {currentExercise.hints && currentExercise.hints.length > 0 && !isSubmitted && (
            <div className="flex justify-end pt-1" id="hint-trigger-container">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer font-sans"
                id="btn-toggle-hint"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
              </button>
            </div>
          )}

          {/* Show hints text if active */}
          {showHint && currentExercise.hints && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1.5 animate-slide-in">
              <span className="font-bold flex items-center gap-1.5 font-display text-amber-900">
                <span>💡 Pista del tutor</span>
              </span>
              <ul className="list-disc pl-4 space-y-1 text-amber-900/90 font-sans leading-relaxed">
                {currentExercise.hints.map((hint, hIdx) => (
                  <li key={hIdx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Feedback Area */}
          {isSubmitted && (
            <div 
              className={`rounded-2xl p-5 border-2 flex gap-4 animate-slide-in ${
                isCorrect 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                  : 'bg-rose-50/70 border-rose-200 text-rose-950'
              }`}
              id="quiz-feedback-box"
            >
              <div className={`p-2 rounded-xl h-fit ${isCorrect ? 'bg-emerald-100 text-emerald-700 shadow-2xs' : 'bg-rose-100 text-rose-700 shadow-2xs'}`}>
                {isCorrect ? (
                  <CheckCircle className="w-5.5 h-5.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5.5 h-5.5 shrink-0" />
                )}
              </div>
              
              <div className="space-y-2 flex-1">
                <h4 className="text-xs font-bold uppercase tracking-widest font-mono">
                  {isCorrect ? '¡Excelente Trabajo!' : 'Casi, pero no del todo'}
                </h4>
                
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold block mb-1 text-slate-500 font-sans">
                    Respuesta Correcta:
                  </span>
                  <span className="font-mono text-xs md:text-sm font-bold block bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl w-fit text-slate-900">
                    {currentExercise.correctAnswer}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed pt-2.5 border-t border-slate-150 font-sans">
                  {currentExercise.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="flex justify-end pt-3 border-t border-slate-150">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={
                  (currentExercise.type === 'multiple-choice' && !selectedOption) ||
                  ((currentExercise.type === 'fill-blanks' || currentExercise.type === 'active-to-passive') && userAnswer.trim() === '') ||
                  (currentExercise.type === 'reorder' && assembledWords.length === 0)
                }
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-xs cursor-pointer"
                id="btn-quiz-submit"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer font-sans"
                id="btn-quiz-next"
              >
                <span>{currentIndex < topicExercises.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Examen'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        
        // QUIZ FINISHED RESULTS SCREEN
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-8 animate-fade-in" id="quiz-results">
          
          <div className="space-y-3">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xs border border-amber-200">
              <Award className="w-9 h-9" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              {scorePercentage >= 80 ? '¡Felicitaciones!' : 'Sigue Practicando'}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-sm mx-auto font-sans leading-relaxed">
              Has completado el examen práctico de <strong className="text-indigo-600 font-bold font-sans">{title}</strong>.
            </p>
          </div>

          {/* Statistics Box - Styled as Bento Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto bg-slate-50 p-4.5 rounded-2xl border border-slate-200" id="quiz-results-stats">
            <div className="text-center space-y-1">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">Respuestas</div>
              <div className="text-sm md:text-base font-bold text-slate-800 font-mono leading-none">
                {correctCount} / {topicExercises.length}
              </div>
            </div>

            <div className="text-center space-y-1 border-x border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">Precisión</div>
              <div className={`text-sm md:text-base font-bold font-mono leading-none ${scorePercentage >= 80 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {scorePercentage}%
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">Puntos XP</div>
              <div className="text-sm md:text-base font-bold text-indigo-600 font-mono flex items-center justify-center gap-0.5 leading-none">
                <Zap className="w-3.5 h-3.5 fill-indigo-100" />
                <span>+{Math.round(scorePercentage * 2.5)} XP</span>
              </div>
            </div>
          </div>

          {/* Feedback recommendation */}
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-sans">
            {scorePercentage === 100 
              ? '¡Excelente puntuación! Tienes un dominio total sobre este tiempo en voz pasiva.' 
              : scorePercentage >= 80
                ? '¡Aprobado con creces! Conoces muy bien la estructura y los auxiliares.'
                : 'Casi lo consigues. Te recomendamos volver a repasar la teoría y reintentar para mejorar tu racha y puntuación.'
            }
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
            <button
              onClick={handleRestart}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer font-sans"
              id="btn-quiz-retry"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Repetir Examen</span>
            </button>

            {scorePercentage < 80 && (
              <button
                onClick={onReadLesson}
                className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer font-sans"
                id="btn-quiz-review-lesson"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Repasar Teoría</span>
              </button>
            )}

            <button
              onClick={onBack}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-xs font-bold transition shadow-xs cursor-pointer font-sans"
              id="btn-quiz-finish-back"
            >
              Regresar al Dashboard
            </button>
          </div>

        </div>

      )}
    </div>
  );
};
