import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Sidebar } from './Sidebar.jsx';
import { MobileHeader } from './MobileHeader.jsx';
import { RouteSkeleton } from '@/shared/ui/skeletons/RouteSkeleton.jsx';

/**
 * Shell principal para as páginas autenticadas da aplicação.
 * Responsivo: Sidebar retrátil no Desktop e Drawer no Celular.
 * Inclui transição suave com Skeletons entre páginas.
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosingMobile, setIsClosingMobile] = useState(false);
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const previousPath = useRef(location.pathname);

  const handleOpenMobile = () => {
    setIsClosingMobile(false);
    setMobileOpen(true);
  };

  const handleCloseMobile = () => {
    setIsClosingMobile(true);
    setTimeout(() => {
      setMobileOpen(false);
      setIsClosingMobile(false);
    }, 200);
  };

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Toaster richColors position="top-right" />

      {/* Sidebar para telas médias e grandes (Desktop e Tablet) */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Drawer deslizante para Celular com animação suave */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm ${
              isClosingMobile ? 'animate-drawer-fade-out' : 'animate-drawer-fade'
            }`}
            onClick={handleCloseMobile}
          />
          <div
            className={`relative z-50 h-full ${
              isClosingMobile ? 'animate-drawer-slide-out' : 'animate-drawer-slide'
            }`}
          >
            <Sidebar
              collapsed={false}
              onToggleCollapse={handleCloseMobile}
              onItemClick={handleCloseMobile}
              className="h-full shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <MobileHeader onOpenDrawer={handleOpenMobile} />
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {isNavigating ? (
            <div className="animate-in fade-in duration-150">
              <RouteSkeleton pathname={location.pathname} />
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
