import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { AuthSplitLayout } from '../components/AuthSplitLayout.jsx';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success('Link enviado! Verifique seu e-mail.');
      navigate('/verify-email', { state: { email } });
    }, 600);
  };

  return (
    <AuthSplitLayout>
      <div className="flex flex-col items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-yby-tint text-yby-primary flex items-center justify-center mb-4 shadow-sm">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-yby-heading tracking-tight">
          Esqueceu sua senha?
        </h1>
        <p className="text-xs md:text-sm text-yby-muted mt-1">
          Informe o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="E-mail"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com.br"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          className="mt-2"
        >
          <span>Enviar link de recuperação</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => navigate('/signIn')}
        >
          Voltar para o login
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
