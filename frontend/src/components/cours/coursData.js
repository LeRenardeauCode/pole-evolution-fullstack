// Imports des illustrations
import poleSportIllustration from '../../assets/images/img_cours.jpg';
import poleChoreographieeIllustration from '../../assets/images/img_collectif.jpg';
import poleExotiqueIllustration from '../../assets/images/img_exotic.jpg';

// Ajouter les vraies photos Pole Dance

export const coursTypes = [
  {
    id: 1,
    type: "sport",
    titre: "PÔLE SPORT",
    description: "Une discipline technique et physique mélant force, souplesse et figures aériennes. Idéal pour se dépasser et gagner en puissance.",
    illustration: poleSportIllustration
  },
  {
    id: 2,
    type: "choreo",
    titre: "PÔLE CHORÉGRAPHIÉE",
    description: "La pôle comme un langage du corps. Fluidité, musicalité et expression pour raconter une histoire en mouvement.",
    illustration: poleChoreographieeIllustration
  },
  {
    id: 3,
    type: "exotique",
    titre: "PÔLE EXOTIQUE",
    description: "Une pôle sensuelle et assumée, en talons ou pieds nus. Travail du flow, de l'attitude et de la confiance en soi.",
    illustration: poleExotiqueIllustration
  }
];

export const coursInfos = {
  prerequis: {
    titre: "Besoin d'un PRÉ-REQUIS ?",
    soustitre: "Aucun pré-requis n'est nécessaire pour commencer la pôle dance.",
    description: "Les cours sont accessibles à tous les niveaux, même sans force, souplesse ou expérience en danse. Chacun évolue à son rythme, dans un cadre bienveillant et progressif.",
    image: ''
  },
  apport: {
    titre: "L'apport de la Pole Dance ?",
    description: "La pôle dance est une discipline complète qui renforce le corps et l'esprit. Elle améliore la force, la souplesse, la coordination et la confiance en soi, tout en permettant une vraie expression corporelle et un dépassement personnel.",
    image: ''
  }
};
