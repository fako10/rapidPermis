// theme-data.ts
export interface Section {
  title: string;
  content: string[];
}

export interface QcmQuestion {
  question: string;
  options: string[];
  answer: number; // index de la réponse correcte
}

export interface Theme {
  id: number;
  title: string;
  sections: Section[];
  qcm: QcmQuestion[];
}

export const THEMES: Theme[] = [
  // ----------------- THÈME 1 : Circulation routière -----------------
  {
    id: 1,
    title: 'La circulation routière',
    sections: [
      { title: 'Introduction', content: [
          'La circulation routière est encadrée par des règles strictes pour garantir la sécurité.',
          'Observation, anticipation et respect des priorités sont essentiels.'
        ]},
      { title: 'Positionnement sur la chaussée', content: [
          'Garder son véhicule à droite sauf dépassement.',
          'Adapter sa position en agglomération selon les intersections et virages.',
          'Signaler tout changement de voie avec le clignotant.'
        ]},
      { title: 'Vitesse', content: [
          'Adapter sa vitesse aux conditions : météo, visibilité, trafic, état de la route.',
          'Limites générales : autoroute 130 km/h, route 80 km/h, agglomération 50 km/h.'
        ]},
      { title: 'Intersections et priorités', content: [
          'Priorité à droite en l’absence de panneau.',
          'Stop = arrêt obligatoire, Cédez-le-passage = ralentir et céder le passage si nécessaire.',
          'Rond-point = priorité aux véhicules déjà engagés.'
        ]},
      { title: 'Dépassement', content: [
          'Vérifier visibilité et angles morts.',
          'Signaler le dépassement, effectuer la manœuvre rapidement mais en sécurité, puis se rabattre.'
        ]}
    ],
    qcm: [
      { question: 'Que signifie une ligne continue au sol ?', options: ['Dépassement autorisé', 'Dépassement interdit', 'Priorité à gauche'], answer: 1 },
      { question: 'Que devez-vous faire à un stop ?', options: ['Ralentir', 'S’arrêter totalement', 'Klaxonner et passer'], answer: 1 },
      { question: 'Au rond-point, qui a la priorité ?', options: ['Véhicules entrants', 'Véhicules déjà engagés', 'Véhicules de gauche'], answer: 1 }
    ]
  },

  // ----------------- THÈME 2 : Priorités -----------------
  {
    id: 2,
    title: 'Priorités',
    sections: [
      { title: 'Priorité à droite', content: ['Sans panneau, céder le passage aux véhicules venant de droite.'] },
      { title: 'Stop et Cédez-le-passage', content: ['Stop = arrêt complet', 'Cédez-le-passage = ralentir et s’arrêter si nécessaire.'] },
      { title: 'Rond-points', content: ['Priorité aux véhicules déjà engagés. Clignotant obligatoire pour sortir.'] }
    ],
    qcm: [
      { question: 'Sans panneau, quelle règle s’applique ?', options: ['Stop', 'Cédez-le-passage', 'Priorité à droite'], answer: 2 },
      { question: 'Au rond-point, qui a la priorité ?', options: ['Entrants', 'Sortants', 'Déjà engagés'], answer: 2 }
    ]
  },

  // ----------------- THÈME 3 : Écoconduite -----------------
  {
    id: 3,
    title: 'Écoconduite',
    sections: [
      { title: 'Accélération douce', content: ['Réduit consommation et pollution.'] },
      { title: 'Vitesse stabilisée', content: ['Utiliser le rapport le plus élevé possible.'] },
      { title: 'Pression des pneus', content: ['Un pneu sous-gonflé augmente la consommation.'] },
      { title: 'Anticipation', content: ['Évite les freinages inutiles et réduit l’usure.'] }
    ],
    qcm: [
      { question: 'Une accélération forte augmente la consommation ?', options: ['Oui', 'Non'], answer: 0 },
      { question: 'Pneus sous-gonflés : effet ?', options: ['Consommation réduite', 'Consommation augmentée'], answer: 1 }
    ]
  },

  // ----------------- THÈME 4 : Signalisation -----------------
  {
    id: 4,
    title: 'Signalisation',
    sections: [
      { title: 'Marquages au sol', content: ['Lignes continues, discontinues, zigzags…'] },
      { title: 'Feux tricolores', content: ['Rouge = arrêt, Orange = prudence, Vert = passage autorisé.'] },
      { title: 'Panneaux permanents et temporaires', content: ['Les panneaux temporaires priment sur les permanents.'] }
    ],
    qcm: [
      { question: 'Que signifie une ligne continue ?', options: ['Dépassement autorisé', 'Dépassement interdit'], answer: 1 },
      { question: 'Les panneaux temporaires :', options: ['Priorité moindre', 'Priment sur permanents'], answer: 1 }
    ]
  },

  // ----------------- THÈME 5 : Règles générales -----------------
  {
    id: 5,
    title: 'Règles générales',
    sections: [
      { title: 'Ceinture obligatoire', content: ['À l’avant et à l’arrière pour tous les passagers.'] },
      { title: 'Téléphone au volant', content: ['Interdit, même tenu en main.'] },
      { title: 'Alcool', content: ['Taux maximal 0.5 g/l (0.2 g/l jeunes conducteurs).'] }
    ],
    qcm: [
      { question: 'Téléphone en main autorisé ?', options: ['Oui', 'Non'], answer: 1 },
      { question: 'Taux maximal alcool adulte ?', options: ['0.5 g/l', '0.8 g/l'], answer: 0 }
    ]
  },

  // ----------------- THÈME 6 : Stationnement -----------------
  {
    id: 6,
    title: 'Stationnement',
    sections: [
      { title: 'Stationnement gênant', content: ['Devant un garage, sur trottoir, arrêt de bus…'] },
      { title: 'Stationnement dangereux', content: ['Près d’un virage, sommet de côte, intersection…'] },
      { title: 'Zones bleues', content: ['Disque obligatoire.'] }
    ],
    qcm: [
      { question: 'Stationnement sur trottoir ?', options: ['Autorisé', 'Interdit'], answer: 1 },
      { question: 'Stationnement dangereux ?', options: ['Partout', 'Zones sans visibilité'], answer: 1 }
    ]
  },

  // ----------------- THÈME 7 : Sécurité -----------------
  {
    id: 7,
    title: 'Sécurité',
    sections: [
      { title: 'Distance de sécurité', content: ['Deux secondes minimum sur route normale.'] },
      { title: 'Fatigue', content: ['Première cause d’accidents sur autoroute.'] },
      { title: 'Vitesse', content: ['Augmente gravement la gravité des accidents.'] }
    ],
    qcm: [
      { question: 'Distance minimale ?', options: ['1s', '2s', '3s'], answer: 1 },
      { question: 'Fatigue cause principale sur ?', options: ['Route', 'Autoroute'], answer: 1 }
    ]
  },

  // ----------------- THÈME 8 : Premiers secours -----------------
  {
    id: 8,
    title: 'Premiers secours',
    sections: [
      { title: 'Protéger', content: ['Baliser, sécuriser la zone.'] },
      { title: 'Alerter', content: ['Appeler le 112.'] },
      { title: 'Secourir', content: ['Mettre en PLS, surveiller respiration.'] }
    ],
    qcm: [
      { question: 'Premier geste ?', options: ['Secourir', 'Protéger', 'Appeler'], answer: 1 },
      { question: 'Numéro d’urgence européen ?', options: ['15', '18', '112'], answer: 2 }
    ]
  },

  // ----------------- THÈME 9 : Mécanique -----------------
  {
    id: 9,
    title: 'Mécanique',
    sections: [
      { title: 'Huile moteur', content: ['Vérifier régulièrement le niveau.'] },
      { title: 'Liquide de frein', content: ['Indispensable au freinage.'] },
      { title: 'Pneus', content: ['Vérifier pression et usure régulièrement.'] }
    ],
    qcm: [
      { question: 'Vérifier pression pneus ?', options: ['Oui', 'Non'], answer: 0 },
      { question: 'Liquide indispensable ?', options: ['Lave-glace', 'Frein'], answer: 1 }
    ]
  },

  // ----------------- THÈME 10 : Conduite écologique -----------------
  {
    id: 10,
    title: 'Conduite écologique',
    sections: [
      { title: 'Réduction des émissions', content: ['Adapter vitesse, éviter accélérations fortes.'] },
      { title: 'Gestion du carburant', content: ['Anticipation = consommation réduite.'] },
      { title: 'Équipements', content: ['Pneus gonflés, véhicule entretenu.'] }
    ],
    qcm: [
      { question: 'Pour réduire consommation ?', options: ['Accélérer fort', 'Anticiper'], answer: 1 },
      { question: 'Véhicule mal entretenu : effet ?', options: ['Consomme plus', 'Consomme moins'], answer: 0 }
    ]
  }
];
