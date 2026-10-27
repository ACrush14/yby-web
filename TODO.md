# 📋 TODO — Painel Administrativo Yby Impacta (Organizações & Usuários)

Este documento centraliza todos os requisitos, tarefas, fluxos visuais e critérios de aceitação para o desenvolvimento e revisão do **Painel Administrativo do Yby Impacta**, contemplando os módulos de **Organizações** e **Usuários**.

---

## 🎯 Visão Geral e Objetivos

* **Objetivo Geral:** Desenvolver a estrutura visual e os fluxos de navegação do **Painel Administrativo do Yby Impacta**, centralizando o acesso às funcionalidades administrativas essenciais.
* **Módulos Principais:**
  1. **Estrutura e Navegação do Painel Administrativo**
  2. **Gerenciamento de Organizações** (Listagem, Cadastro, Edição e Exclusão)
  3. **Gerenciamento de Usuários** (Listagem, Cadastro com os 5 Papéis e Vinculação de Organização)
* **Padrões de Referência:**
  * Design System e Tokens: [`docs/04-REFORMULACAO-NOVO-DESIGN.md`](./docs/04-REFORMULACAO-NOVO-DESIGN.md)
  * Padrões de Engenharia (SOLID & GRASP): [`docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md`](./docs/05-PADROES-ENGENHARIA-SOLID-GRASP.md)
  * Diretrizes de Responsividade Mobile: [`docs/06-RESPONSIVIDADE-E-MOBILE.md`](./docs/06-RESPONSIVIDADE-E-MOBILE.md)
  * Planejamento Geral do Repositório: [`PLANEJAMENTO.md`](./PLANEJAMENTO.md)

---

## 📦 MÓDULO 1: Estrutura Principal e Navegação do Painel Administrativo

### Objetivo do Módulo
Criar a estrutura central do painel administrativo, disponibilizando navegação clara e coesa para os módulos de **Organizações** e **Usuários**, mantendo a identidade visual e ergonomia em qualquer dispositivo.

### Checklist de Tarefas & Verificação:

#### 1.1. Arquitetura de Layout e Navegação
- [ ] **Definir e criar a estrutura visual principal do Painel Administrativo:**
  - [ ] Integrar acesso aos módulos no menu lateral (`Sidebar`) e cabeçalho mobile (`MobileHeader`).
  - [ ] Garantir que o administrador compreenda claramente como alternar entre Organizações e Usuários.
  - [ ] Aplicar a identidade visual do **Yby Impacta** (fundo creme `#F4EFE6`, cabeçalhos escuros `#3D2E28`, acentos verdes `#267332` e o [símbolo oficial do YBY](./public/yby-icon-green.png)).
  - [ ] Exibir cabeçalho de página com título descritivo, subtítulo explicativo e botões de ação primária destacados.

#### 1.2. Responsividade e Adaptação para Dispositivos Móveis
- [ ] **Adaptação para Desktop (`>= 1024px`):**
  - [ ] Sidebar completa ou recolhida com navegação direta para `/admin/organizacoes` e `/admin/usuarios`.
  - [ ] Visualização ampla dos dados em grade tabular com filtros em linha.
- [ ] **Adaptação para Tablet (`768px - 1023px`):**
  - [ ] Sidebar retrátil (`72px`) ou Drawer deslizante com ícones destacados.
  - [ ] Filtros reorganizados em 2 colunas.
- [ ] **Adaptação para Celular (`< 768px`):**
  - [ ] Cabeçalho compacto com Drawer lateral acionado por menu hamburguer (`☰`).
  - [ ] Acesso aos módulos com alvos de toque amplos (*tap targets* `>= 44px`).
  - [ ] Transição fluida entre abas/módulos sem rolagem horizontal indesejada.

#### 1.3. Entregáveis e Critérios de Conclusão do Módulo 1
- [ ] Estrutura do painel permite acesso imediato a Organizações e Usuários.
- [ ] Consistência visual com o Design System do Yby Impacta.
- [ ] Navegação testada e aprovada em Desktop e Mobile.

---

## 🏢 MÓDULO 2: Gerenciamento de Organizações

### Objetivo do Módulo
Proporcionar ao administrador uma experiência simples, intuitiva e organizada para consultar, cadastrar, editar e excluir organizações (Cooperativas e Clientes) cadastradas na plataforma.

### Checklist de Tarefas & Verificação:

