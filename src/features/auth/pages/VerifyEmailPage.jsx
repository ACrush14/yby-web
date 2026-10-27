import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { AuthSplitLayout } from '../components/AuthSplitLayout.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'seu e-mail';

  const handleResend = () => {
    toast.success('Novo link enviado com sucesso!');
  };

  return (
    <AuthSplitLayout
      badge="RECUPERAÇÃO DE ACESSO"
      headline="Sem problemas, vamos te ajudar a voltar."
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-yby-tint text-yby-primary flex items-center justify-center mb-4 shadow-sm">
          <Check className="w-7 h-7 stroke-[3]" />
        </div>
        <h1 className="text-2xl font-extrabold text-yby-heading tracking-tight">
          Verifique seu e-mail
        </h1>
        <p className="text-xs md:text-sm text-yby-muted mt-2 leading-relaxed">
          Enviamos um link de recuperação para <strong className="text-yby-heading">{email}</strong>. Se não encontrar a mensagem, confira a caixa de spam.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          type="button"
          variant="primary"
          fullWidth
          onClick={() => navigate('/reset-password')}
        >
          Clique após confirmar seu endereço
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-xs text-yby-muted hover:text-yby-primary font-medium"
          >
            Não recebeu? <span className="font-bold text-yby-primary hover:underline">Reenviar e-mail</span>
          </button>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
