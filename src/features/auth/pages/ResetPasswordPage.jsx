import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { AuthSplitLayout } from '../components/AuthSplitLayout.jsx';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) return;
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Senha redefinida com sucesso! Faça login com a nova senha.');
      navigate('/signIn');
    }, 600);
  };

  return (
    <AuthSplitLayout
      badge="RECUPERAÇÃO DE ACESSO"
      headline="Sem problemas, vamos te ajudar a voltar."
    >
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-yby-heading tracking-tight">
          Digite sua nova senha
        </h1>
        <p className="text-xs md:text-sm text-yby-muted mt-1">
          Entre com sua nova senha
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nova Senha"
          required
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-yby-muted hover:text-yby-heading p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <InputField
          label="Confirmar Nova Senha"
          required
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Digite novamente a senha"
          className="bg-yby-tint/10"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          className="mt-2"
        >
          <span>Confirmar</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </AuthSplitLayout>
  );
}
