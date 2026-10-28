import { describe, it, expect } from 'vitest';
import { userRepository } from './userRepository.js';
import { USER_ROLES } from '@/domain/constants/userRoles.js';

describe('userRepository - Gestão de Usuários', () => {
  it('deve listar usuários cadastrados contemplando os papéis do sistema', async () => {
    const list = await userRepository.getAll();
    expect(list.length).toBeGreaterThan(0);

    const rolesFound = new Set(list.map((u) => u.role));
    expect(rolesFound.has(USER_ROLES.GESTOR_YBY.id)).toBe(true);
    expect(rolesFound.has(USER_ROLES.COLABORADOR_YBY.id)).toBe(true);
    expect(rolesFound.has(USER_ROLES.PRESIDENTE_COOPERATIVA.id)).toBe(true);
    expect(rolesFound.has(USER_ROLES.COLABORADOR_COOPERATIVA.id)).toBe(true);
    expect(rolesFound.has(USER_ROLES.CLIENTE.id)).toBe(true);
  });

  it('deve filtrar usuários por papel (role)', async () => {
    const gestores = await userRepository.getAll({ role: USER_ROLES.GESTOR_YBY.id });
    expect(gestores.length).toBeGreaterThan(0);
    expect(gestores.every((u) => u.role === USER_ROLES.GESTOR_YBY.id)).toBe(true);

    const clientes = await userRepository.getAll({ role: USER_ROLES.CLIENTE.id });
    expect(clientes.length).toBeGreaterThan(0);
    expect(clientes.every((u) => u.role === USER_ROLES.CLIENTE.id)).toBe(true);
  });

  it('deve buscar usuário por nome ou e-mail', async () => {
    const result = await userRepository.getAll({ search: 'mariana@somosyby.com' });
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].email).toBe('mariana@somosyby.com');
  });

  it('deve criar, atualizar e excluir um usuário', async () => {
    // 1. Criar
    const created = await userRepository.create({
      name: 'Usuário Teste Unitário',
      email: 'teste@unitario.com',
      role: USER_ROLES.COLABORADOR_YBY.id,
      organizationId: 'coop-1',
      organizationName: 'Yby Soluções Sustentáveis',
      organizationType: 'Cooperativa',
    });
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Usuário Teste Unitário');

    // 2. Atualizar
    const updated = await userRepository.update(created.id, {
      name: 'Nome Atualizado',
      role: USER_ROLES.GESTOR_YBY.id,
    });
    expect(updated.name).toBe('Nome Atualizado');
    expect(updated.role).toBe(USER_ROLES.GESTOR_YBY.id);

    // 3. Excluir
    const deleted = await userRepository.delete(created.id);
    expect(deleted).toBe(true);

    const check = await userRepository.getById(created.id);
    expect(check).toBeNull();
  });
});
