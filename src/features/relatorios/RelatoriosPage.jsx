import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { useRelatoriosController } from './hooks/useRelatoriosController.js';
import { PageHeader } from '@/shared/layout/PageHeader.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { RelatoriosSkeleton } from '@/shared/ui/skeletons/RelatoriosSkeleton.jsx';
import { Skeleton } from '@/shared/ui/Skeleton.jsx';
import { RelatoriosFilterCard } from './components/RelatoriosFilterCard.jsx';
import { RelatoriosTable } from './components/RelatoriosTable.jsx';
import { EditCollectionModal } from './components/EditCollectionModal.jsx';
import { PhotoGalleryModal, DeleteConfirmModal } from './components/PhotoGalleryModal.jsx';

export function RelatoriosPage() {
  const {
    collections,
    cooperatives,
    wasteList,
    loading,
    filters,
    modals,
    actions,
  } = useRelatoriosController();

  if (loading && !collections?.length) {
    return <RelatoriosSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header com Ações de Exportação */}
      <PageHeader
        title="Relatórios"
        subtitle="Coletas registradas nos PEVs, com filtros por cooperativa, resíduo e período"
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={actions.handleExportExcel}
              className="w-full sm:w-auto"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar para Excel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={actions.handleExportPdf}
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar para PDF
            </Button>
          </>
        }
      />

      {/* Card de Filtros em 2 Linhas */}
      <RelatoriosFilterCard
        filters={filters}
        cooperatives={cooperatives}
        wasteList={wasteList}
      />

      {/* Tabela de Coletas com Zebra Striping */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-yby-border shadow-card p-6 divide-y divide-yby-border/40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-3.5 flex items-center justify-between gap-4">
              <Skeleton variant="text" className="w-12 h-4" />
              <Skeleton variant="text" className="w-36 h-4" />
              <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
              <Skeleton variant="text" className="w-20 h-4" />
              <Skeleton variant="text" className="w-24 h-4 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" className="w-8 h-8" />
                <Skeleton variant="circular" className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <RelatoriosTable
          collections={collections}
          onEdit={(item) => modals.setEditingItem(item)}
          onDelete={(id) => modals.setDeletingId(id)}
          onViewPhotos={(item) => modals.setPhotoItem(item)}
        />
      )}

      {/* Modais */}
      {modals.editingItem && (
        <EditCollectionModal
          item={modals.editingItem}
          onClose={() => modals.setEditingItem(null)}
          onSave={modals.handleSaveEdit}
        />
      )}

      {modals.photoItem && (
        <PhotoGalleryModal
          item={modals.photoItem}
          onClose={() => modals.setPhotoItem(null)}
        />
      )}

      {modals.deletingId && (
        <DeleteConfirmModal
          id={modals.deletingId}
          onClose={() => modals.setDeletingId(null)}
          onConfirm={modals.handleDelete}
        />
      )}
    </div>
  );
}