#### 2.1. Listagem de Organizações (Interface Principal)
- [ ] **Construir a tabela/grade de listagem de organizações:**
  - [ ] Coluna **Nome da Organização** (em negrito, com CNPJ formatado logo abaixo).
  - [ ] Coluna **Tipo da Organização** com badge visual distintivo:
    - [ ] `Cooperativa` (badge em tom verde floresta `#267332` ou azul).
    - [ ] `Cliente` (badge em tom contrastante/bege `#E6DFD3`).
  - [ ] Coluna **Status** com representação visual clara:
    - [ ] `Ativa` (pílula verde com indicador `● Ativa`).
    - [ ] `Inativa` (pílula cinza/neutra com indicador `○ Inativa`).
  - [ ] Coluna **Ações** com botões táteis:
    - [ ] Ícone/botão de **Editar** (`✏️`).
    - [ ] Ícone/botão de **Excluir** (`🗑️` em tom destrutivo/vermelho).
- [ ] **Controles e Filtros da Listagem:**
  - [ ] Botão primário destacado: `+ Adicionar organização` (ou `Nova organização`).
  - [ ] **Barra de busca:** localizar por nome da organização ou dígitos do CNPJ.
  - [ ] **Filtro por Tipo:** Select com opções (`Todas`, `Cooperativa`, `Cliente`).
  - [ ] **Filtro por Status:** Select ou botões em pílula (`Todos`, `Ativas`, `Inativas`).
  - [ ] **Paginação:**
    - [ ] Exibição do contador (ex: *"Mostrando 1 a 10 de 42 organizações"*).
    - [ ] Controles de página anterior, números de página e próxima página.
    - [ ] Empty State quando a busca ou filtro não encontrar resultados (com ícone de busca e mensagem de limpar filtros).
- [ ] **Adaptação Mobile da Listagem:**
  - [ ] No celular (`< 768px`), renderizar cada organização em formato de **Card de Organização**:
    - [ ] Cabeçalho do card: Nome da organização + Chip de Status (`Ativa`/`Inativa`).
    - [ ] Informações centrais: Tipo (`Cooperativa`/`Cliente`) + CNPJ.
    - [ ] Rodapé do card: Botões `Editar` e `Excluir` com área de toque mínima de `44px`.

#### 2.2. Cadastro de Organização (Formulário)
- [ ] **Construir o formulário de cadastro de organização:**
  - [ ] **Nome da Organização:** Campo de texto obrigatório com validação de preenchimento.
  - [ ] **CNPJ:** Campo de texto com máscara automática (`00.000.000/0001-00`) e validação de formato.
  - [ ] **Tipo da Organização:** Select com 2 opções exclusivas:
    - [ ] `Cooperativa`
    - [ ] `Cliente`
  - [ ] **Status:** Componente visual **Switch** (ou Checkbox estilizado) para alternar entre `Ativa` e `Inativa`, com rótulo descritivo e feedback imediato.
  - [ ] **Ações do Formulário:**
    - [ ] Botão secundário `Cancelar` (outlined/neutro, retorna para a listagem sem salvar).
    - [ ] Botão primário `Salvar` (verde sólido, valida os campos e persiste o cadastro).
  - [ ] Feedback ao usuário via Toast notification (Sonner) em caso de sucesso ou erro de validação.

#### 2.3. Edição de Organização
- [ ] **Implementar fluxo de edição reutilizando a estrutura visual do cadastro:**
  - [ ] Reutilização estrita da mesma estrutura de formulário (garantindo consistência e baixa duplicação de código).
  - [ ] Ao clicar em `Editar` na listagem, o formulário é carregado com todos os campos previamente preenchidos com os dados da organização selecionada.
  - [ ] O switch de status reflete exatamente o estado atual da organização (`Ativa` ou `Inativa`).
  - [ ] Botão `Salvar alterações` atualiza os dados e retorna à listagem com toast de sucesso.
  - [ ] Botão `Cancelar` descarta edições e retorna à listagem.

#### 2.4. Ação de Exclusão de Organização
- [ ] **Criar modal de confirmação visual antes da exclusão:**
  - [ ] Modal de alerta com ícone de atenção/perigo (`⚠️` ou `🗑️`).
  - [ ] Título claro: *"Excluir organização?"*.
  - [ ] Mensagem de confirmação citando expressamente o nome da organização (ex: *"Tem certeza que deseja excluir 'Cooperativa Rosa Virginia'? Esta ação não poderá ser desfeita."*).
  - [ ] Botões: `Cancelar` (foco padrão, evita exclusões acidentais) e `Sim, excluir` (vermelho destrutivo).
  - [ ] Toast de confirmação ao concluir a exclusão.

