import React, { useState, useRef } from 'react';
import { X, Camera, Lock, User, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { InputField } from '@/shared/ui/InputField.jsx';
import { Button } from '@/shared/ui/Button.jsx';

/**
 * Modal de Configurações da Conta do Usuário.
 * Permite alterar foto de perfil, nome, e-mail e redefinir senha.
 */
export function AccountSettingsModal({ user, onClose, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('perfil'); // 'perfil' | 'senha'

  // Dados do Perfil
  const [name, setName] = useState(user?.name || 'Administrador YBY');
  const [email, setEmail] = useState(user?.email || 'admin@somosyby.com');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  // Senha
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        toast.success('Foto carregada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.info('Foto de perfil removida.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      avatar,
    };
    onUpdateUser(updated);
    toast.success('Perfil atualizado com sucesso!');
    onClose();
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error('Informe sua senha atual.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('A nova senha e a confirmação não coincidem.');
      return;
    }

    toast.success('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-yby-border shadow-popup relative">
        {/* Topo */}
        <div className="flex items-center justify-between border-b border-yby-border/60 pb-3 mb-5">
          <div>
            <h3 className="font-extrabold text-lg text-yby-heading">Configurações da Conta</h3>
            <p className="text-xs text-yby-muted mt-0.5">Gerencie seus dados pessoais, foto e segurança de acesso</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-yby-muted hover:text-yby-heading hover:bg-yby-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas internas */}
        <div className="flex items-center gap-2 mb-6 border-b border-yby-border/60 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('perfil')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'perfil'
                ? 'bg-yby-tint text-yby-primary shadow-sm'
                : 'text-yby-muted hover:text-yby-heading'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Dados & Foto
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('senha')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'senha'
                ? 'bg-yby-tint text-yby-primary shadow-sm'
                : 'text-yby-muted hover:text-yby-heading'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Alterar Senha
          </button>
        </div>

        {/* Conteúdo Aba 1: Dados & Foto */}
        {activeTab === 'perfil' && (
          <form onSubmit={handleSaveProfile} className="space-y-5">
            {/* Seletor de Foto de Perfil */}
            <div className="flex items-center gap-4 p-4 bg-yby-surface/40 rounded-xl border border-yby-border/60">
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yby-primary shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-yby-primary text-white font-extrabold text-xl flex items-center justify-center shadow-sm">
                    {name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-yby-border text-yby-primary shadow-sm hover:bg-yby-tint transition-colors"
                  title="Alterar foto"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-xs font-bold text-yby-heading block">Foto de perfil</span>
                <p className="text-[11px] text-yby-muted">PNG, JPG ou WEBP até 2MB</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-yby-primary hover:underline"
                  >
                    Mudar foto
                  </button>
                  {avatar && (
                    <>
                      <span className="text-xs text-yby-muted">·</span>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-xs font-semibold text-yby-danger hover:underline"
                      >
                        Remover
                      </button>
                    </>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <InputField
              label="Nome Completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              label="E-mail de Login"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                <Save className="w-4 h-4 mr-2" />
                Salvar Perfil
              </Button>
            </div>
          </form>
        )}

        {/* Conteúdo Aba 2: Alterar Senha */}
        {activeTab === 'senha' && (
          <form onSubmit={handleSavePassword} className="space-y-4">
            <InputField
              label="Senha Atual"
              required
              type={showCurrent ? 'text' : 'password'}
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="text-yby-muted hover:text-yby-heading p-1"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <InputField
              label="Nova Senha"
              required
              type={showNew ? 'text' : 'password'}
              placeholder="Mínimo 6 dígitos"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="text-yby-muted hover:text-yby-heading p-1"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <InputField
              label="Confirmar Nova Senha"
              required
              type={showNew ? 'text' : 'password'}
              placeholder="Repita a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-yby-border/60">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                <Lock className="w-4 h-4 mr-2" />
                Atualizar Senha
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
