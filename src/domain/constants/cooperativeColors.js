/**
 * Mapeamento de cores das Cooperativas conforme o protótipo do Figma.
 * @see docs/04-REFORMULACAO-NOVO-DESIGN.md
 */
export const COOPERATIVE_COLORS = {
  YBY: {
    id: 1,
    name: 'Yby Soluções Sustentáveis',
    shortName: 'Yby',
    color: '#267332', // Verde
    bg: '#E6F0E8',
    border: '#B8DCBF',
  },
  COOCENCIPE: {
    id: 2,
    name: 'Coocencipe',
    shortName: 'Coocencipe',
    color: '#005885', // Azul
    bg: '#E5F1F8',
    border: '#B3D7EC',
  },
  REDE_CEARA: {
    id: 3,
    name: 'Rede Ceará',
    shortName: 'Rede Ceará',
    color: '#E65124', // Laranja
    bg: '#FDF0EC',
    border: '#F7C6B8',
  },
  ROSA_VIRGINIA: {
    id: 4,
    name: 'Rosa Virginia',
    shortName: 'Rosa Virginia',
    color: '#2A5C43', // Verde Escuro / Azul Petróleo
    bg: '#E9F1ED',
    border: '#BDD8CB',
  },
};

/**
 * Retorna as cores da cooperativa pelo nome ou padrão neutro.
 * @param {string} coopName
 */
export function getCooperativeTheme(coopName) {
  if (!coopName) {
    return {
      color: '#7A7067',
      bg: '#F4EFE6',
      border: '#E6DFD3',
    };
  }
  const match = Object.values(COOPERATIVE_COLORS).find(
    (c) => c.shortName.toLowerCase() === coopName.toLowerCase() || c.name.toLowerCase().includes(coopName.toLowerCase())
  );
  return match || {
    color: '#3D2E28',
    bg: '#F4EFE6',
    border: '#E6DFD3',
  };
}