#### 2.5. Entregáveis e Critérios de Conclusão do Módulo 2
- [ ] Listagem completa com busca, filtros por tipo/status e paginação.
- [ ] Formulário de cadastro claro com máscara de CNPJ e switch de status.
- [ ] Fluxo de edição preenchendo automaticamente os dados.
- [ ] Modal de confirmação antes de qualquer exclusão.
- [ ] 100% responsivo para Desktop, Tablet e Celular.

---

## 👥 MÓDULO 3: Gerenciamento de Usuários

### Objetivo do Módulo
Permitir que o administrador visualize os usuários cadastrados, identifique seus papéis no sistema por meio de etiquetas visuais e realize a criação e vinculação de usuários às organizações existentes.

### Checklist de Tarefas & Verificação:

#### 3.1. Listagem de Usuários (Interface Principal)
- [ ] **Construir a tabela/grade de listagem de usuários:**
  - [ ] Coluna **Nome do Usuário** (com avatar/iniciais em círculo).
  - [ ] Coluna **E-mail do Usuário** (tipografia discreta e legível).
  - [ ] Coluna **Papel (Role)** apresentado como **Etiqueta Visual (Chip/Badge)** colorida para facilitar a rápida identificação:
    - [ ] `Gestor Yby — YBY Manager` (Chip Verde Floresta `#267332`)
    - [ ] `Colaborador Yby — YBY Worker` (Chip Verde Claro `#3D8A4E`)
    - [ ] `Presidente da Cooperativa` (Chip Azul `#005885`)
    - [ ] `Colaborador da Cooperativa — Worker da Cooperativa` (Chip Laranja `#E65124`)
    - [ ] `Cliente` (Chip Bege/Terra `#7A7067` ou Neutro)
  - [ ] Coluna **Organização Vinculada:**
    - [ ] Nome da Cooperativa ou do Cliente ao qual o usuário pertence (com ícone indicativo do tipo).
  - [ ] Coluna **Ações:**
    - [ ] Botão/ícone visual de **Editar** (`✏️`).
    - [ ] Botão/ícone de **Excluir** (`🗑️`).
- [ ] **Controles e Filtros da Listagem:**
  - [ ] Botão primário destacado: `+ Adicionar usuário` (ou `Novo usuário`).
  - [ ] **Barra de busca:** localizar por nome do usuário ou e-mail.
  - [ ] **Filtro por Papel (Role):** Select contendo os 5 papéis do sistema + opção `Todos os papéis`.
  - [ ] **Filtro por Organização:** Select com as organizações cadastradas + opção `Todas as organizações`.
  - [ ] **Paginação:**
    - [ ] Contador de registros visíveis (ex: *"Mostrando 1 a 10 de 85 usuários"*).
    - [ ] Controles de navegação anterior/próxima e indicador de página atual.
    - [ ] Empty State quando nenhum usuário for encontrado com os filtros selecionados.
- [ ] **Adaptação Mobile da Listagem:**
  - [ ] No celular (`< 768px`), renderizar em formato de **Card de Usuário**:
    - [ ] Topo do card: Avatar + Nome do usuário + Chip do Papel (Role).
    - [ ] Meio do card: E-mail + Organização vinculada em destaque.
    - [ ] Rodapé do card: Botões `Editar` e `Excluir` com área de toque mínima de `44px`.

#### 3.2. Cadastro de Usuário (Formulário)
- [ ] **Construir o formulário de cadastro de usuário:**
  - [ ] **Nome:** Campo de texto obrigatório para o nome completo do usuário.
  - [ ] **E-mail:** Campo de e-mail com validação de formato (`nome@dominio.com`).
  - [ ] **Papel (Role) do Usuário:**
    - [ ] Campo Select obrigatório contendo exatamente as **5 opções em português**:
      1. `Gestor Yby — YBY Manager`
      2. `Colaborador Yby — YBY Worker`
      3. `Presidente da Cooperativa`
      4. `Colaborador da Cooperativa — Worker da Cooperativa`
      5. `Cliente`
  - [ ] **Organização Vinculada:**
    - [ ] Campo Select obrigatório listando as organizações previamente cadastradas.
    - [ ] Permitir a seleção de **apenas uma organização** para vincular ao usuário.
    - [ ] **Importante:** Garantir a separação e independência clara entre os campos `Papel (Role)` e `Organização Vinculada` na interface.
  - [ ] **Ações do Formulário:**
    - [ ] Botão secundário `Cancelar` (retorna para a listagem de usuários).
    - [ ] Botão primário `Salvar` (valida os campos obrigatórios e adiciona o usuário).
  - [ ] Feedback visual ao salvar via Toast notification (Sonner).

