import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // PRESENT SIMPLE
  {
    id: 'ps-1',
    topicId: 'present-simple',
    type: 'multiple-choice',
    instruction: 'Elige la forma correcta del verbo "to be" para completar la oración pasiva:',
    question: 'English ______ spoken all over the world.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'is',
    explanation: 'Como "English" es un sujeto singular incontable (it), usamos la tercera persona singular del verbo "to be" en presente, que es "is".'
  },
  {
    id: 'ps-2',
    topicId: 'present-simple',
    type: 'fill-blanks',
    instruction: 'Escribe el participio pasado del verbo entre paréntesis:',
    question: 'Thousands of emails are ______ (send) every minute.',
    correctAnswer: 'sent',
    explanation: '"Sent" es el participio pasado irregular de "send". La frase significa: "Miles de correos electrónicos son enviados cada minuto".',
    hints: ['Es un verbo irregular.', 'Termina con la letra t.']
  },
  {
    id: 'ps-3',
    topicId: 'present-simple',
    type: 'reorder',
    instruction: 'Ordena las palabras para formar la oración pasiva correcta:',
    question: 'are / here / grown / Grapes',
    correctAnswer: 'Grapes are grown here',
    explanation: 'El orden correcto es: Sujeto Paciente (Grapes) + Verbo "to be" en plural (are) + Participio Pasado (grown) + Complemento (here).'
  },
  {
    id: 'ps-4',
    topicId: 'present-simple',
    type: 'active-to-passive',
    instruction: 'Convierte la siguiente oración activa a voz pasiva:',
    question: 'Active: People make cheese from milk.',
    correctAnswer: 'Cheese is made from milk',
    explanation: '"Cheese" (objeto de la activa) pasa a ser el sujeto. Como es incontable singular, añadimos "is", luego el participio de "make" que es "made", y el complemento "from milk". Omitimos el agente "by people" ya que es obvio.',
    activeSentence: 'People make cheese from milk.',
    hints: ['Empieza la oración con "Cheese".', 'El participio de "make" es irregular ("made").']
  },

  // PRESENT CONTINUOUS
  {
    id: 'pc-1',
    topicId: 'present-continuous',
    type: 'multiple-choice',
    instruction: 'Selecciona la opción correcta para completar el Presente Continuo Pasivo:',
    question: 'The meeting room ______ prepared for the presentation right now.',
    options: ['is being', 'are being', 'is been', 'was being'],
    correctAnswer: 'is being',
    explanation: '"The meeting room" es singular, por lo que requiere "is". Para la voz pasiva continua, añadimos "being" y luego el participio. "Is being" es la opción correcta.'
  },
  {
    id: 'pc-2',
    topicId: 'present-continuous',
    type: 'fill-blanks',
    instruction: 'Escribe la palabra que falta para denotar continuidad en la voz pasiva:',
    question: 'New apartments are ______ built near the beach at the moment.',
    correctAnswer: 'being',
    explanation: 'Para formar los tiempos continuos pasivos en inglés, se utiliza obligatoriamente la palabra "being" entre el verbo "to be" (are) y el participio principal (built).'
  },
  {
    id: 'pc-3',
    topicId: 'present-continuous',
    type: 'reorder',
    instruction: 'Ordena las palabras para formar la oración en presente continuo pasivo:',
    question: 'being / dinner / cooked / is / now / right',
    correctAnswer: 'dinner is being cooked right now',
    explanation: 'El orden gramatical es: Sujeto (dinner) + auxiliar is + continuous modifier "being" + participio "cooked" + adverbio de tiempo (right now).'
  },
  {
    id: 'pc-4',
    topicId: 'present-continuous',
    type: 'active-to-passive',
    instruction: 'Convierte la oración a voz pasiva en presente continuo:',
    question: 'Active: The chef is preparing the dishes.',
    correctAnswer: 'The dishes are being prepared',
    explanation: '"The dishes" es un sujeto plural, por lo que usamos "are", añadimos el continuo "being" y el participio de "prepare" que es "prepared".',
    activeSentence: 'The chef is preparing the dishes.'
  },

  // PAST SIMPLE
  {
    id: 'pas-1',
    topicId: 'past-simple',
    type: 'multiple-choice',
    instruction: 'Elige la opción correcta para completar la oración en pasado pasivo:',
    question: 'The telephone ______ invented by Alexander Graham Bell.',
    options: ['is', 'were', 'was', 'been'],
    correctAnswer: 'was',
    explanation: '"The telephone" es singular (it) y el evento ocurrió en el pasado (histórico), por tanto, usamos "was" + participio pasado.'
  },
  {
    id: 'pas-2',
    topicId: 'past-simple',
    type: 'fill-blanks',
    instruction: 'Escribe el participio del verbo regular entre paréntesis para completar la oración:',
    question: 'These old photos were ______ (discover) in a box in the attic.',
    correctAnswer: 'discovered',
    explanation: 'El verbo "discover" es regular, de modo que su participio pasado simplemente añade "-ed" al final: "discovered".'
  },
  {
    id: 'pas-3',
    topicId: 'past-simple',
    type: 'reorder',
    instruction: 'Ordena la oración en pasado simple pasivo:',
    question: 'built / Rome / in / was / not / day / a',
    correctAnswer: 'Rome was not built in a day',
    explanation: 'La famosa frase proverbio "Roma no se construyó en un día" se ordena como: Sujeto (Rome) + was + negación (not) + participio (built) + preposición y complemento (in a day).'
  },
  {
    id: 'pas-4',
    topicId: 'past-simple',
    type: 'active-to-passive',
    instruction: 'Convierte esta oración del pasado simple activo al pasivo:',
    question: 'Active: J.K. Rowling wrote Harry Potter.',
    correctAnswer: 'Harry Potter was written by J.K. Rowling',
    explanation: '"Harry Potter" es el nuevo sujeto singular. Usamos "was", seguido de "written" (participio de write) y mencionamos obligatoriamente a la autora relevante usando la preposición "by".',
    activeSentence: 'J.K. Rowling wrote Harry Potter.'
  },

  // PAST CONTINUOUS
  {
    id: 'pac-1',
    topicId: 'past-continuous',
    type: 'multiple-choice',
    instruction: 'Completa la oración en pasado continuo pasivo:',
    question: 'The suspect ______ questioned by the police when I arrived.',
    options: ['was being', 'were being', 'was been', 'is being'],
    correctAnswer: 'was being',
    explanation: 'Para referirnos a un sospechoso (singular - he/she) en un momento continuo del pasado, usamos "was being" seguido del participio "questioned".'
  },
  {
    id: 'pac-2',
    topicId: 'past-continuous',
    type: 'fill-blanks',
    instruction: 'Escribe el participio pasado del verbo entre paréntesis:',
    question: 'The damaged bridge was being ______ (repair) when it collapsed.',
    correctAnswer: 'repaired',
    explanation: '"Repair" es un verbo regular, por tanto su participio pasado es "repaired". La frase significa "El puente dañado estaba siendo reparado cuando colapsó".'
  },
  {
    id: 'pac-3',
    topicId: 'past-continuous',
    type: 'reorder',
    instruction: 'Ordena la frase en pasado continuo pasivo:',
    question: 'followed / felt / she / being / she / was',
    correctAnswer: 'she felt she was being followed',
    explanation: 'Estructura mixta: "She felt" (Ella sintió) + "she was being followed" (que estaba siendo seguida).'
  },
  {
    id: 'pac-4',
    topicId: 'past-continuous',
    type: 'active-to-passive',
    instruction: 'Traduce a pasiva en pasado continuo:',
    question: 'Active: The workers were cleaning the streets at midnight.',
    correctAnswer: 'The streets were being cleaned at midnight',
    explanation: '"The streets" es plural, por lo que en el pasado continuo pasivo requiere "were being" + participio "cleaned". Omitimos el agente "by the workers" porque es una acción típica.',
    activeSentence: 'The workers were cleaning the streets at midnight.'
  },

  // PRESENT PERFECT
  {
    id: 'pp-1',
    topicId: 'present-perfect',
    type: 'multiple-choice',
    instruction: 'Elige la forma pasiva correcta del presente perfecto:',
    question: 'All the tickets for the concert ______ sold out.',
    options: ['have been', 'has been', 'were', 'have being'],
    correctAnswer: 'have been',
    explanation: '"All the tickets" es plural (they), por lo tanto requerimos "have". Al ser pasiva de presente perfecto, colocamos "been" y el participio "sold". "Have been" es la respuesta correcta.'
  },
  {
    id: 'pp-2',
    topicId: 'present-perfect',
    type: 'fill-blanks',
    instruction: 'Escribe el verbo auxiliar correspondiente en presente perfecto (have / has):',
    question: 'The kitchen ______ been cleaned, so it looks spotless.',
    correctAnswer: 'has',
    explanation: 'El sujeto es "the kitchen" (singular - third person). Por ende, el auxiliar del presente perfecto debe ser "has".'
  },
  {
    id: 'pp-3',
    topicId: 'present-perfect',
    type: 'reorder',
    instruction: 'Ordena la oración en presente perfecto pasivo:',
    question: 'emails / been / has / none / of / answered / the',
    correctAnswer: 'none of the emails has been answered',
    explanation: '"None of..." se trata gramaticalmente como singular. "None of the emails has been answered" significa "Ninguno de los correos ha sido respondido".'
  },
  {
    id: 'pp-4',
    topicId: 'present-perfect',
    type: 'active-to-passive',
    instruction: 'Pasa a voz pasiva:',
    question: 'Active: Someone has stolen my wallet.',
    correctAnswer: 'My wallet has been stolen',
    explanation: 'El objeto "my wallet" (singular) se vuelve el sujeto pasivo + "has been" + participio "stolen". El agente "someone" se elimina al ser desconocido.',
    activeSentence: 'Someone has stolen my wallet.'
  },

  // FUTURE SIMPLE
  {
    id: 'fs-1',
    topicId: 'future-simple',
    type: 'multiple-choice',
    instruction: 'Elige el auxiliar correcto de futuro pasivo:',
    question: 'The final results ______ published next week on the website.',
    options: ['will be', 'will been', 'is going to', 'shall being'],
    correctAnswer: 'will be',
    explanation: 'La voz pasiva de futuro simple utiliza de manera uniforme "will be" + participio pasado sin importar el sujeto.'
  },
  {
    id: 'fs-2',
    topicId: 'future-simple',
    type: 'fill-blanks',
    instruction: 'Completa la oración con el verbo en participio pasado:',
    question: 'You will be ______ (inform) of our decision as soon as possible.',
    correctAnswer: 'informed',
    explanation: '"Inform" es un verbo regular, así que su participio es "informed". Traduce: "Serás informado de nuestra decisión lo antes posible".'
  },
  {
    id: 'fs-3',
    topicId: 'future-simple',
    type: 'reorder',
    instruction: 'Ordena la oración en futuro simple pasivo:',
    question: 'tolerated / behaviour / not / will / be / This',
    correctAnswer: 'This behaviour will not be tolerated',
    explanation: 'Sujeto (This behaviour) + will + negación (not) + be + participio (tolerated). Significa: "Este comportamiento no será tolerado".'
  },
  {
    id: 'fs-4',
    topicId: 'future-simple',
    type: 'active-to-passive',
    instruction: 'Pasa esta frase futurista a voz pasiva:',
    question: 'Active: Robots will clean the streets in the future.',
    correctAnswer: 'The streets will be cleaned by robots in the future',
    explanation: 'Colocamos el objeto "The streets" de primero, añadimos "will be", el participio "cleaned", el agente con "by robots", y finalmente el adverbio temporal "in the future".',
    activeSentence: 'Robots will clean the streets in the future.'
  },

  // FUTURE PERFECT
  {
    id: 'fp-1',
    topicId: 'future-perfect',
    type: 'multiple-choice',
    instruction: 'Completa con la forma adecuada del Futuro Perfecto Pasivo:',
    question: 'By the end of this month, the construction work ______.',
    options: ['will have been completed', 'will be completed', 'has been completed', 'will have being completed'],
    correctAnswer: 'will have been completed',
    explanation: 'La expresión de tiempo "By the end of this month" (Para finales de este mes) exige futuro perfecto. En pasiva, este tiempo se forma con "will have been" + participio ("completed").'
  },
  {
    id: 'fp-2',
    topicId: 'future-perfect',
    type: 'fill-blanks',
    instruction: 'Escribe el participio del verbo "to be" correspondiente para el futuro perfecto pasivo:',
    question: 'The books will have ______ returned by tomorrow evening.',
    correctAnswer: 'been',
    explanation: 'La estructura de los tiempos perfectos pasivos es "will have been + participio". Por lo tanto, el verbo auxiliar que falta es "been".'
  },
  {
    id: 'fp-3',
    topicId: 'future-perfect',
    type: 'reorder',
    instruction: 'Ordena los elementos para estructurar el futuro perfecto pasivo:',
    question: 'have / will / solved / been / problem / the / Monday / by',
    correctAnswer: 'the problem will have been solved by Monday',
    explanation: 'Estructura: Sujeto (the problem) + will have been + participio (solved) + complemento temporal (by Monday).'
  },
  {
    id: 'fp-4',
    topicId: 'future-perfect',
    type: 'active-to-passive',
    instruction: 'Convierte la oración activa en futuro perfecto a voz pasiva:',
    question: 'Active: By next week, the company will have launched the app.',
    correctAnswer: 'By next week, the app will have been launched',
    explanation: '"the app" es el objeto que pasa a ser sujeto. Añadimos "will have been" + participio "launched". Conservamos la cláusula temporal "By next week" al inicio.',
    activeSentence: 'By next week, the company will have launched the app.'
  },

  // INFINITIVES
  {
    id: 'inf-1',
    topicId: 'infinitives',
    type: 'multiple-choice',
    instruction: 'Elige el infinitivo pasivo correcto:',
    question: 'There are many things that need ______ done today.',
    options: ['to be', 'to been', 'be', 'being'],
    correctAnswer: 'to be',
    explanation: 'El verbo "need" requiere un infinitivo con "to". La voz pasiva del infinitivo es "to be" + participio pasado ("done").'
  },
  {
    id: 'inf-2',
    topicId: 'infinitives',
    type: 'fill-blanks',
    instruction: 'Escribe el infinitivo pasivo correcto del verbo "choose" (recuerda que el participio es irregular: chosen):',
    question: 'She hopes ______ (choose) for the job position.',
    correctAnswer: 'to be chosen',
    explanation: 'El verbo "hope" va seguido de infinitivo. En pasiva para este verbo, la estructura es "to be" seguido del participio "chosen": "to be chosen" (ser elegida).'
  },
  {
    id: 'inf-3',
    topicId: 'infinitives',
    type: 'reorder',
    instruction: 'Ordena la frase usando infinitivo pasivo:',
    question: 'loved / wants / to / Everybody / be',
    correctAnswer: 'Everybody wants to be loved',
    explanation: 'Significa "Todo el mundo quiere ser amado". Estructura: Sujeto (Everybody) + verbo principal (wants) + infinitivo pasivo (to be loved).'
  },
  {
    id: 'inf-4',
    topicId: 'infinitives',
    type: 'active-to-passive',
    instruction: 'Convierte a voz pasiva con infinitivo:',
    question: 'Active: I want the doctor to examine me.',
    correctAnswer: 'I want to be examined by the doctor',
    explanation: 'La frase activa expresa el deseo del hablante de recibir una acción. En pasiva, "to examine me" se convierte en infinitivo pasivo "to be examined" y se añade el agente "by the doctor".',
    activeSentence: 'I want the doctor to examine me.'
  },

  // MODALS
  {
    id: 'mod-1',
    topicId: 'modals',
    type: 'multiple-choice',
    instruction: 'Completa la oración usando un verbo modal pasivo:',
    question: 'The rules of the game ______ followed by all players.',
    options: ['must be', 'must been', 'is to be', 'should being'],
    correctAnswer: 'must be',
    explanation: 'Después de cualquier verbo modal (must), se debe usar el infinitivo sin to, que es "be", seguido del participio pasado. Por lo tanto, usamos "must be".'
  },
  {
    id: 'mod-2',
    topicId: 'modals',
    type: 'fill-blanks',
    instruction: 'Escribe el participio pasado del verbo irregular "keep":',
    question: 'Your password should be ______ (keep) secret.',
    correctAnswer: 'kept',
    explanation: '"Kept" es el participio pasado irregular de "keep". La frase significa: "Tu contraseña debe ser mantenida en secreto".'
  },
  {
    id: 'mod-3',
    topicId: 'modals',
    type: 'reorder',
    instruction: 'Ordena la oración modal pasiva:',
    question: 'be / solved / easily / can / problem / This',
    correctAnswer: 'This problem can be easily solved',
    explanation: 'Sujeto (This problem) + modal "can" + be + adverbio "easily" + participio "solved". "Este problema puede ser resuelto fácilmente".'
  },
  {
    id: 'mod-4',
    topicId: 'modals',
    type: 'active-to-passive',
    instruction: 'Pasa esta advertencia a voz pasiva utilizando el modal correspondientes:',
    question: 'Active: You can eat this medicine with or without food.',
    correctAnswer: 'This medicine can be eaten with or without food',
    explanation: '"This medicine" es el objeto pasivo. Colocamos el modal "can" + "be" + el participio irregular "eaten" (de eat) + el complemento.',
    activeSentence: 'You can eat this medicine with or without food.'
  }
];
