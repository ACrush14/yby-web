/**
 * Definição dos 5 Papéis Oficiais do Yby Impacta.
 * Cada papel possui identificador único, rótulos e tokens visuais (cor, fundo e borda)
 * para exibição em chips/badges distintivos.
 */
export const USER_ROLES = {
  GESTOR_YBY: {
    id: 'gestor_yby',
    label: 'Gestor Yby — YBY Manager',
    shortLabel: 'Gestor Yby',
    color: '#267332',
    bg: '#E6F0E8',
    border: '#B8D9BC',
  },
  COLABORADOR_YBY: {
    id: 'colaborador_yby',
    label: 'Colaborador Yby — YBY Worker',
    shortLabel: 'Colaborador Yby',
    color: '#3D8A4E',
    bg: '#EDF6EE',
    border: '#C5E3CA',
  },
  PRESIDENTE_COOPERATIVA: {
    id: 'presidente_cooperativa',
    label: 'Presidente da Cooperativa',
    shortLabel: 'Presidente da Cooperativa',
    color: '#005885',
    bg: '#E5F1F8',
    border: '#B3D7EB',
  },
  COLABORADOR_COOPERATIVA: {
    id: 'colaborador_cooperativa',
    label: 'Colaborador da Cooperativa — Worker da Cooperativa',
    shortLabel: 'Colaborador da Cooperativa',
    color: '#E65124',
    bg: '#FDF0EC',
    border: '#F8C8BA',
  },
  CLIENTE: {
    id: 'cliente',
    label: 'Cliente',
    shortLabel: 'Cliente',
    color: '#7A7067',
    bg: '#F4EFE6',
    border: '#D8D0C5',
  },
};

export const USER_ROLE_LIST = Object.values(USER_ROLES);

/**
 * Retorna as configurações visuais do papel do usuário.
 * @param {string} roleId
 * @returns {typeof USER_ROLES.CLIENTE}
 */
export function getUserRoleTheme(roleId) {
  const found = USER_ROLE_LIST.find(
    (r) => r.id === roleId || r.label.toLowerCase() === String(roleId).toLowerCase()
  );
  return found || USER_ROLES.CLIENTE;
}
