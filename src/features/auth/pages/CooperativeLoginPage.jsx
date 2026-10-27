import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { AuthSplitLayout } from '../components/AuthSplitLayout.jsx';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function CooperativeLoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('coop2026');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          jwt: 'mock-coop-jwt',
          user: {
            id: 99,
            username: 'cooperativa.equipe',
            cooperative_id: 2,
            role: 'cooperativa',
          },
        })
      );
      setLoading(false);
      toast.success('Acesso concedido! Carregando rotas de hoje.');
      navigate('/ponto-coleta');
    }, 500);
  };

  return (
    <AuthSplitLayout
      badge="ACESSO DAS COOPERATIVAS"
      headline="Rotas e apontamentos em tempo real."
      description="Informe seu código de acesso institucional para visualizar os PEVs da semana e apontar coletas."
    >
      <div className="flex flex-col items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-yby-tint text-yby-primary flex items-center justify-center mb-4 shadow-sm">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-yby-heading tracking-tight">
          Acesso da Cooperativa
        </h1>
        <p className="text-xs md:text-sm text-yby-muted mt-1">
          Digite o código de acesso fornecido pela administração.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Código de acesso"
          required
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ex: coop2026"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          className="mt-2"
        >
          <span>Entrar no Ponto de Coleta</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-yby-border/60 text-center">
        <Link
          to="/signIn"
          className="text-xs font-semibold text-yby-muted hover:text-yby-primary transition-colors"
        >
          Voltar para o login administrativo
        </Link>
      </div>
    </AuthSplitLayout>
  );
}
