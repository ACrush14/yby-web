import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { organizationRepository } from '@/services/repositories/organizationRepository.js';

export function useOrganizacoesController() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Filtros
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Todas');
  const [status, setStatus] = useState('Todos');

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modais
  const [isCreating, setIsCreating] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [deletingOrg, setDeletingOrg] = useState(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await organizationRepository.getAll({ search, type, status });
      setOrganizations(data);
    } catch (err) {
      toast.error('Erro ao carregar organizações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    setCurrentPage(1);
  }, [search, type, status]);

  const handleToggleStatus = async (org) => {
    try {
      const updated = await organizationRepository.toggleStatus(org.id);
      setOrganizations((prev) =>
        prev.map((item) => (item.id === org.id ? { ...item, status: updated.status } : item))
      );
      toast.success(
        `Status da organização "${org.shortName || org.name}" alterado para ${updated.status}.`
      );
    } catch (err) {
      toast.error('Erro ao atualizar status.');
    }
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      if (editingOrg) {
        const updated = await organizationRepository.update(editingOrg.id, formData);
        setOrganizations((prev) =>
          prev.map((item) => (item.id === editingOrg.id ? updated : item))
        );
        toast.success(`Organização "${updated.name}" atualizada com sucesso!`);
        setEditingOrg(null);
      } else {
        const created = await organizationRepository.create(formData);
        setOrganizations((prev) => [created, ...prev]);
        toast.success(`Organização "${created.name}" cadastrada com sucesso!`);
        setIsCreating(false);
      }
    } catch (err) {
      toast.error('Erro ao salvar organização.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingOrg) return;
    try {
      await organizationRepository.delete(deletingOrg.id);
      setOrganizations((prev) => prev.filter((item) => item.id !== deletingOrg.id));
      toast.success(`Organização "${deletingOrg.name}" excluída com sucesso.`);
    } catch (err) {
      toast.error('Erro ao excluir organização.');
    } finally {
      setDeletingOrg(null);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setType('Todas');
    setStatus('Todos');
  };

  // Itens paginados
  const totalItems = organizations.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedOrgs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return organizations.slice(start, start + pageSize);
  }, [organizations, currentPage, pageSize]);

  return {
    organizations: paginatedOrgs,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    saving,
    filters: {
      search,
      setSearch,
      type,
      setType,
      status,
      setStatus,
      handleClearFilters,
    },
    modals: {
      isCreating,
      setIsCreating,
      editingOrg,
      setEditingOrg,
      deletingOrg,
      setDeletingOrg,
    },
    actions: {
      handleToggleStatus,
      handleSave,
      handleDelete,
      refresh: fetchOrganizations,
    },
  };
}
