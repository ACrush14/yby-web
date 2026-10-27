import { MOCK_PLANNING } from '../mock/mockData.js';

let planningStore = [...MOCK_PLANNING];

export const planningRepository = {
  async getAll() {
    return planningStore.map((item) => ({ ...item }));
  },

  async saveBatch(updatedRows = []) {
    updatedRows.forEach((row) => {
      const idx = planningStore.findIndex((p) => p.id === row.id);
      if (idx !== -1) {
        planningStore[idx] = { ...planningStore[idx], ...row };
      }
    });
    return [...planningStore];
  },
};
