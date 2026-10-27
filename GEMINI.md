# 🌱 Diretrizes do Projeto YBY (Rules Globais do Repositório)

Este arquivo define as regras permanentes que o Antigravity e todos os seus subagentes devem seguir ao trabalhar neste repositório.

## 1. Documentação de Referência Obrigatória
Antes de criar ou alterar qualquer funcionalidade, consulte os documentos de arquitetura e negócio em [`PLANEJAMENTO.md`](./PLANEJAMENTO.md):
- [`docs/01-VISAO-GERAL-E-DOMINIO.md`](./docs/01-VISAO-GERAL-E-DOMINIO.md) — Domínio, perfis de acesso (`Admin`, `Gestor`, `Cliente/PEV`, `Cooperativa`) e regras de negócio (conversão L -> Kg).
- [`docs/02-MAPEAMENTO-TELAS-SISTEMA-ATUAL.md`](./docs/02-MAPEAMENTO-TELAS-SISTEMA-ATUAL.md) — Todas as funcionalidades e modais que devem ser preservados do sistema legado.
- [`docs/03-ARQUITETURA-E-API.md`](./docs/03-ARQUITETURA-E-API.md) — Todos os 39 endpoints da API Strapi (`https://back.somosyby.com/api`).
- [`docs/04-REFORMULACAO-NOVO-DESIGN.md`](./docs/04-REFORMULACAO-NOVO-DESIGN.md) — Especificação visual e prints do novo protótipo do Figma.
- [`docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md`](./docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md) — Arquitetura em camadas, aplicação de **SOLID**, **GRASP** e estrutura de pastas em JavaScript.
- [`docs/06-RESPONSIVIDADE-E-MOBILE.md`](./docs/06-RESPONSIVIDADE-E-MOBILE.md) — Comportamento responsivo (Celular, Tablet e Desktop) de cada tela.
- [`docs/07-AGENTES-E-SKILLS-WORKFLOW.md`](./docs/07-AGENTES-E-SKILLS-WORKFLOW.md) — Skills instaladas (`vercel-labs/skills`) e roadmap de implementação.

## 2. Regras de Engenharia de Código
1. **Linguagem:** Utilizar **JavaScript (ES6+ — `.js` e `.jsx`)** com comentários **JSDoc** claros nas funções de domínio e serviços para facilitar a leitura e o autocomplete.
2. **SOLID e GRASP Obrigatórios:**
   - **Separação estrita entre View e Lógica:** Componentes `.jsx` são puramente visuais; toda orquestração de estado fica em *Controller Hooks* (`use...Controller.js`), toda regra de negócio/cálculo fica em `src/domain/`, e toda comunicação externa fica em `src/services/`.
   - **Alta Coesão e Arquivos Enxutos:** Evitar arquivos maiores que 150–200 linhas. Cada arquivo deve ter uma única responsabilidade clara.
3. **Responsividade (Web + Celular):**
   - Toda página, incluindo a **Landing Page** e as telas internas (`Dashboard`, `Planejamento`, `Relatórios`, `Cadastro`, `Edição`, `Ponto de Coleta`), deve ser **100% responsiva para celular e desktop**.
4. **Segurança com o Ambiente de Produção:**
   - Nunca disparar requisições destrutivas (`DELETE` ou alterações não autorizadas) contra os dados reais de produção em `https://back.somosyby.com/api` durante testes automatizados.
