import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/shared/layout/AppShell.jsx';
import { LandingPage } from '@/features/landing/LandingPage.jsx';
import { LoginPage } from '@/features/auth/pages/LoginPage.jsx';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage.jsx';
import { VerifyEmailPage } from '@/features/auth/pages/VerifyEmailPage.jsx';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage.jsx';
import { CooperativeLoginPage } from '@/features/auth/pages/CooperativeLoginPage.jsx';
import { DashboardPage } from '@/features/dashboard/DashboardPage.jsx';
import { PlanejamentoPage } from '@/features/planejamento/PlanejamentoPage.jsx';
import { RelatoriosPage } from '@/features/relatorios/RelatoriosPage.jsx';
import { CadastroPage } from '@/features/cadastro/CadastroPage.jsx';
import { EdicaoPage } from '@/features/edicao/EdicaoPage.jsx';
import { PontoColetaPage } from '@/features/ponto-coleta/PontoColetaPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn" element={<LoginPage />} />
      <Route path="/signIn-client" element={<CooperativeLoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Rota Direta da Cooperativa em Campo */}
      <Route path="/ponto-coleta" element={<div className="p-4 bg-yby-cream min-h-screen"><PontoColetaPage /></div>} />

      {/* Rotas Internas com AppShell (Sidebar no Desktop + Drawer no Mobile) */}
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/planejamento" element={<PlanejamentoPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/edicao" element={<EdicaoPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
