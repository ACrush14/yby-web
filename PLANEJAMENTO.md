# 🌱 Projeto YBY — Planejamento e Documentação Geral

Este repositório contém o planejamento completo, documentação de domínio, mapeamento de telas, padrões de engenharia de software (**SOLID & GRASP**), estratégia de responsividade mobile e especificações do novo design para a **reformulação completa da plataforma YBY** (`somosyby.com` e `somosyby.com.br`) em **JavaScript**.

---

## 🔗 Links de Referência

* **Deploy Vercel (Produção):** [`https://yby-web.vercel.app`](https://yby-web.vercel.app)
* **Repositório GitHub:** [`https://github.com/ACrush14/yby-web`](https://github.com/ACrush14/yby-web)
* **Protótipo no Figma:** [Projeto YBY — Figma Prototype](https://www.figma.com/proto/smcM50NPk6mbS9j5uzONPP/Projeto-YBY?node-id=2-206&t=I8hdCf3hORwKR4Sx-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A206)
* **Sistema Atual (Produção):** [`https://somosyby.com/`](https://somosyby.com/)
* **Site Institucional Atual:** [`https://somosyby.com.br/`](https://somosyby.com.br/)
* **Backend / API (Strapi):** `https://back.somosyby.com/api`
* **Regras Globais do Agente no Projeto:** [`GEMINI.md`](./GEMINI.md)
* **Checklist e Backlog do Painel Administrativo:** [`TODO.md`](./TODO.md)

---

## 📂 Índice Completo da Documentação (`.md`)

1. [**01 - Visão Geral, Domínio e Regras de Negócio**](./docs/01-VISAO-GERAL-E-DOMINIO.md)
   * O que é a YBY Soluções Sustentáveis
   * Ecossistema (Site Institucional vs. Plataforma Web/Mobile)
   * Atores e Perfis de Acesso (`Admin`, `Gestor`, `Cliente/PEV`, `Cooperativa`)
   * Entidades do Domínio e Regras de Negócio (Conversão Volumétrica, Densidades L->Kg, Impacto Ambiental ESG)

2. [**02 - Mapeamento Completo das Telas (Sistema Atual)**](./docs/02-MAPEAMENTO-TELAS-SISTEMA-ATUAL.md)
   * Fluxos de Autenticação (`/signIn`, `/signIn-client`, `/forgot-password`, `/reset-password`)
   * Navegação e Menu Lateral dinâmico por perfil
   * Tela de **Relatórios** (Filtros, Tabela, Exportação PDF/Excel, Modais de Edição, Exclusão e Evidências Fotográficas)
   * Tela de **Planejamento** (Escala semanal Segunda a Sexta por PEV e Cooperativa)
   * Tela de **Dashboard** (Indicadores ESG, Gráficos, Relatório PDF e Gerador de Artes para Instagram Stories)
   * Telas de **Cadastro** e **Edição** (Clientes, Cooperativas e Gestores)
   * Tela **Ponto de Coleta / Cooperativa** (`/ponto-coleta` — fluxo mobile em campo com geolocalização, fotos e calculadora de coletores)

3. [**03 - Arquitetura Técnica e Mapeamento de API**](./docs/03-ARQUITETURA-E-API.md)
   * Stack tecnológica atual e integrações
   * Catálogo completo dos 39 endpoints do Backend (`https://back.somosyby.com/api`)
   * Estruturas de payload e contratos de dados

4. [**04 - Reformulação e Novo Design (Protótipo Figma -> Código)**](./docs/04-REFORMULACAO-NOVO-DESIGN.md)
   * Novo Design System e Paleta de Cores extraída do Figma
   * Matriz comparativa de evolução (Sistema Antigo vs. Novo Design no Figma)
   * Mapeamento tela a tela do protótipo (`2-206`, `31-430`, `35-452`, `35-496`, `104-1133`, `40-467`, `122-1141`, `42-531`, `44-622`, `44-1114`, `44-1197`)
   * Galeria completa de prints salvos em [`docs/figma-screens/`](./docs/figma-screens/)

5. [**05 - Padrões de Engenharia: SOLID, GRASP e Clean Architecture em JavaScript**](./docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md)
   * Arquitetura em 4 camadas (Views Puros, Controller Hooks, Domínio Puro em JS e Infraestrutura/Repositories)
   * Aplicação prática de cada letra do **SOLID** (`S`, `O`, `L`, `I`, `D`) no código do YBY
   * Aplicação prática dos 9 padrões **GRASP** (*Information Expert*, *Controller*, *Low Coupling*, *High Cohesion*, *Polymorphism*, *Pure Fabrication*, *Indirection*, *Protected Variations*)
   * Árvore de diretórios modular (`src/domain/`, `src/services/`, `src/shared/`, `src/features/`) e padrões de legibilidade com JSDoc

6. [**06 - Estratégia de Responsividade e Experiência Mobile (Celular, Tablet e Desktop)**](./docs/06-RESPONSIVIDADE-E-MOBILE.md)
   * Sistema de Breakpoints (`Mobile < 768px`, `Tablet 768px-1023px`, `Desktop >= 1024px`)
   * Adaptação responsiva detalhada para cada tela (incluindo **Cards Semanais Mobile** para o Planejamento, **Cards de Coleta Mobile** para Relatórios, Drawer lateral e Bottom Sheets)
   * Diretrizes de ergonomia de toque (*tap targets* >= 44px) e acessibilidade

7. [**07 - Agentes, Skills (`vercel-labs/skills`) e Roadmap de Implementação**](./docs/07-AGENTES-E-SKILLS-WORKFLOW.md)
   * Skills oficiais da Vercel instaladas no projeto (`.agents/skills/`): `vercel-composition-patterns`, `vercel-react-best-practices` e `web-design-guidelines`
   * Skill customizada do projeto: [`yby-architecture-and-design`](./.agents/skills/yby-architecture-and-design/SKILL.md)
   * Divisão de responsabilidades entre Subagentes e Roadmap faseado (Fases 1 a 6)

8. [**TODO — Backlog e Checklists do Painel Administrativo (Organizações & Usuários)**](./TODO.md)
   * Checklist detalhado para listagem, cadastro, edição e exclusão de Organizações (Cooperativas e Clientes)
   * Checklist detalhado para listagem e cadastro de Usuários com os 5 papéis específicos e vinculação única
   * Diretrizes de UX/UI, confirmações de exclusão, usabilidade touch e responsividade Desktop/Mobile

---

## ✅ Status do Planejamento & Implementação

- [x] Absorção do contexto institucional (`somosyby.com.br`) e da plataforma (`somosyby.com`)
- [x] Engenharia reversa e mapeamento de 100% das telas, filtros, botões, modais e rotas do sistema atual
- [x] Mapeamento de todos os endpoints da API (`back.somosyby.com/api`) e regras de negócio
- [x] Navegação completa no protótipo do Figma, captura de prints de todas as telas e documentação do novo Design System
- [x] Instalação das skills da Vercel (`vercel-labs/skills`) e criação da Skill e Rules (`GEMINI.md`) do projeto
- [x] Documentação completa da arquitetura **JavaScript + SOLID + GRASP** e **Responsividade Mobile** em `.md`
- [x] **Implementação do Novo YBY (JavaScript + React 18 + Vite + Tailwind + Lucide + Sonner + Recharts):**
  - [x] **Landing Page Institucional (`/`)**: Hero, 4 KPIs ESG, Como Funciona, Para Quem e Funcionalidades.
  - [x] **Jornada de Autenticação (`/signIn`, `/forgot-password`, `/verify-email`, `/reset-password`, `/signIn-client`)**: Layout Split-screen floresta/creme.
  - [x] **Dashboard Ambiental Reativo (`/dashboard`)**:
    - Filtros rápidos interativos em pílula (**"Mês atual"** vs. **"Semana Atual"**).
    - **Semana Atual:** Recalcula em tempo real o Consumo de Energia (`61.840,50 MWh`), Economia de Água (`148.220,10 L`), CO₂ evitado (`29.410,25 kg CO₂e`), Valor Climático Estimado (`R$ 1.340,80`), 4 KPIs secundários, Rosca de Resíduos com `16,4 mil kg` no centro, e evolução diária de Segunda a Sexta nos 3 gráficos.
    - **Mês atual:** Visão histórica semestral/mensal consolidada (`266.049,94 MWh`, `637.995,42 L`, `68,3 mil kg`).
    - Títulos, subtítulos e unidades de eixos adaptam-se dinamicamente conforme o período selecionado.
  - [x] **Sidebar com Submenus Expansíveis e Gestão de Perfil:**
    - Submenus expansíveis em acordeão para **Cadastro** (`Cliente`, `Cooperativa`, `Gestor`) posicionado antes de Planejamento.
    - Submenus expansíveis em acordeão para **Edição** (`Cliente`, `Cooperativa`, `Gestor`).
    - Sincronização bidirecional com a URL via `useSearchParams` (`?tab=cliente|cooperativa|gestor`).
    - **Card de Perfil do Usuário** no rodapé da Sidebar (acima de "Sair") exibindo avatar/foto, nome do usuário, e-mail/login e botão de Configurações (`⚙️`).
    - **Modal de Configurações da Conta (`AccountSettingsModal.jsx`)**: troca interativa de foto de perfil, alteração de nome, login/e-mail, e atualização de senha (com confirmação e feedback Sonner).
  - [x] **Identidade Visual Autêntica (Símbolo Oficial do YBY):**
    - Substituição de 100% dos emojis provisórios (`🌱`) pelo símbolo oficial e autêntico da YBY extraído do Figma e da plataforma.
    - Criação dos componentes modulares `YbyIcon.jsx` e `YbyLogo.jsx` com variantes de cores (`green`, `white`, `dark`, `black`).
    - Integração no `Sidebar`, `MobileHeader`, `AuthSplitLayout` (painel escuro com símbolo branco), `LandingPage` (navbar e rodapé) e `favicon.png`.
  - [x] **Planejamento Semanal (`/planejamento`)**: Tabela semanal no desktop + Cards semanais no celular, legenda por cooperativa, pílulas coloridas com busca interna, e detecção de status `Salvo` / `Não salvo`.
  - [x] **Relatórios (`/relatorios`)**: Tabela com zebra striping, badges verdes/beges, filtros em 2 linhas, modais de edição com justificativa obrigatória, galeria de fotos e confirmação de exclusão.
  - [x] **Cadastro Unificado (`/cadastro`)**: Abas em pílula (`Cliente`, `Cooperativa`, `Gestor`), busca de CEP automática (ViaCEP).
  - [x] **Edição Unificada (`/edicao`)**: Abas em pílula com seletor de busca e *Empty State* com lupa antes de selecionar.
  - [x] **Ponto de Coleta (`/ponto-coleta`)**: Rota mobile para cooperativas com lista de PEVs do dia, calculadora de densidade (L -> Kg), fotos e geolocalização.
- [x] **Build de Produção e Servidor de Desenvolvimento:** `npm run build` aprovado sem erros (6.6s) e testes ponta a ponta executados no navegador via Chrome DevTools.
