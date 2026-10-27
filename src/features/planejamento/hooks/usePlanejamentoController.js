import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { planningRepository } from '@/services/repositories/planningRepository.js';
import { cooperativeRepository } from '@/services/repositories/cooperativeRepository.js';
import { hasUnsavedChanges } from '@/domain/calculators/planningStatusHelper.js';

export function usePlanejamentoController() {
  const [originalRows, setOriginalRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [planData, coopData] = await Promise.all([
          planningRepository.getAll(),
          cooperativeRepository.getAll(),
        ]);
        setOriginalRows(planData);
        setRows(planData);
        setCooperatives(coopData);
      } catch (err) {
        toast.error('Erro ao carregar planejamento semanal.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCellChange = (rowId, dayKey, coopShortName) => {
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [dayKey]: coopShortName } : r))
    );
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      await planningRepository.saveBatch(rows);
      setOriginalRows(rows.map((r) => ({ ...r })));
      toast.success('Todas as alterações de planejamento foram salvas com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar alterações do planejamento.');
    } finally {
      setSaving(false);
    }
  };

  // Filtra por termo de busca
  const filteredRows = rows.filter((r) =>
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcula se há alterações pendentes no total
  const totalUnsaved = rows.filter((r) => {
    const orig = originalRows.find((o) => o.id === r.id);
    return orig ? hasUnsavedChanges(orig, r) : false;
  }).length;

  return {
    rows: filteredRows,
    originalRows,
    cooperatives,
    searchTerm,
    setSearchTerm,
    loading,
    saving,
    totalUnsaved,
    handleCellChange,
    handleSaveAll,
  };
}
