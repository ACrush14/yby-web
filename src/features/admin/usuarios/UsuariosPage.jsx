import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import { useUsuariosController } from './hooks/useUsuariosController.js';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { EmptyState } from '@/shared/ui/EmptyState.jsx';
import { UsuariosSkeleton } from '@/shared/ui/skeletons/UsuariosSkeleton.jsx';
import { UserFilterBar } from './components/UserFilterBar.jsx';
import { UserTable } from './components/UserTable.jsx';
import { UserMobileCard } from './components/UserMobileCard.jsx';
import { UserModal } from './components/UserModal.jsx';
import { DeleteUserModal } from './components/DeleteUserModal.jsx';

export function UsuariosPage() {
  const {
    users,
    organizations,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    saving,
    filters,
    modals,
    actions,
  } = useUsuariosController();

  if (loading && !users?.length) {
    return <UsuariosSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header com Ação de Adicionar Usuário */}
      <PageHeader
        title="Usuários"
        subtitle="Gerencie os usuários do sistema, perfis de acesso e vinculação a organizações"
        actions={
          <Button
            variant="primary"
            size="md"
            onClick={() => modals.setIsCreating(true)}
            className="w-full sm:w-auto"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Adicionar usuário
          </Button>
        }
      />

      {/* Barra de Filtros */}
      <UserFilterBar filters={filters} organizations={organizations} />

      {/* Conteúdo Principal */}
      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-yby-border p-8 shadow-card">
          <EmptyState
            icon={<Users className="w-6 h-6 stroke-[2.5]" />}
            title="Nenhum usuário encontrado"
            description="Tente ajustar os filtros de busca, papel ou organização vinculada."
            action={
              <Button variant="outline" size="sm" onClick={filters.handleClearFilters}>
                Limpar filtros de busca
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {/* Visualização Desktop (Tabela Completa) */}
          <div className="hidden md:block">
            <UserTable
              users={users}
              totalItems={totalItems}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onEdit={(user) => modals.setEditingUser(user)}
              onDelete={(user) => modals.setDeletingUser(user)}
            />
          </div>

          {/* Visualização Mobile (Cards Individuais) */}
          <div className="md:hidden space-y-3">
            {users.map((user) => (
              <UserMobileCard
                key={user.id}
                user={user}
                onEdit={(u) => modals.setEditingUser(u)}
                onDelete={(u) => modals.setDeletingUser(u)}
              />
            ))}

            {/* Paginação Mobile */}
            {totalPages > 1 && (
              <div className="pt-2 flex items-center justify-between text-xs text-yby-muted">
                <span>
                  Página {currentPage} de {totalPages} ({totalItems} total)
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modais de Cadastro/Edição e Exclusão */}
      {(modals.isCreating || modals.editingUser) && (
        <UserModal
          user={modals.editingUser}
          organizations={organizations}
          saving={saving}
          onClose={() => {
            modals.setIsCreating(false);
            modals.setEditingUser(null);
          }}
          onSave={actions.handleSave}
        />
      )}

      {modals.deletingUser && (
        <DeleteUserModal
          user={modals.deletingUser}
          onClose={() => modals.setDeletingUser(null)}
          onConfirm={actions.handleDelete}
        />
      )}
    </div>
  );
}
