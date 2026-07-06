import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';
import { TopicId } from '../types';

interface TemplateSentence {
  tense: string;
  topicId: TopicId;
  active: string;
  activeSubject: string;
  activeVerb: string;
  activeObject: string;
  activeComplement: string;
  passive: string;
  passiveSubject: string;
  passiveAux: string;
  passiveVerb: string;
  passiveAgent: string;
  passiveComplement: string;
  explanation: string;
}

const CONVERTER_TEMPLATES: TemplateSentence[] = [
  {
    tense: 'Presente Simple',
    topicId: 'present-simple',
    active: 'The cat catches mice.',
    activeSubject: 'The cat',
    activeVerb: 'catches',
    activeObject: 'mice',
    activeComplement: '',
    passive: 'Mice are caught by the cat.',
    passiveSubject: 'Mice',
    passiveAux: 'are',
    passiveVerb: 'caught',
    passiveAgent: 'by the cat',
    passiveComplement: '',
    explanation: 'Como "mice" es plural (ratones), usamos el verbo be en plural ("are") y el participio irregular "caught".'
  },
  {
    tense: 'Presente Continuo',
    topicId: 'present-continuous',
    active: 'The chef is preparing the lunch.',
    activeSubject: 'The chef',
    activeVerb: 'is preparing',
    activeObject: 'the lunch',
    activeComplement: '',
    passive: 'The lunch is being prepared by the chef.',
    passiveSubject: 'The lunch',
    passiveAux: 'is being',
    passiveVerb: 'prepared',
    passiveAgent: 'by the chef',
    passiveComplement: '',
    explanation: 'Agregamos "being" después de "is" para conservar el aspecto continuo, seguido del participio regular "prepared".'
  },
  {
    tense: 'Pasado Simple',
    topicId: 'past-simple',
    active: 'Shakespeare wrote Hamlet.',
    activeSubject: 'Shakespeare',
    activeVerb: 'wrote',
    activeObject: 'Hamlet',
    activeComplement: '',
    passive: 'Hamlet was written by Shakespeare.',
    passiveSubject: 'Hamlet',
    passiveAux: 'was',
    passiveVerb: 'written',
    passiveAgent: 'by Shakespeare',
    passiveComplement: '',
    explanation: 'Como Hamlet es singular y el suceso es histórico, usamos "was" y el participio irregular "written" (de write).'
  },
  {
    tense: 'Pasado Continuo',
    topicId: 'past-continuous',
    active: 'They were painting the mural.',
    activeSubject: 'They',
    activeVerb: 'were painting',
    activeObject: 'the mural',
    activeComplement: '',
    passive: 'The mural was being painted by them.',
    passiveSubject: 'The mural',
    passiveAux: 'was being',
    passiveVerb: 'painted',
    passiveAgent: 'by them',
    passiveComplement: '',
    explanation: 'El objeto "the mural" es singular, por lo que cambiamos "were" a "was being", y convertimos el pronombre "They" a pronombre objeto "them" precedido de "by".'
  },
  {
    tense: 'Presente Perfecto',
    topicId: 'present-perfect',
    active: 'She has cleaned the windows.',
    activeSubject: 'She',
    activeVerb: 'has cleaned',
    activeObject: 'the windows',
    activeComplement: '',
    passive: 'The windows have been cleaned by her.',
    passiveSubject: 'The windows',
    passiveAux: 'have been',
    passiveVerb: 'cleaned',
    passiveAgent: 'by her',
    passiveComplement: '',
    explanation: '"The windows" es plural, así que cambiamos "has" por "have been". Convertimos el pronombre sujeto "She" a pronombre objeto "her".'
  },
  {
    tense: 'Futuro Simple',
    topicId: 'future-simple',
    active: 'Scientists will discover a cure.',
    activeSubject: 'Scientists',
    activeVerb: 'will discover',
    activeObject: 'a cure',
    activeComplement: '',
    passive: 'A cure will be discovered by scientists.',
    passiveSubject: 'A cure',
    passiveAux: 'will be',
    passiveVerb: 'discovered',
    passiveAgent: 'by scientists',
    passiveComplement: '',
    explanation: 'Sencillamente colocamos "will be" seguido del participio "discovered". El auxiliar no varía para singular o plural.'
  },
  {
    tense: 'Futuro Perfecto',
    topicId: 'future-perfect',
    active: 'He will have completed the report.',
    activeSubject: 'He',
    activeVerb: 'will have completed',
    activeObject: 'the report',
    activeComplement: '',
    passive: 'The report will have been completed by him.',
    passiveSubject: 'The report',
    passiveAux: 'will have been',
    passiveVerb: 'completed',
    passiveAgent: 'by him',
    passiveComplement: '',
    explanation: 'Introducimos el auxiliar triple "will have been" antes del participio "completed", y transformamos "He" en "him".'
  },
  {
    tense: 'Infinitivos',
    topicId: 'infinitives',
    active: 'I want to clean the room.',
    activeSubject: 'I (want)',
    activeVerb: 'to clean',
    activeObject: 'the room',
    activeComplement: '',
    passive: 'I want the room to be cleaned.',
    passiveSubject: 'the room',
    passiveAux: 'to be',
    passiveVerb: 'cleaned',
    passiveAgent: '',
    passiveComplement: '',
    explanation: 'Mantenemos el deseo personal "I want", e invertimos el infinitivo "to clean the room" en "the room to be cleaned". Se suele omitir "by me" por redundancia.'
  },
  {
    tense: 'Verbos Modales',
    topicId: 'modals',
    active: 'We should protect the animals.',
    activeSubject: 'We',
    activeVerb: 'should protect',
    activeObject: 'the animals',
    activeComplement: '',
    passive: 'The animals should be protected by us.',
    passiveSubject: 'The animals',
    passiveAux: 'should be',
    passiveVerb: 'protected',
    passiveAgent: 'by us',
    passiveComplement: '',
    explanation: 'Colocamos el verbo modal "should" seguido de "be" en forma infinitiva pura, agregando el participio regular "protected" y el agente "by us".'
  }
];