#### 3.3. Edição e Exclusão de Usuários
- [ ] **Ação de Edição de Usuários:**
  - [ ] O botão de editar (`✏️`) deve estar visível e alinhado na listagem.
  - [ ] *Nota da especificação:* Nesta etapa inicial, o botão de editar é representado visualmente na tabela/card.
- [ ] **Ação de Exclusão de Usuários:**
  - [ ] Botão de excluir aciona modal de confirmação visual antes da remoção definitiva do usuário.
  - [ ] Título claro: *"Excluir usuário?"*.
  - [ ] Mensagem exibindo o nome e e-mail do usuário (ex: *"Deseja realmente remover o usuário 'Mariana Silva' (mariana@somosyby.com)?"*).
  - [ ] Botões: `Cancelar` e `Sim, excluir` (destrutivo).

#### 3.4. Entregáveis e Critérios de Conclusão do Módulo 3
- [ ] Listagem de usuários com chips coloridos dos 5 papéis.
- [ ] Filtros combinados por Role e por Organização Vinculada.
- [ ] Formulário de cadastro com os 5 papéis em português e vinculação de organização única.
- [ ] Clareza absoluta na distinção entre Papel (função do usuário) e Organização (entidade vinculada).
- [ ] Modal de confirmação visual para exclusão.
- [ ] 100% responsivo para Desktop e Mobile.

---

## 🎨 MÓDULO 4: Diretrizes de UX/UI, Design System & Consistência

### Checklist de Qualidade e Conformidade:
- [ ] **Paleta de Cores do Yby Impacta:**
  - [ ] Verde Floresta / Primário: `#267332`
  - [ ] Verde Escuro / Heading: `#3D2E28` e `#2A5C43`
  - [ ] Fundo Creme / Superfície: `#F4EFE6` e `#FFFFFF`
  - [ ] Borda / Divisórias: `#E6DFD3`
  - [ ] Acento Destrutivo (Exclusão): `#E65124` / `#DC2626`
- [ ] **Tipografia e Acessibilidade:**
  - [ ] Fonte base: `Plus Jakarta Sans` ou `Inter` com hierarquia clara (`text-2xl`, `text-lg`, `text-sm`, `text-xs`).
  - [ ] Contraste visual adequado em todos os chips, textos e botões (conforme WCAG AA).
  - [ ] Inputs com altura mínima de toque de `44px` a `48px` no mobile.
  - [ ] Estados de foco (`focus:ring-2 focus:ring-yby-primary`) visíveis para navegação por teclado.
- [ ] **Componentes Reutilizáveis:**
  - [ ] `InputField`: com suporte a máscara de CNPJ e estados de erro.
  - [ ] `SelectField`: com opções formatadas e acessíveis.
  - [ ] `SwitchToggle`: para estado ativo/inativo da organização.
  - [ ] `BadgeChip`: com cores mapeadas por papel de usuário e tipo de organização.
  - [ ] `ConfirmModal`: com foco seguro no botão de cancelamento.
  - [ ] `EmptyState`: para buscas e filtros sem retorno.

---

## 🧪 MÓDULO 5: Validação, Testes e Critérios de Conclusão

- [ ] **Validação em Resoluções (Desktop, Tablet e Celular):**
  - [ ] Desktop (`1440px` e `1280px`): tabelas completas, filtros em linha, paginação visível.
  - [ ] Tablet (`768px` a `1023px`): comportamento responsivo sem sobreposição de colunas.
  - [ ] Mobile (`375px` e `414px`): cards táteis, drawer lateral, modais em tela cheia/bottom sheet.
- [ ] **Validação de Fluxos Administrativos:**
  - [ ] Alternância entre listagem, cadastro e edição sem recarregamento de página.
  - [ ] Sincronização de busca em tempo real com debounce.
  - [ ] Confirmação de exclusão funcional para Organizações e Usuários.
  - [ ] Teste de build de produção (`npm run build`) aprovado com zero erros.
- [ ] **Revisão e Disponibilização:**
  - [ ] Interface e protótipo revisados com a equipe.
  - [ ] Documentação de rotas e componentes atualizada no repositório.
