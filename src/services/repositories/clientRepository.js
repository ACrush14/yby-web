import { MOCK_CLIENTS } from '../mock/mockData.js';

let clientsStore = [...MOCK_CLIENTS];

/**
 * Repositório de Clientes (PEVs).
 * Fornece interface desacoplada (DIP) com suporte a dados locais e API.
 */
export const clientRepository = {
  async getAll() {
    return [...clientsStore];
  },

  async getById(id) {
    return clientsStore.find((c) => c.id === Number(id)) || null;
  },

  async create(data) {
    const newClient = {
      id: Date.now(),
      name: data.social_name || data.name,
      ...data,
    };
    clientsStore.unshift(newClient);
    return newClient;
  },

  async update(id, data) {
    const idx = clientsStore.findIndex((c) => c.id === Number(id));
    if (idx === -1) throw new Error('Cliente não encontrado.');
    clientsStore[idx] = { ...clientsStore[idx], ...data };
    return clientsStore[idx];
  },
};