export const ActivePassiveConverter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customActiveSentence, setCustomActiveSentence] = useState<string>('');
  const [customSubmitted, setCustomSubmitted] = useState<boolean>(false);

  const currentTemplate = CONVERTER_TEMPLATES[selectedTemplateIndex];

  // Custom simulator details helper
  const handleCustomAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customActiveSentence.trim()) return;
    setCustomSubmitted(true);
    setCurrentStep(1);
  };

  const handleResetCustom = () => {
    setCustomActiveSentence('');
    setCustomSubmitted(false);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="converter-view-container">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" id="converter-header">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-2 transition text-sm"
          id="btn-converter-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Analizador Visual Paso a Paso</span>
        </span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="converter-grid">
        
        {/* Left Column: Selector & Custom input */}
        <div className="space-y-6" id="converter-sidebar">
          
          {/* Preset Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-display font-bold text-slate-850">Elige un Tiempo Verbal</h3>
              <p className="text-[11px] text-slate-400 font-sans">Selecciona una oración predefinida para estudiar el mapeo estructural.</p>
            </div>

            <div className="grid grid-cols-1 gap-1.5" id="preset-list">
              {CONVERTER_TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTemplateIndex(idx);
                    setCustomSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition duration-150 cursor-pointer ${
                    selectedTemplateIndex === idx && !customSubmitted
                      ? 'bg-indigo-50/45 border-indigo-400 text-indigo-900 shadow-2xs font-bold'
                      : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-sans">{tpl.tense}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded-md text-slate-500 font-mono font-bold uppercase">
                      {tpl.topicId.split('-')[0]}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono line-clamp-1">
                    {tpl.active}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Smart explanation of current template */}
          {!customSubmitted && (
            <div className="bg-indigo-50/45 border border-indigo-100/60 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>Análisis Gramatical</span>
              </h4>
              <p className="text-xs text-indigo-950/85 leading-relaxed font-sans">
                {currentTemplate.explanation}
              </p>
              <div className="text-[10px] text-indigo-700 font-bold bg-white p-2.5 rounded-xl border border-indigo-100/60 flex items-center gap-1.5 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Estructura: {currentTemplate.passiveSubject} + {currentTemplate.passiveAux} + {currentTemplate.passiveVerb}</span>
              </div>
            </div>
          )}

          {/* Sandbox Input sentence analyser */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Escribe tu Oración (Sandbox)
              </h3>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">Prueba ingresar tu propia oración activa para dividir sus componentes principales.</p>
            </div>

            <form onSubmit={handleCustomAnalyzeSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Ej: He paints a landscape..."
                value={customActiveSentence}
                onChange={(e) => setCustomActiveSentence(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none font-medium placeholder-slate-400 font-sans"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!customActiveSentence.trim()}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer font-sans shadow-2xs"
                >
                  Analizar Oración
                </button>

                {customSubmitted && (
                  <button
                    type="button"
                    onClick={handleResetCustom}
                    className="p-2.5 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-600 cursor-pointer"
                    title="Limpiar"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>

        {/* Right 2 Columns: Parsing Stage */}
        <div className="lg:col-span-2 space-y-6" id="converter-parsing-stage">
          
          {/* Main Visual Comparison Frame */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            
            <div className="border-b border-slate-105 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base md:text-lg font-display font-bold text-slate-900">
                  {customSubmitted ? 'Sandbox: Tu Oración de Prueba' : `Análisis: ${currentTemplate.tense}`}
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Mapeo dinámico e identificación de roles gramaticales.</p>
              </div>

              {/* Steps control dots */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                {[1, 2, 3, 4].map(step => (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition cursor-pointer ${
                      currentStep === step 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'hover:bg-slate-250 text-slate-650'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* If it is a custom sandbox sentence */}
            {customSubmitted ? (
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 text-center shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Tu Oración Activa:</span>
                  <p className="text-base font-bold text-slate-800 mt-1 font-mono">"{customActiveSentence}"</p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex gap-3.5 text-emerald-950 animate-slide-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="text-xs space-y-1.5 font-sans leading-relaxed">
                    <span className="font-bold block font-display text-emerald-900 text-sm">Pauta de Guía de Voz Pasiva</span>
                    <p className="text-emerald-900/90">Para transformarla, sigue las guías e instrucciones paso a paso detalladas a continuación utilizando como referencia los botones <strong className="font-mono">1, 2, 3 y 4</strong> de arriba.</p>
                  </div>
                </div>
              </div>
            ) : (
              // TEMPLATE FULL INTERACTIVE CONVERTER (WONDERFUL GRAPHIC ARROWS)
              <div className="space-y-8 py-4">
                
                {/* Active Sentence Row */}
                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-bold text-sky-800 uppercase tracking-widest bg-sky-50 border border-sky-100/75 px-3 py-1 rounded-full font-sans">
                    Oración Activa
                  </span>
                  <div className="flex justify-center gap-2.5 items-center flex-wrap pt-2">
                    <div className="bg-sky-50 text-sky-900 border border-sky-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.activeSubject}
                      <span className="text-[9px] block text-sky-600 font-sans font-medium mt-0.5">Sujeto Activo</span>
                    </div>

                    <div className="bg-emerald-50 text-emerald-900 border border-emerald-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.activeVerb}
                      <span className="text-[9px] block text-emerald-600 font-sans font-medium mt-0.5">Verbo</span>
                    </div>

                    <div className="bg-pink-50 text-pink-900 border border-pink-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.activeObject}
                      <span className="text-[9px] block text-pink-600 font-sans font-medium mt-0.5">Objeto Directo</span>
                    </div>
                  </div>
                </div>

                {/* Arrow crossover illustration */}
                <div className="flex justify-between max-w-md mx-auto relative h-12" id="crossover-arrows">
                  {/* Subject to Agent line */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="80%" y1="0" x2="20%" y2="100%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="20%" cy="0" r="4" fill="#38bdf8" />
                    <circle cx="80%" cy="0" r="4" fill="#f472b6" />
                    <circle cx="20%" cy="100%" r="4" fill="#f472b6" />
                    <circle cx="80%" cy="100%" r="4" fill="#f472b6" />
                  </svg>
                </div>

                {/* Passive Sentence Row */}
                <div className="space-y-2 text-center pt-2">
                  <span className="text-[10px] font-bold text-pink-800 uppercase tracking-widest bg-pink-50 border border-pink-100/75 px-3 py-1 rounded-full font-sans">
                    Oración Pasiva Resultante
                  </span>
                  
                  <div className="flex justify-center gap-2.5 items-center flex-wrap pt-2">
                    <div className="bg-pink-50 text-pink-900 border border-pink-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.passiveSubject}
                      <span className="text-[9px] block text-pink-600 font-sans font-medium mt-0.5">Nuevo Sujeto</span>
                    </div>

                    <div className="bg-amber-50 text-amber-900 border border-amber-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.passiveAux}
                      <span className="text-[9px] block text-amber-600 font-sans font-medium mt-0.5">Verbo Be Aux</span>
                    </div>

                    <div className="bg-emerald-50 text-emerald-900 border border-emerald-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                      {currentTemplate.passiveVerb}
                      <span className="text-[9px] block text-emerald-600 font-sans font-medium mt-0.5">Participio</span>
                    </div>

                    {currentTemplate.passiveAgent && (
                      <div className="bg-sky-50 text-sky-900 border border-sky-200/90 font-mono px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-2xs">
                        {currentTemplate.passiveAgent}
                        <span className="text-[9px] block text-sky-600 font-sans font-medium mt-0.5">by + Agente</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Interactive Steps Visual Card Explainer */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
            
            <div className="flex justify-between items-center border-b border-slate-800/85 pb-3">
              <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest">
                Paso {currentStep} de 4 de la Transformación
              </span>
              <span className="text-xs bg-slate-800 text-indigo-300 px-3 py-1 rounded-xl font-bold font-sans">
                {currentStep === 1 ? 'Mover Objeto' : currentStep === 2 ? 'Tiempo Verbal' : currentStep === 3 ? 'Acción Principal' : 'Añadir Agente'}
              </span>
            </div>

            {/* STEP 1 DETAIL */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-slide-in">
                <h3 className="text-sm md:text-base font-display font-bold text-white flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center font-mono">1</span>
                  <span>Encontrar y trasladar el Objeto Directo</span>
                </h3>
                <p className="text-slate-350 text-xs leading-relaxed font-sans">
                  Identifica sobre quién o qué recae la acción en la oración activa. El objeto directo se convertirá en el <strong className="text-white">Sujeto Paciente</strong> al inicio de tu nueva oración pasiva.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 text-xs font-mono space-y-1">
                  <div><span className="text-slate-500">Activa:</span> They clean <strong className="text-pink-400">the office</strong>.</div>
                  <div className="text-indigo-400">⬇ El objeto se traslada al frente:</div>
                  <div><span className="text-slate-500">Pasiva:</span> <strong className="text-pink-400">The office</strong> ...</div>
                </div>
              </div>
            )}

            {/* STEP 2 DETAIL */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-slide-in">
                <h3 className="text-sm md:text-base font-display font-bold text-white flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center font-mono">2</span>
                  <span>Insertar el auxiliar "To Be" en el tiempo correcto</span>
                </h3>
                <p className="text-slate-350 text-xs leading-relaxed font-sans">
                  El verbo auxiliar <strong>be</strong> debe conjugarse en el mismo tiempo que el verbo de la oración activa original y concordar en número (singular/plural) con el nuevo sujeto paciente.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 text-xs font-mono space-y-1">
                  <div><span className="text-slate-500">Tiempo Activo:</span> Presente Simple ("clean")</div>
                  <div><span className="text-slate-500">Sujeto Pasivo:</span> "The office" (Singular)</div>
                  <div className="text-indigo-400">⬇ Conjugamos be en Presente Singular:</div>
                  <div><span className="text-slate-500">Pasiva:</span> The office <strong className="text-amber-400">is</strong> ...</div>
                </div>
              </div>
            )}

            {/* STEP 3 DETAIL */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-slide-in">
                <h3 className="text-sm md:text-base font-display font-bold text-white flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center font-mono">3</span>
                  <span>Convertir el verbo principal a Participio Pasado</span>
                </h3>
                <p className="text-slate-350 text-xs leading-relaxed font-sans">
                  El verbo principal de la oración activa debe transformarse a su forma de <strong>Participio Pasado</strong> (la tercera columna si es irregular, o agregando -ed si es un verbo regular).
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 text-xs font-mono space-y-1">
                  <div><span className="text-slate-500">Verbo Activo:</span> clean (Regular)</div>
                  <div className="text-indigo-400">⬇ Convertimos a participio (-ed):</div>
                  <div><span className="text-slate-500">Pasiva:</span> The office is <strong className="text-emerald-400">cleaned</strong> ...</div>
                </div>
              </div>
            )}

            {/* STEP 4 DETAIL */}
            {currentStep === 4 && (
              <div className="space-y-3 animate-slide-in">
                <h3 className="text-sm md:text-base font-display font-bold text-white flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center font-mono">4</span>
                  <span>Añadir el agente ejecutor precedido por "by" (Opcional)</span>
                </h3>
                <p className="text-slate-350 text-xs leading-relaxed font-sans">
                  Si deseas especificar quién realizó la acción original, ubícalo al final precedido de la preposición <strong>by</strong>. Si la persona es irrelevante, obvia o se desconoce, puedes omitirlo para mayor naturalidad.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 text-xs font-mono space-y-1">
                  <div><span className="text-slate-500">Sujeto Activo:</span> They (Pronombre Sujeto)</div>
                  <div className="text-indigo-400">⬇ Cambiamos a Pronombre Objeto precedido de by:</div>
                  <div><span className="text-slate-500">Pasiva:</span> The office is cleaned <strong className="text-sky-400">by them</strong> every day.</div>
                </div>
              </div>
            )}

            {/* Steps interactive footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-slate-400 hover:text-white disabled:opacity-40 transition cursor-pointer font-sans font-semibold"
              >
                Anterior Paso
              </button>

              <button
                disabled={currentStep === 4}
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 cursor-pointer font-sans shadow-xs"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
