# 07 — Agentes, Skills (`vercel-labs/skills`) e Roadmap de Implementação

Este documento explica como o ecossistema de **Skills de Agentes** (`https://github.com/vercel-labs/skills`) e a arquitetura de **Subagentes do Antigravity** estão configurados neste repositório para desenvolver o Projeto YBY com máxima qualidade.

---

## 🛠️ 1. Ecossistema `vercel-labs/skills` Instalado no Projeto

O CLI oficial da Vercel (`npx skills`) detecta nativamente o **Antigravity** e instala as skills dentro da pasta `.agents/skills/` na raiz do repositório.

### Skills Ativas no Repositório (`.agents/skills/`):

| Skill | Origem | Quando os Agentes a Utilizam |
| :--- | :--- | :--- |
| **`vercel-composition-patterns`** | `vercel-labs/agent-skills` | Ao estruturar componentes React reutilizáveis (Compound Components, Context Providers limpos, eliminação de dezenas de props booleanas confusas), alinhado com **SOLID (OCP/ISP)** e **GRASP**. |
| **`vercel-react-best-practices`** | `vercel-labs/agent-skills` | Ao escrever e revisar páginas, hooks, buscas de dados (evitar *waterfalls* de requisições no Dashboard/Relatórios), memoização e performance de listas/tabelas. |
| **`web-design-guidelines`** | `vercel-labs/agent-skills` | Ao auditar acessibilidade, contraste, navegação por teclado, estados de foco/hover, responsividade mobile (*tap targets* >= 44px) e polimento visual. |
| **`vercel-react-view-transitions`** | `vercel-labs/agent-skills` | Para transições suaves e fluidas entre páginas e estados visuais sem peso de bibliotecas externas complexas. |
| **`ask-sonner`** | `emilkowalski/skills` | Padrões de toasts e notificações elegantes para feedback em ações do usuário (salvar planejamento, cadastros, erros). |
| **`yby-architecture-and-design`** | **Customizada para o YBY** | Skill exclusiva do nosso projeto que ensina a qualquer agente os tokens de cor do novo Figma, as regras de negócio da YBY (densidades L->Kg, perfis RBAC) e as regras obrigatórias de **JavaScript + SOLID + GRASP**. |

### Como instalar novas Skills do catálogo `skills.sh` no futuro:
Sempre que quiser adicionar qualquer outra skill da comunidade Vercel Labs, basta rodar no terminal:
```bash
npx skills add vercel-labs/agent-skills --skill <nome-da-skill> -y
```

---

## 🤖 2. Divisão de Papéis entre Agentes (Subagents Workflow)

Quando iniciarmos a codificação, podemos trabalhar com **Agentes Especializados** (usando a capacidade nativa de subagentes do Antigravity) para manter cada parte do código limpa e revisada:

1. **Agente Arquiteto de Domínio & Infra (`Domain & API Engineer`):**
   * **Responsabilidade:** Construir a camada `src/domain/` (calculadoras de resíduos, regras de permissão RBAC, validadores) e `src/services/` (cliente HTTP, mappers do Strapi, repositórios e exportadores PDF/Excel/Stories).
   * **Foco:** JavaScript puro (ES6+), JSDoc completo, **Information Expert**, **Pure Fabrication**, **Protected Variations** e **Dependency Inversion (DIP)**.
2. **Agente de Design System & UI Responsiva (`UI & Design System Engineer`):**
   * **Responsabilidade:** Construir `src/styles/` e `src/shared/` (`AppShell`, `Sidebar` retrátil, `MobileHeader`, `Button`, `InputField`, `SelectField`, `PillTabs`, `Badge`, `Modal`, Gráficos).
   * **Foco:** Fidelidade 100% ao novo Figma, `vercel-composition-patterns`, `web-design-guidelines` e responsividade Mobile-First.
3. **Agente de Features (`Feature Developer`):**
   * **Responsabilidade:** Construir os módulos em `src/features/` (`landing`, `auth`, `dashboard`, `planejamento`, `relatorios`, `cadastro`, `edicao`, `ponto-coleta`) conectando Views (`.jsx`) aos seus respectivos Controller Hooks (`use...Controller.js`).
   * **Foco:** **Single Responsibility (SRP)**, **Controller Pattern (GRASP)** e **Low Coupling**.
4. **Agente Revisor de Qualidade & Testes (`QA & Browser Inspector`):**
   * **Responsabilidade:** Abrir a aplicação rodando localmente via `chrome-devtools`, testar em resolução Desktop (`1440px`) e Mobile (`375px`), verificar se todos os fluxos funcionam sem erros no console e validar legibilidade do código.

---

## 🗺️ 3. Roadmap Faseado de Implementação (Passo a Passo)

Para que você acompanhe cada entrega com tranquilidade e possa testar e revisar o código em pequenos blocos legíveis:

### **Fase 1 — Fundação, Setup JavaScript (Vite + React) e Design System Base**
- [x] Inicializar projeto React em **JavaScript (`.js` / `.jsx`)** com Vite e React Router v6.
- [x] Configurar variáveis CSS e tokens do novo Figma (`src/styles/tokens.js` e `global.css`).
- [x] Criar os componentes base do Design System (`Button`, `InputField`, `SelectField`, `Badge`, `PillTabs`, `Modal`, `EmptyState`).
- [x] Criar o `AppShell` responsivo (Sidebar retrátil com botão `<` no Desktop + Header/Drawer no Celular).

