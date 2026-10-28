import { describe, it, expect, beforeEach } from 'vitest';
import { userRepository } from '@/services/repositories/userRepository.js';
import { organizationRepository } from '@/services/repositories/organizationRepository.js';
import { USER_ROLES } from '@/domain/constants/userRoles.js';

describe('Fluxo de Ciclo de Vida Completo do Usuário (Integração Repositório + Domínio)', () => {
  let initialCount = 0;

  beforeEach(async () => {
    const list = await userRepository.getAll();
    initialCount = list.length;
  });

  it('deve executar o fluxo completo: consulta -> filtro -> cadastro -> edição -> exclusão', async () => {
    // Passo 1: Listagem inicial
    const allUsers = await userRepository.getAll();
    expect(allUsers.length).toBeGreaterThan(0);

    // Passo 2: Busca por texto (nome ou e-mail)
    const searchResult = await userRepository.getAll({ search: 'Mariana' });
    expect(searchResult.length).toBeGreaterThan(0);
    expect(searchResult[0].name).toContain('Mariana');

    // Passo 3: Filtro por papel (Gestor Yby)
    const managers = await userRepository.getAll({ role: USER_ROLES.GESTOR_YBY.id });
    expect(managers.every((u) => u.role === USER_ROLES.GESTOR_YBY.id)).toBe(true);

    // Passo 4: Obtenção das organizações existentes para vincular no cadastro
    const organizations = await organizationRepository.getAll();
    expect(organizations.length).toBeGreaterThan(0);
    const selectedOrg = organizations[0];

    // Passo 5: Cadastro de um novo usuário vinculado à organização
    const newUserData = {
      name: 'Flávio Bezerra',
      email: 'flavio@cooperativa.org',
      role: USER_ROLES.PRESIDENTE_COOPERATIVA.id,
      organizationId: selectedOrg.id,
      organizationName: selectedOrg.name,
      organizationType: selectedOrg.type,
    };

    const createdUser = await userRepository.create(newUserData);
    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe('Flávio Bezerra');
    expect(createdUser.role).toBe(USER_ROLES.PRESIDENTE_COOPERATIVA.id);
    expect(createdUser.organizationId).toBe(selectedOrg.id);

    // Verifica se o novo usuário agora aparece na listagem geral
    const afterCreateList = await userRepository.getAll();
    expect(afterCreateList.length).toBe(initialCount + 1);
    expect(afterCreateList.some((u) => u.id === createdUser.id)).toBe(true);

    // Passo 6: Edição do usuário (atualiza o papel para Colaborador da Cooperativa)
    const updatePayload = {
      role: USER_ROLES.COLABORADOR_COOPERATIVA.id,
      name: 'Flávio Bezerra Silva',
    };
    const updatedUser = await userRepository.update(createdUser.id, updatePayload);
    expect(updatedUser.name).toBe('Flávio Bezerra Silva');
    expect(updatedUser.role).toBe(USER_ROLES.COLABORADOR_COOPERATIVA.id);

    // Passo 7: Exclusão do usuário com confirmação
    const isDeleted = await userRepository.delete(createdUser.id);
    expect(isDeleted).toBe(true);

    // Verifica que o usuário não existe mais na listagem
    const afterDeleteList = await userRepository.getAll();
    expect(afterDeleteList.length).toBe(initialCount);
    expect(afterDeleteList.some((u) => u.id === createdUser.id)).toBe(false);
  });
});
