import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'present-simple',
    title: 'Present Simple Passive',
    subtitle: 'Presente Simple Pasivo',
    formula: 'Sujeto Paciente + am / is / are + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para hablar de hechos generales, verdades universales, rutinas o procesos habituales donde la acción o el objeto es más importante que quien la realiza.',
    explanation: 'En el Presente Simple Pasivo, convertimos el objeto de la oración activa en el sujeto de la pasiva. Usamos el verbo "to be" en presente (am, is, are) seguido del verbo principal en participio pasado (3ª columna de los verbos irregulares o terminado en -ed para regulares).',
    activeExample: 'They clean the office every day.',
    activeExampleTranslation: 'Ellos limpian la oficina todos los días.',
    passiveExample: 'The office is cleaned every day.',
    passiveExampleTranslation: 'La oficina es limpiada todos los días / Se limpia la oficina todos los días.',
    keyPoints: [
      'Usa "is" para sujetos singulares (he, she, it, the office).',
      'Usa "are" para sujetos plurales (they, we, you, the offices).',
      'Usa "am" únicamente para "I".',
      'El agente ("by them", "by people") se omite si es obvio o desconocido.'
    ],
    tips: 'Es el tiempo pasivo más común. Se usa frecuentemente en descripciones de procesos de fabricación ("Coffee beans are harvested...") y noticias periodísticas.',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'am / is / are', type: 'auxiliary' },
      { id: '3', label: 'Participio Pasado', type: 'verb' },
      { id: '4', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'present-continuous',
    title: 'Present Continuous Passive',
    subtitle: 'Presente Continuo Pasivo',
    formula: 'Sujeto Paciente + am / is / are + being + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para describir acciones que están ocurriendo en este preciso momento, donde el sujeto paciente está experimentando la acción continuamente.',
    explanation: 'Para formar el Presente Continuo Pasivo, mantenemos el verbo "to be" en presente (am, is, are) pero agregamos el gerundio "being" para dar la idea de continuidad, y luego añadimos el participio pasado del verbo principal.',
    activeExample: 'The mechanic is repairing my car right now.',
    activeExampleTranslation: 'El mecánico está reparando mi carro en este momento.',
    passiveExample: 'My car is being repaired right now.',
    passiveExampleTranslation: 'Mi carro está siendo reparado en este momento.',
    keyPoints: [
      'No olvides incluir "being" para denotar la naturaleza continua de la acción.',
      'El verbo "to be" (is/are) debe concordar en número con el nuevo sujeto (sing./plur.).',
      'Evita confundir "been" (participio) con "being" (gerundio). Aquí siempre es "being".'
    ],
    tips: 'Se traduce al español habitualmente como "está siendo [verbo]" o con la estructura impersonal "se está [verbo]" (ej. "se está reparando el coche").',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'am / is / are', type: 'auxiliary' },
      { id: '3', label: 'being', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'past-simple',
    title: 'Past Simple Passive',
    subtitle: 'Pasado Simple Pasivo',
    formula: 'Sujeto Paciente + was / were + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para referirse a eventos que ocurrieron y finalizaron en un momento específico del pasado.',
    explanation: 'El Pasado Simple Pasivo traslada el foco a lo que sucedió en el pasado. Se forma conjugando el verbo "to be" en pasado (was para I, he, she, it; were para you, we, they) y añadiendo el participio pasado del verbo principal.',
    activeExample: 'Alexander Fleming discovered penicillin in 1928.',
    activeExampleTranslation: 'Alexander Fleming descubrió la penicilina en 1928.',
    passiveExample: 'Penicillin was discovered by Alexander Fleming in 1928.',
    passiveExampleTranslation: 'La penicilina fue descubierta por Alexander Fleming en 1928.',
    keyPoints: [
      'Usa "was" para sujetos singulares (the letter, he, the discovery).',
      'Usa "were" para sujetos plurales (the letters, they, the books).',
      'Mencionar el agente con "by" es sumamente útil cuando el autor de la acción histórica es relevante (ej. "by Shakespeare").'
    ],
    tips: 'Este tiempo es extremadamente común en libros de historia, biografías y reportajes científicos donde describimos inventos, descubrimientos o hitos pasados.',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'was / were', type: 'auxiliary' },
      { id: '3', label: 'Participio Pasado', type: 'verb' },
      { id: '4', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'past-continuous',
    title: 'Past Continuous Passive',
    subtitle: 'Pasado Continuo Pasivo',
    formula: 'Sujeto Paciente + was / were + being + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para describir una acción en desarrollo en el pasado que fue interrumpida o que servía de trasfondo a otro evento.',
    explanation: 'El Pasado Continuo Pasivo combina el tiempo pasado del auxiliar "to be" (was/were), el indicador continuo "being", y el participio pasado del verbo de acción.',
    activeExample: 'They were painting the walls when I arrived.',
    activeExampleTranslation: 'Ellos estaban pintando las paredes cuando llegué.',
    passiveExample: 'The walls were being painted when I arrived.',
    passiveExampleTranslation: 'Las paredes estaban siendo pintadas cuando llegué.',
    keyPoints: [
      'Al igual que en presente continuo, necesitas obligatoriamente "being".',
      'El verbo "was/were" concuerda con el nuevo sujeto paciente.',
      'Suele aparecer acompañado de una cláusula temporal introducida por "when" o "while".'
    ],
    tips: 'Imagínate que entras a una escena del pasado y describes lo que estaba sucediendo a tu alrededor desde la perspectiva de las cosas afectadas.',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'was / were', type: 'auxiliary' },
      { id: '3', label: 'being', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'present-perfect',
    title: 'Present Perfect Passive',
    subtitle: 'Presente Perfecto Pasivo',
    formula: 'Sujeto Paciente + have / has + been + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para acciones que ocurrieron en un momento no específico del pasado y que tienen un impacto directo o relevancia en el presente.',
    explanation: 'Para formar el Presente Perfecto Pasivo, usamos los auxiliares "have" o "has" (según la persona), seguidos del participio del verbo to be ("been") y, finalmente, el participio del verbo principal.',
    activeExample: 'The government has built a new school.',
    activeExampleTranslation: 'El gobierno ha construido una escuela nueva.',
    passiveExample: 'A new school has been built.',
    passiveExampleTranslation: 'Una escuela nueva ha sido construida.',
    keyPoints: [
      'Usa "has been" para la tercera persona singular (he, she, it, a new school).',
      'Usa "have been" para las demás personas (I, you, we, they, schools).',
      'No confundas "being" con "been". En tiempos perfectos siempre usamos "been".'
    ],
    tips: 'Se usa mucho para anunciar noticias recientes e importantes ("The thief has been caught!" - ¡El ladrón ha sido capturado!).',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'have / has', type: 'auxiliary' },
      { id: '3', label: 'been', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'future-simple',
    title: 'Future Simple Passive',
    subtitle: 'Futuro Simple Pasivo',
    formula: 'Sujeto Paciente + will + be + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para hablar de predicciones, promesas, decisiones espontáneas o eventos planificados que ocurrirán en el futuro.',
    explanation: 'El Futuro Simple Pasivo es muy fácil de construir. Solo tienes que añadir el auxiliar "will", el infinitivo "be" (que nunca cambia de forma, no importa el sujeto) y el participio pasado del verbo principal.',
    activeExample: 'We will deliver the package tomorrow.',
    activeExampleTranslation: 'Entregaremos el paquete mañana.',
    passiveExample: 'The package will be delivered tomorrow.',
    passiveExampleTranslation: 'El paquete será entregado mañana.',
    keyPoints: [
      '"will be" no cambia según el sujeto. Es igual para singular y plural.',
      'Sirve tanto para planes oficiales como para suposiciones futuras.',
      'Suele ir acompañado de expresiones de tiempo futuro ("tomorrow", "next week").'
    ],
    tips: 'En contratos oficiales o términos de servicio verás mucho este tiempo ("Late fees will be charged...").',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'will', type: 'auxiliary' },
      { id: '3', label: 'be', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'future-perfect',
    title: 'Future Perfect Passive',
    subtitle: 'Futuro Perfecto Pasivo',
    formula: 'Sujeto Paciente + will + have + been + Participio Pasado (+ by + Agente)',
    useCase: 'Se utiliza para indicar que una acción habrá sido completada antes de un momento específico en el futuro.',
    explanation: 'Se compone de tres partes auxiliares: "will" (futuro), "have" (perfecto) y "been" (to be pasivo), seguidos de la forma participio del verbo de la acción.',
    activeExample: 'The team will have finished the project by Friday.',
    activeExampleTranslation: 'El equipo habrá terminado el proyecto para el viernes.',
    passiveExample: 'The project will have been finished by Friday.',
    passiveExampleTranslation: 'El proyecto habrá sido terminado para el viernes.',
    keyPoints: [
      'Al igual que en la activa, siempre se usa "have" en la pasiva ("will have been"), nunca "has".',
      'Casi siempre va acompañado de cláusulas con "by" (para el...) o "by the time..." (para cuando...).'
    ],
    tips: 'Este tiempo es de nivel avanzado. Es excelente para proyectar plazos de trabajo y metas empresariales o académicas fijando un límite de tiempo.',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'will have', type: 'auxiliary' },
      { id: '3', label: 'been', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  },
  {
    id: 'infinitives',
    title: 'Passive Infinitives',
    subtitle: 'Infinitivos Pasivos',
    formula: 'to + be + Participio Pasado',
    useCase: 'Se utiliza después de verbos que requieren un infinitivo (como want, need, hope, expect) o de adjetivos, expresando que el sujeto desea o necesita experimentar la acción.',
    explanation: 'El infinitivo pasivo sustituye al infinitivo activo habitual ("to do"). Se forma con la partícula "to", el verbo "be" en su forma base, y el participio pasado del verbo principal.',
    activeExample: 'I want them to respect my choices.',
    activeExampleTranslation: 'Quiero que ellos respeten mis elecciones.',
    passiveExample: 'I want my choices to be respected.',
    passiveExampleTranslation: 'Quiero que mis elecciones sean respetadas.',
    keyPoints: [
      'Se usa mucho con verbos de deseo o necesidad (ej. "This room needs to be cleaned").',
      'También se usa con adjetivos (ej. "It is easy to be fooled by appearances").',
      'Conserva la estructura simple "to be + participio" sin alterarse por el sujeto de la oración principal.'
    ],
    tips: 'Presta atención a estructuras muy comunes de instrucciones o avisos, como por ejemplo: "This form needs to be signed" (Este formulario necesita ser firmado).',
    formulaParts: [
      { id: '1', label: 'to', type: 'preposition' },
      { id: '2', label: 'be', type: 'auxiliary' },
      { id: '3', label: 'Participio Pasado', type: 'verb' }
    ]
  },
  {
    id: 'modals',
    title: 'Modals Passive',
    subtitle: 'Pasiva con Verbos Modales',
    formula: 'Sujeto Paciente + Verbo Modal (must/should/can/could...) + be + Participio Pasado',
    useCase: 'Se utiliza para expresar obligación, sugerencia, posibilidad, habilidad o permiso sobre un sujeto paciente sin enfocarse en el ejecutor.',
    explanation: 'Cuando una oración contiene un verbo modal (can, could, should, must, may, might, would), la pasiva se forma colocando el modal directo, seguido de "be" en infinitivo sin "to" y el participio del verbo principal.',
    activeExample: 'You must wash your hands before eating.',
    activeExampleTranslation: 'Debes lavarte las manos antes de comer.',
    passiveExample: 'Hands must be washed before eating.',
    passiveExampleTranslation: 'Las manos deben ser lavadas antes de comer / Se deben lavar las manos antes de comer.',
    keyPoints: [
      'El modal conserva sus reglas habituales y no cambia de forma según el sujeto.',
      'Sigue directamente con "be" en forma base (nunca is, are, am, was, were).',
      'Perfecto para reglamentos oficiales, manuales de usuario y advertencias de seguridad.'
    ],
    tips: 'Aprender esta estructura te permitirá sonar muy formal y educado al dar sugerencias o advertencias en entornos corporativos o académicos (ej. "The report should be reviewed").',
    formulaParts: [
      { id: '1', label: 'Sujeto Paciente', type: 'subject' },
      { id: '2', label: 'Verbo Modal (must/should...)', type: 'auxiliary' },
      { id: '3', label: 'be', type: 'addition' },
      { id: '4', label: 'Participio Pasado', type: 'verb' },
      { id: '5', label: 'by + Agente', type: 'agent' }
    ]
  }
];