### **Fase 2 — Camada de Domínio (SOLID/GRASP) e Serviços de Dados**
- [x] Implementar `src/domain/` (constantes de resíduos e densidades, cores das cooperativas, calculadora de peso L->Kg, detector de status do Planejamento, políticas RBAC por perfil).
- [x] Implementar `src/services/` com suporte híbrido (**API Real `back.somosyby.com/api` + Modo Mock Seguro** para testar cadastros, edições e planejamentos à vontade sem afetar o banco de produção).

### **Fase 3 — Landing Page Institucional e Fluxo Completo de Autenticação**
- [x] Implementar **Landing Page (`node-id=2-206`)** 100% responsiva (Desktop e Celular).
- [x] Implementar **Login Principal (`node-id=31-430`)** e **Login da Cooperativa (`/signIn-client`)**.
- [x] Implementar a jornada completa de **Recuperação de Senha** (`Esqueceu sua senha 35-452` -> `Verifique seu e-mail 35-496` -> `Nova senha 104-1133`).

### **Fase 4 — Core Operacional: Planejamento Semanal e Cadastro/Edição Unificados**
- [x] Implementar **Novo Planejamento (`node-id=122-1141`)**: Tabela semanal no Desktop + Cards Semanais no Celular, com legenda de cores das cooperativas, pílula com busca interna, coluna `Status` (`✓ Salvo` / `● Não salvo`) e salvamento em lote.
- [x] Implementar **Cadastro Unificado (`node-id=44-622`)** com abas em pílula (`Cliente`, `Cooperativa`, `Gestor`) e busca automática de CEP (ViaCEP).
- [x] Implementar **Edição Unificada (`node-id=44-1114` e `44-1197`)** com *Empty State* de lupa e carregamento dinâmico do formulário.

### **Fase 5 — Inteligência e Auditoria: Relatórios e Dashboard Ambiental**
- [x] Implementar **Novos Relatórios (`node-id=42-531`)** com filtros padronizados, tabela zebra no Desktop + Cards no Celular, paginação `"Carregar mais"` e modais redesenhados (**Edição de Coleta com Justificativa**, **Exclusão** e **Galeria de Fotos**).
- [x] Implementar **Novo Dashboard (`node-id=40-467`)** com pílulas `"Mês atual"` / `"Semana Atual"`, 4 KPIs primários, Gráfico de Área, Gráfico de Rosca com peso total no centro, 4 KPIs secundários e Gráficos de Barra de Água e Energia.
- [x] Conectar os exportadores (**Excel `.xlsx`**, **Relatório PDF** e **Artes para Stories `.zip`**).

### **Fase 6 — Experiência Mobile de Campo (`/ponto-coleta`) e Revisão Final**
- [x] Implementar a tela **Ponto de Coleta (`/ponto-coleta`)** com o novo Design System otimizada para uso em celular pelas cooperativas (lista de PEVs do dia, calculadora de coletores, fotos e GPS).
- [x] Auditoria visual e de código completa (Desktop + Mobile).

---

### **Fase 7 — Refinamentos de UX, Navegação Avançada e Interatividade Dinâmica**
- [x] **Submenus Expansíveis de Cadastro e Edição:**
  - Opções dedicadas de `Cliente`, `Cooperativa` e `Gestor` dentro do menu `Cadastro`.
  - Posicionamento da opção `Cadastro` antes de `Planejamento` na Sidebar.
  - Opções dedicadas de `Cliente`, `Cooperativa` e `Gestor` dentro do menu `Edição`.
  - Sincronização automática entre o submenu clicado e as abas da tela via URL query params (`?tab=cliente|cooperativa|gestor`).
- [x] **Área de Perfil do Usuário e Configurações de Conta:**
  - Card de perfil no rodapé da Sidebar acima de "Sair", exibindo foto/iniciais, nome do usuário (`Mariana Silva`), e-mail (`mariana@somosyby.com`) e botão de engrenagem (`⚙️`).
  - Modal interativo de configurações da conta (`AccountSettingsModal.jsx`) permitindo:
    - Upload e alteração de foto de perfil em tempo real;
    - Alteração de nome e e-mail/login;
    - Alteração segura de senha com verificação de senha atual, nova senha e confirmação;
    - Notificações de feedback via Sonner toast.
- [x] **Dashboard Dinâmico e Reativo por Período ("Semana Atual" vs "Mês atual"):**
  - Ao clicar no botão em pílula **"Semana Atual"**, os indicadores e gráficos passam a refletir os dados discriminados da semana em tempo real:
    - **Consumo de energia:** `61.840,50 MWh`
    - **Economia de água:** `148.220,10 L`
    - **CO₂ evitado:** `29.410,25 kg CO₂e`
    - **Valor climático estimado:** `R$ 1.340,80`
    - **Rosca de resíduos:** Total centralizado de `16,4 mil kg` com percentuais da semana;
    - **4 KPIs secundários:** Benefício Socioambiental (`R$ 810,20`), Petróleo (`460.120,40 L`), Árvores poupadas (`138,50`), Espaço em aterro (`81,10 m³`);
    - **Gráficos com eixos diários:** Peso coletado por dia (`Seg` a `Sex`), Economia de água diária e Consumo de energia diário.
  - Ao clicar em **"Mês atual"**, os valores consolidados mensais/semestrais são restaurados suavemente.
- [x] **Build e Testes Ponta a Ponta:**
  - Build de produção (`npm run build`) validado com zero erros em ~6s.
  - Testes de navegação, cliques, expansão de menu e renderização validados via Chrome DevTools MCP.
