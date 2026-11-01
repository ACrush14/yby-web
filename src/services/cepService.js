/**
 * Serviço de integração com o ViaCEP para consulta e preenchimento automático de endereço.
 * @see docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md
 */

export const UF_TO_STATE_NAME = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export const BRAZILIAN_STATES = Object.values(UF_TO_STATE_NAME);

/**
 * Formata uma sequência de dígitos como CEP no padrão 00000-000.
 * @param {string} value
 * @returns {string}
 */
export function formatCep(value = '') {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * Serviço externo de CEP
 */
export const cepService = {
  /**
   * Consulta os dados de endereço na API pública do ViaCEP.
   * @param {string} cep - CEP formatado ou somente dígitos
   * @returns {Promise<{ cep: string, street: string, neighborhood: string, city: string, state: string, uf: string } | null>}
   */
  async getAddressByCep(cep) {
    const rawCep = String(cep || '').replace(/\D/g, '');
    if (rawCep.length !== 8) return null;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      if (!response.ok) return null;

      const data = await response.json();
      if (data.erro || data.erro === 'true') return null;

      const stateName = data.estado || UF_TO_STATE_NAME[data.uf] || data.uf || '';

      return {
        cep: formatCep(rawCep),
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: stateName,
        uf: data.uf || '',
      };
    } catch (error) {
      // Em caso de falha de conexão ou rede offline
      return null;
    }
  },
};
