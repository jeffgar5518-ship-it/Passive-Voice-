import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  RotateCcw, 
  Play, 
  Sparkles,
  Info,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Lesson, FormulaPart } from '../types';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onCompleteLesson: () => void;
  onStartQuiz: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onBack,
  onCompleteLesson,
  onStartQuiz
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  
  // Interactive Formula Builder State
  const [shuffledParts, setShuffledParts] = useState<FormulaPart[]>([]);
  const [selectedParts, setSelectedParts] = useState<FormulaPart[]>([]);
  const [formulaSuccess, setFormulaSuccess] = useState<boolean>(false);
  const [formulaError, setFormulaError] = useState<boolean>(false);

  // Initialize the formula builder
  useEffect(() => {
    // Scramble the parts of the formula
    const parts = [...lesson.formulaParts];
    const scrambled = [...parts].sort(() => Math.random() - 0.5);
    setShuffledParts(scrambled);
    setSelectedParts([]);
    setFormulaSuccess(false);
    setFormulaError(false);
  }, [lesson]);

  // Handle adding a part to the builder
  const handleSelectPart = (part: FormulaPart) => {
    if (formulaSuccess) return;
    setSelectedParts([...selectedParts, part]);
    setShuffledParts(shuffledParts.filter(p => p.id !== part.id));
    setFormulaError(false);
  };

  // Handle removing a part from the builder
  const handleDeselectPart = (part: FormulaPart) => {
    if (formulaSuccess) return;
    setShuffledParts([...shuffledParts, part]);
    setSelectedParts(selectedParts.filter(p => p.id !== part.id));
    setFormulaError(false);
  };

  // Reset the builder
  const handleResetFormula = () => {
    const scrambled = [...lesson.formulaParts].sort(() => Math.random() - 0.5);
    setShuffledParts(scrambled);
    setSelectedParts([]);
    setFormulaSuccess(false);
    setFormulaError(false);
  };

  // Check if assembled formula is correct
  const handleCheckFormula = () => {
    const correctIds = lesson.formulaParts.map(p => p.id);
    const selectedIds = selectedParts.map(p => p.id);

    // If lengths match and all ids in correct sequence
    const isCorrect = correctIds.length === selectedIds.length && 
                      correctIds.every((id, idx) => id === selectedIds[idx]);

    if (isCorrect) {
      setFormulaSuccess(true);
      setFormulaError(false);
      onCompleteLesson(); // Trigger lesson read completion
    } else {
      setFormulaError(true);
    }
  };

  // Quick helper to color code formula components
  const getTypeColor = (type: FormulaPart['type']) => {
    switch (type) {
      case 'subject': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'auxiliary': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'addition': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'verb': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'agent': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in" id="lesson-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4" id="lesson-header">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-indigo-600 font-bold flex items-center gap-2 transition cursor-pointer text-sm font-sans"
          id="btn-back-dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
          {lesson.id.replace('-', ' ')}
        </span>
      </div>

      {/* Hero card of the Lesson */}
      <div 
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4 relative overflow-hidden"
        id="lesson-hero-card"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/80 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shadow-xs">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 leading-tight">{lesson.title}</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">{lesson.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-4xl pt-2 font-sans">
          {lesson.explanation}
        </p>

        {/* Use Cases Box */}
        <div className="bg-indigo-50/45 border border-indigo-100/60 rounded-xl p-4 flex items-start gap-3 mt-4">
          <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest font-mono">¿Cuándo se usa?</h4>
            <p className="text-xs text-indigo-950 mt-1 leading-relaxed font-sans">
              {lesson.useCase}
            </p>
          </div>
        </div>
      </div>      {/* Side-by-Side Visual Inversion comparison */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-5" id="interactive-comparison">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono">Contraste Dinámico</span>
          <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>Inversión Estructural: Activa vs. Pasiva</span>
          </h2>
        </div>
        
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
          Pasa el cursor (o presiona) sobre los elementos de color para observar cómo cambia el rol gramatical entre el sujeto, el verbo y el objeto en la transformación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Active Voice Box */}
          <div className="border border-sky-200 rounded-2xl p-5 bg-sky-50/15 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-100/80 border border-sky-200 px-2 py-0.5 rounded">
                Voz Activa (Active Voice)
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Enfoque: Quién realiza</span>
            </div>

            <div className="py-2 text-center">
              <p className="text-base md:text-lg font-medium text-slate-850 leading-loose">
                {lesson.id === 'present-simple' ? (
                  <>
                    <span 
                      onMouseEnter={() => setHoveredComponent('subject')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'subject' ? 'bg-sky-200 text-sky-950 font-bold scale-102' : 'bg-sky-100/50 text-sky-900'
                      }`}
                    >
                      They
                    </span>{' '}
                    <span 
                      onMouseEnter={() => setHoveredComponent('verb')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'verb' ? 'bg-emerald-200 text-emerald-950 font-bold scale-102' : 'bg-emerald-100/50 text-emerald-900'
                      }`}
                    >
                      clean
                    </span>{' '}
                    <span 
                      onMouseEnter={() => setHoveredComponent('object')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'object' ? 'bg-pink-200 text-pink-950 font-bold scale-102' : 'bg-pink-100/50 text-pink-900'
                      }`}
                    >
                      the office
                    </span>{' '}
                    <span className="text-slate-400">every day.</span>
                  </>
                ) : (
                  <span className="text-slate-800 font-bold font-mono text-sm md:text-base">{lesson.activeExample}</span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-2 italic font-sans">"{lesson.activeExampleTranslation}"</p>
            </div>

            <div className="text-[11px] space-y-2 border-t border-sky-200/55 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Sujeto Activo:</span>
                <span className="font-mono text-sky-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Sujeto ejecutor (They)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Verbo Activo:</span>
                <span className="font-mono text-emerald-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Acción directa (clean)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Objeto Directo:</span>
                <span className="font-mono text-pink-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Recibe la acción (the office)</span>
              </div>
            </div>
          </div>

          {/* Passive Voice Box */}
          <div className="border border-pink-200 rounded-2xl p-5 bg-pink-50/15 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-pink-800 uppercase tracking-wider bg-pink-100/80 border border-pink-200 px-2 py-0.5 rounded">
                Voz Pasiva (Passive Voice)
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Enfoque: Qué recibe la acción</span>
            </div>

            <div className="py-2 text-center">
              <p className="text-base md:text-lg font-medium text-slate-850 leading-loose">
                {lesson.id === 'present-simple' ? (
                  <>
                    <span 
                      onMouseEnter={() => setHoveredComponent('object')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'object' ? 'bg-pink-200 text-pink-950 font-bold scale-102' : 'bg-pink-100/50 text-pink-900'
                      }`}
                    >
                      The office
                    </span>{' '}
                    <span 
                      onMouseEnter={() => setHoveredComponent('auxiliary')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'auxiliary' ? 'bg-amber-200 text-amber-950 font-bold scale-102' : 'bg-amber-100/50 text-amber-900'
                      }`}
                    >
                      is
                    </span>{' '}
                    <span 
                      onMouseEnter={() => setHoveredComponent('verb')}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className={`inline-block px-2 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-200 font-mono ${
                        hoveredComponent === 'verb' ? 'bg-emerald-200 text-emerald-950 font-bold scale-102' : 'bg-emerald-100/50 text-emerald-900'
                      }`}
                    >
                      cleaned
                    </span>{' '}
                    <span className="text-slate-400">every day.</span>
                  </>
                ) : (
                  <span className="text-slate-800 font-bold font-mono text-sm md:text-base">{lesson.passiveExample}</span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-2 italic font-sans">"{lesson.passiveExampleTranslation}"</p>
            </div>

            <div className="text-[11px] space-y-2 border-t border-pink-200/55 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Sujeto Paciente:</span>
                <span className="font-mono text-pink-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Recibe acción (The office)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Auxiliar Be:</span>
                <span className="font-mono text-amber-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Marca el tiempo (is)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Participio Pasado:</span>
                <span className="font-mono text-emerald-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded shadow-2xs">Verbo principal (cleaned)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Formula Builder Game */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6" id="formula-builder">
        <div className="flex justify-between items-center border-b border-slate-800/85 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] text-indigo-400 font-mono font-semibold uppercase tracking-widest">
              Grammar Puzzle
            </span>
            <h2 className="text-base md:text-lg font-display font-bold flex items-center gap-2 text-white">
              <RotateCcw className="w-5 h-5 text-indigo-400" />
              <span>Constructor de Fórmula Pasiva</span>
            </h2>
          </div>

          <button
            onClick={handleResetFormula}
            className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 bg-slate-800 hover:bg-slate-750 px-3 py-2 rounded-xl transition cursor-pointer"
            id="btn-reset-formula"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>

        <p className="text-slate-300 text-xs leading-relaxed max-w-3xl font-sans">
          Construye la fórmula correcta del <strong className="text-indigo-300 font-sans">{lesson.title}</strong> haciendo clic en las tarjetas en orden. Una vez completado, haz clic en <strong className="font-sans">Verificar Fórmula</strong> para desbloquear y registrar la lección.
        </p>

        {/* Drop Zone */}
        <div className="space-y-2">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
            Tu Fórmula Armada:
          </div>
          <div 
            className="min-h-[72px] bg-slate-950 rounded-2xl p-4 border-2 border-dashed border-slate-800 flex flex-wrap gap-2.5 items-center justify-center transition-all duration-200"
            id="formula-dropzone"
          >
            {selectedParts.length === 0 ? (
              <span className="text-slate-500 text-xs italic font-medium flex items-center gap-1.5 font-sans">
                <HelpCircle className="w-4 h-4 text-slate-650" /> Las tarjetas seleccionadas se ubicarán aquí...
              </span>
            ) : (
              selectedParts.map((part) => (
                <button
                  key={`selected-${part.id}`}
                  onClick={() => handleDeselectPart(part)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-95 ${getTypeColor(part.type)}`}
                  title="Haz clic para quitar de la fórmula"
                >
                  <span>{part.label}</span>
                  <span className="text-[9px] opacity-60">×</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Shuffled pool */}
        {shuffledParts.length > 0 && (
          <div className="space-y-2.5" id="formula-pool-container">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Tarjetas Disponibles:
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center py-2 bg-slate-950/45 p-3 rounded-2xl border border-slate-850" id="formula-pool">
              {shuffledParts.map((part) => (
                <button
                  key={`shuffled-${part.id}`}
                  onClick={() => handleSelectPart(part)}
                  className="px-4 py-2.5 rounded-xl border border-slate-750 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-white font-bold transition-all cursor-pointer shadow-sm"
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Row & Alerts */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800/85">
          <div className="w-full sm:w-auto">
            {formulaSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl px-4 py-3 text-xs flex items-center gap-2.5">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <div className="leading-relaxed font-sans">
                  <span className="font-bold">¡Fórmula Correcta!</span> Has registrado la teoría para este tiempo gramatical.
                </div>
              </div>
            )}

            {formulaError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl px-4 py-3 text-xs flex items-center gap-2.5 font-sans">
                <span className="font-bold">× Orden incorrecto.</span> Inténtalo de nuevo. Puedes pulsar sobre las tarjetas arriba para quitarlas.
              </div>
            )}
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto justify-end">
            {selectedParts.length > 0 && !formulaSuccess && (
              <button
                onClick={handleCheckFormula}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition cursor-pointer shadow-md"
                id="btn-verify-formula"
              >
                Verificar Fórmula
              </button>
            )}

            {formulaSuccess && (
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 cursor-pointer"
                id="btn-goto-quiz-success"
              >
                <span>¡Ir a la Práctica!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keys Takeaways & Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="lesson-details-grid">
        {/* Key Points */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Puntos Clave a Recordar
          </h3>
          <ul className="space-y-3 text-xs text-slate-600 font-sans" id="key-points-list">
            {lesson.keyPoints.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/15 border border-amber-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-800">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
              Consejo de Experto (Pro Tip)
            </h3>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
            {lesson.tips}
          </p>
        </div>
      </div>

      {/* Start Quiz Footer Button */}
      {!formulaSuccess && (
        <div className="flex justify-center pt-4" id="lesson-unverified-footer">
          <div className="text-center space-y-3">
            <p className="text-[11px] text-slate-400 font-sans">
              *Completa el rompecabezas del constructor de fórmula arriba para registrar tu lectura.
            </p>
            <button
              onClick={onStartQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 mx-auto text-xs cursor-pointer font-sans"
              id="btn-bypass-to-quiz"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Saltar al Examen Práctico</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
