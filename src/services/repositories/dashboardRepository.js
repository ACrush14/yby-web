import {
  MOCK_DASHBOARD_METRICS_YEAR,
  MOCK_DASHBOARD_METRICS_MONTH,
  MOCK_DASHBOARD_METRICS_WEEK,
} from '../mock/mockData.js';

/**
 * Repositório de Métricas do Dashboard.
 * Aplica filtros de período ('year' | 'month' | 'week'), PEV e tipo de resíduo.
 */
export const dashboardRepository = {
  /**
   * Obtém métricas do dashboard calculadas de acordo com os filtros.
   * @param {Object} filters
   * @param {string} [filters.quickFilter] - 'year' | 'month' | 'week'
   * @param {string|number} [filters.pev]
   * @param {string} [filters.waste]
   * @param {string} [filters.startDate]
   * @param {string} [filters.endDate]
   * @returns {Promise<Object>}
   */
  async getMetrics(filters = {}) {
    // Simula latência de rede realista para feedback visual de skeleton
    await new Promise((resolve) => setTimeout(resolve, 280));

    let baseData;
    if (filters.quickFilter === 'year') {
      baseData = MOCK_DASHBOARD_METRICS_YEAR;
    } else if (filters.quickFilter === 'week') {
      baseData = MOCK_DASHBOARD_METRICS_WEEK;
    } else if (filters.quickFilter === 'month') {
      baseData = MOCK_DASHBOARD_METRICS_MONTH;
    } else if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      const diffDays = Math.ceil((end - start) / (24 * 60 * 60 * 1000));
      if (diffDays <= 7) {
        baseData = MOCK_DASHBOARD_METRICS_WEEK;
      } else if (diffDays <= 31) {
        baseData = MOCK_DASHBOARD_METRICS_MONTH;
      } else {
        baseData = MOCK_DASHBOARD_METRICS_YEAR;
      }
    } else {
      baseData = MOCK_DASHBOARD_METRICS_MONTH;
    }

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
