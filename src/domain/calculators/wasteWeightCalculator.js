import { WASTE_TYPES } from '../constants/wasteTypes.js';

/**
 * Converte volume (Litros) para peso (Kg) baseado na tabela de densidade oficial da YBY.
 * @param {number} quantity - Valor numérico
 * @param {'kg'|'L'} unit - Unidade original
 * @param {string} wasteKey - Chave ou nome do resíduo
 * @returns {number} Peso corrigido em Kg (arredondado em 2 casas decimais)
 */
export function calculateWeightInKg(quantity, unit, wasteKey) {
  const numQty = parseFloat(quantity) || 0;
  if (unit === 'kg' || unit === 'Kg') {
    return Math.round(numQty * 100) / 100;
  }

  // Encontra a densidade pelo nome ou chave
  const upperKey = String(wasteKey).toUpperCase().replace(/\s+/g, '_');
  const waste = WASTE_TYPES[upperKey] || Object.values(WASTE_TYPES).find(
    (w) => w.name.toLowerCase() === String(wasteKey).toLowerCase()
  );

  const factor = waste ? waste.density : 1.0;
  return Math.round(numQty * factor * 100) / 100;
}

/**
 * Calcula a soma total de peso de múltiplos itens de uma coleta.
 * @param {Array<{ weight_kg?: number, quantity?: number, unit?: string, waste?: string }>} items
 * @returns {number}
 */
export function calculateTotalWeight(items = []) {
  return items.reduce((acc, item) => {
    if (typeof item.weight_kg === 'number') {
      return acc + item.weight_kg;
    }
    return acc + calculateWeightInKg(item.quantity, item.unit, item.waste);
  }, 0);
}
