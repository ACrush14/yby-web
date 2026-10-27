/**
 * Especialista de informação para o status do Planejamento Semanal.
 * @see docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md
 */

/**
 * Conta quantos dias da semana possuem cooperativa atribuída.
 * @param {{ seg?: string, ter?: string, qua?: string, qui?: string, sex?: string }} days
 * @returns {number} Quantidade de dias (0 a 5)
 */
export function countAssignedDays(days = {}) {
  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  return weekDays.filter((d) => Boolean(days[d] && days[d].trim())).length;
}

/**
 * Retorna o texto formatado "X de 5 dias com cooperativa".
 * @param {{ seg?: string, ter?: string, qua?: string, qui?: string, sex?: string }} days
 * @returns {string}
 */
export function formatAssignedDaysLabel(days = {}) {
  const count = countAssignedDays(days);
  return `${count} de 5 dias com cooperativa`;
}

/**
 * Verifica se uma linha do planejamento possui alterações pendentes de salvamento.
 * @param {object} originalDays
 * @param {object} currentDays
 * @returns {boolean}
 */
export function hasUnsavedChanges(originalDays = {}, currentDays = {}) {
  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  return weekDays.some((d) => (originalDays[d] || '') !== (currentDays[d] || ''));
}
