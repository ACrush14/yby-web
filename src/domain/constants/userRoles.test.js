import { describe, it, expect } from 'vitest';
import { USER_ROLES, USER_ROLE_LIST, getUserRoleTheme } from './userRoles.js';

describe('USER_ROLES - Domínio de Perfis de Usuário', () => {
  it('deve conter exatamente os 5 papéis oficiais definidos no TODO.md', () => {
    expect(USER_ROLE_LIST).toHaveLength(5);
    expect(USER_ROLES.GESTOR_YBY).toBeDefined();
    expect(USER_ROLES.COLABORADOR_YBY).toBeDefined();
    expect(USER_ROLES.PRESIDENTE_COOPERATIVA).toBeDefined();
    expect(USER_ROLES.COLABORADOR_COOPERATIVA).toBeDefined();
    expect(USER_ROLES.CLIENTE).toBeDefined();
  });

  it('cada papel deve possuir id, rótulos e tokens visuais de cor e fundo', () => {
    USER_ROLE_LIST.forEach((role) => {
      expect(role.id).toBeTypeOf('string');
      expect(role.label).toBeTypeOf('string');
      expect(role.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(role.bg).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(role.border).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('getUserRoleTheme deve retornar o papel correspondente pelo id', () => {
    const gestor = getUserRoleTheme('gestor_yby');
    expect(gestor.id).toBe('gestor_yby');
    expect(gestor.color).toBe('#267332');

    const presidente = getUserRoleTheme('presidente_cooperativa');
    expect(presidente.id).toBe('presidente_cooperativa');
    expect(presidente.color).toBe('#005885');
  });

  it('getUserRoleTheme deve retornar CLIENTE como fallback para papéis desconhecidos', () => {
    const fallback = getUserRoleTheme('papel_inexistente');
    expect(fallback.id).toBe(USER_ROLES.CLIENTE.id);
  });
});
