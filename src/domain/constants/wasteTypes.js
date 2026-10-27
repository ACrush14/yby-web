/**
 * Constantes de Tipos de Resíduos e Fatores de Conversão de Densidade (L -> Kg).
 * @see docs/01-VISAO-GERAL-E-DOMINIO.md
 */
export const WASTE_TYPES = {
  PLASTICO: { id: 1, name: 'Plástico', density: 1.41, color: '#267332' },
  PAPEL: { id: 2, name: 'Papel', density: 0.80, color: '#005885' },
  METAL: { id: 3, name: 'Metal', density: 2.70, color: '#E65124' },
  VIDRO: { id: 4, name: 'Vidro', density: 2.50, color: '#2A5C43' },
  RECICLAVEIS_GERAL: { id: 5, name: 'Recicláveis Geral', density: 1.40, color: '#267332' },
  ORGANICOS: { id: 6, name: 'Orgânicos', density: 1.10, color: '#7A7067' },
  OLEO: { id: 7, name: 'Óleo', density: 0.90, color: '#E65124' },
};

/**
 * Lista de todos os resíduos para selects e filtros.
 */
export const WASTE_LIST = Object.values(WASTE_TYPES);
