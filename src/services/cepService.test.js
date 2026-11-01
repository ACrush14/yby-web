import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cepService, formatCep, UF_TO_STATE_NAME } from './cepService.js';

describe('cepService - Consulta de Endereço via ViaCEP', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('formata o CEP corretamente com máscara XXXXX-XXX', () => {
    expect(formatCep('60160230')).toBe('60160-230');
    expect(formatCep('60160-230')).toBe('60160-230');
    expect(formatCep('601')).toBe('601');
    expect(formatCep('')).toBe('');
  });

  it('retorna null se o CEP não possuir 8 dígitos numéricos', async () => {
    const result = await cepService.getAddressByCep('123');
    expect(result).toBeNull();
  });

  it('deve buscar e preencher dados de endereço quando o CEP for válido', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        cep: '60160-230',
        logradouro: 'Avenida Dom Luís',
        bairro: 'Meireles',
        localidade: 'Fortaleza',
        uf: 'CE',
        estado: 'Ceará',
      }),
    });

    const result = await cepService.getAddressByCep('60160-230');

    expect(result).toEqual({
      cep: '60160-230',
      street: 'Avenida Dom Luís',
      neighborhood: 'Meireles',
      city: 'Fortaleza',
      state: 'Ceará',
      uf: 'CE',
    });
    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/60160230/json/');
  });

  it('retorna null quando o ViaCEP reportar erro: true', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        erro: 'true',
      }),
    });

    const result = await cepService.getAddressByCep('99999-999');
    expect(result).toBeNull();
  });

  it('mapeia a sigla UF para o nome por extenso do estado', () => {
    expect(UF_TO_STATE_NAME['CE']).toBe('Ceará');
    expect(UF_TO_STATE_NAME['SP']).toBe('São Paulo');
    expect(UF_TO_STATE_NAME['RJ']).toBe('Rio de Janeiro');
  });
});
