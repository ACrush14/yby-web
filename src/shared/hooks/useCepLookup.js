import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { cepService, formatCep } from '@/services/cepService.js';

/**
 * Hook reutilizável para busca e preenchimento automático de endereço via CEP.
 * @param {(address: { street: string, neighborhood: string, city: string, state: string, uf: string, cep: string }) => void} onAddressFound
 */
export function useCepLookup(onAddressFound) {
  const [loading, setLoading] = useState(false);

  const lookupCep = useCallback(
    async (cepInput) => {
      const raw = String(cepInput || '').replace(/\D/g, '');
      if (raw.length !== 8) return null;

      try {
        setLoading(true);
        const address = await cepService.getAddressByCep(raw);
        if (address) {
          if (onAddressFound) {
            onAddressFound(address);
          }
          toast.success(
            address.street
              ? `Endereço localizado: ${address.street}, ${address.city} - ${address.uf}`
              : `Cidade/Estado localizados: ${address.city} - ${address.uf}`
          );
          return address;
        } else {
          toast.warning('CEP não localizado no ViaCEP. Por favor, preencha o endereço manualmente.');
          return null;
        }
      } catch (err) {
        toast.error('Erro ao consultar CEP.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [onAddressFound]
  );

  return {
    loading,
    lookupCep,
    formatCep,
  };
}
