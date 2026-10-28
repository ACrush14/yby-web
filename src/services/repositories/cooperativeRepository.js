import { MOCK_COOPERATIVES } from '../mock/mockData.js';

let cooperativesStore = [...MOCK_COOPERATIVES];

export const cooperativeRepository = {
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [...cooperativesStore];
  },

  async getById(id) {
    return cooperativesStore.find((c) => c.id === Number(id)) || null;
  },

  async create(data) {
    const newCoop = {
      id: Date.now(),
      shortName: data.name,
      ...data,
    };
    cooperativesStore.unshift(newCoop);
    return newCoop;
  },
};
