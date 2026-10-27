import {
  MOCK_DASHBOARD_METRICS_MONTH,
  MOCK_DASHBOARD_METRICS_WEEK,
} from '../mock/mockData.js';

/**
 * Repositório de Métricas do Dashboard.
 * Aplica filtros de período ('week' | 'month'), PEV e tipo de resíduo.
 */
export const dashboardRepository = {
  /**
   * Obtém métricas do dashboard calculadas de acordo com os filtros.
   * @param {Object} filters
   * @param {string} [filters.quickFilter] - 'week' | 'month'
   * @param {string|number} [filters.pev]
   * @param {string} [filters.waste]
   * @param {string} [filters.startDate]
   * @param {string} [filters.endDate]
   * @returns {Promise<Object>}
   */
  async getMetrics(filters = {}) {
    const isWeek =
      filters.quickFilter === 'week' ||
      (filters.startDate &&
        filters.endDate &&
        new Date(filters.endDate) - new Date(filters.startDate) <= 7 * 24 * 60 * 60 * 1000);

    const baseData = isWeek ? MOCK_DASHBOARD_METRICS_WEEK : MOCK_DASHBOARD_METRICS_MONTH;
    const cloned = JSON.parse(JSON.stringify(baseData));

    // Se houver filtro por tipo de resíduo, destaca ou recalcula distribuição
    if (filters.waste) {
      const selectedItem = cloned.wasteDistribution.items.find((i) => i.name === filters.waste);
      if (selectedItem) {
        cloned.wasteDistribution.items = [
          selectedItem,
          ...cloned.wasteDistribution.items.filter((i) => i.name !== filters.waste),
        ];
      }
    }

    return cloned;
  },
};
