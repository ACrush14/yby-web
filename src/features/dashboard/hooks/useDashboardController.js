import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { dashboardRepository } from '@/services/repositories/dashboardRepository.js';
import { clientRepository } from '@/services/repositories/clientRepository.js';
import { WASTE_LIST } from '@/domain/constants/wasteTypes.js';

/**
 * Controller Hook do Dashboard.
 * Orquestra filtros, chamadas assíncronas e ações de exportação.
 */
export function useDashboardController() {
  const [metrics, setMetrics] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [pev, setPev] = useState('');
  const [waste, setWaste] = useState('');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');
  const [quickFilter, setQuickFilter] = useState('month'); // 'month' | 'week' | ''

  // Carrega lista de clientes (PEVs) no carregamento inicial
  useEffect(() => {
    async function loadInitial() {
      try {
        const clientData = await clientRepository.getAll();
        setClients(clientData);
      } catch (err) {
        toast.error('Erro ao carregar lista de PEVs.');
      }
    }
    loadInitial();
  }, []);

  // Recarrega as métricas dinamicamente sempre que os filtros mudarem
  useEffect(() => {
    let isCancelled = false;

    async function fetchMetrics() {
      try {
        const dashData = await dashboardRepository.getMetrics({
          quickFilter,
          pev,
          waste,
          startDate,
          endDate,
        });

        if (!isCancelled) {
          setMetrics(dashData);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          toast.error('Erro ao carregar dados do dashboard.');
          setLoading(false);
        }
      }
    }

    fetchMetrics();

    return () => {
      isCancelled = true;
    };
  }, [quickFilter, pev, waste, startDate, endDate]);

  const handleApplyQuickFilter = (type) => {
    setQuickFilter(type);
    if (type === 'month') {
      setStartDate('2026-10-01');
      setEndDate('2026-10-31');
      toast.info('Filtrado por: Mês atual');
    } else if (type === 'week') {
      setStartDate('2026-10-12');
      setEndDate('2026-10-18');
      toast.info('Filtrado por: Semana Atual');
    }
  };

  const handleExportStories = () => {
    toast.success('Gerando pacote de artes para Instagram Stories (1080x1920 .zip)...');
  };

  const handleExportPdf = () => {
    toast.success('Gerando Relatório Ambiental Executivo em PDF...');
  };

  return {
    metrics,
    clients,
    wasteList: WASTE_LIST,
    loading,
    filters: {
      pev,
      setPev,
      waste,
      setWaste,
      startDate,
      setStartDate: (val) => {
        setStartDate(val);
        setQuickFilter('');
      },
      endDate,
      setEndDate: (val) => {
        setEndDate(val);
        setQuickFilter('');
      },
      quickFilter,
      handleApplyQuickFilter,
    },
    actions: {
      handleExportStories,
      handleExportPdf,
    },
  };
}
