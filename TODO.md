# TODO — Painel Administrativo Yby Impacta (Organizações e Usuários)

Este documento centraliza todos os requisitos, tarefas, fluxos visuais e critérios de aceitação para o desenvolvimento e revisão do **Painel Administrativo do Yby Impacta**, contemplando os módulos de **Organizações** e **Usuários**.

---

## Visão Geral e Objetivos

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

## MODULO 1: Estrutura Principal e Navegação do Painel Administrativo

### Objetivo do Módulo
Criar a estrutura central do painel administrativo, disponibilizando navegação clara e coesa para os módulos de **Organizações** e **Usuários**, mantendo a identidade visual e ergonomia em qualquer dispositivo.

### Checklist de Tarefas e Verificação:

#### 1.1. Arquitetura de Layout e Navegação
- [x] **Definir e criar a estrutura visual principal do Painel Administrativo:**
  - [x] Integrar acesso aos módulos no menu lateral (`Sidebar`) e cabeçalho mobile (`MobileHeader`).
  - [x] Garantir que o administrador compreenda claramente como alternar entre Organizações e Usuários.
  - [x] Aplicar a identidade visual do **Yby Impacta** (fundo creme `#F4EFE6`, cabeçalhos escuros `#3D2E28`, acentos verdes `#267332` e o [símbolo oficial do YBY](./public/yby-icon-green.png)).
  - [x] Exibir cabeçalho de página com título descritivo, subtítulo explicativo e botões de ação primária destacados.

#### 1.2. Responsividade e Adaptação para Dispositivos Móveis
- [x] **Adaptação para Desktop (`>= 1024px`):**
  - [x] Sidebar completa ou recolhida com navegação direta para `/admin/organizacoes` e `/admin/usuarios`.
  - [x] Visualização ampla dos dados em grade tabular com filtros em linha.
- [x] **Adaptação para Tablet (`768px - 1023px`):**
  - [x] Sidebar retrátil (`72px`) ou Drawer deslizante com ícones destacados.
  - [x] Filtros reorganizados em 2 colunas.
- [x] **Adaptação para Celular (`< 768px`):**
  - [x] Cabeçalho compacto com Drawer lateral acionado por menu hamburguer.
  - [x] Acesso aos módulos com alvos de toque amplos (*tap targets* `>= 44px`).
  - [x] Transição fluida entre abas/módulos sem rolagem horizontal indesejada.

#### 1.3. Entregáveis e Critérios de Conclusão do Módulo 1
- [x] Estrutura do painel permite acesso imediato a Organizações e Usuários.
- [x] Consistência visual com o Design System do Yby Impacta.
- [x] Navegação testada e aprovada em Desktop e Mobile.

---

## MODULO 2: Gerenciamento de Organizações

### Objetivo do Módulo
Proporcionar ao administrador uma experiência simples, intuitiva e organizada para consultar, cadastrar, editar e excluir organizações (Cooperativas e Clientes) cadastradas na plataforma.

### Checklist de Tarefas e Verificação:

#### 2.1. Listagem de Organizações (Interface Principal)
- [x] **Construir a tabela/grade de listagem de organizações:**
  - [x] Coluna **Nome da Organização** (em negrito, com CNPJ formatado logo abaixo).
  - [x] Coluna **Tipo da Organização** com badge visual distintivo:
    - [x] `Cooperativa` (badge em tom verde floresta `#267332` ou azul).
    - [x] `Cliente` (badge em tom contrastante/bege `#E6DFD3`).
  - [x] Coluna **Status** com representação visual clara:
    - [x] `Ativa` (pílula verde com indicador de status ativo).
    - [x] `Inativa` (pílula cinza/neutra com indicador de status inativo).
  - [x] Coluna **Ações** com botões táteis:
    - [x] Ícone/botão de **Editar**.
    - [x] Ícone/botão de **Excluir** (em tom destrutivo/vermelho).
- [x] **Controles e Filtros da Listagem:**
  - [x] Botão primário destacado: `+ Adicionar organização` (ou `Nova organização`).
  - [x] **Barra de busca:** localizar por nome da organização ou dígitos do CNPJ.
  - [x] **Filtro por Tipo:** Select com opções (`Todas`, `Cooperativa`, `Cliente`).
  - [x] **Filtro por Status:** Select ou botões em pílula (`Todos`, `Ativas`, `Inativas`).
  - [x] **Paginação:**
    - [x] Exibição do contador (ex: *"Mostrando 1 a 10 de 42 organizações"*).
    - [x] Controles de página anterior, números de página e próxima página.
    - [x] Empty State quando a busca ou filtro não encontrar resultados (com ícone de busca e mensagem de limpar filtros).
- [x] **Adaptação Mobile da Listagem:**
  - [x] No celular (`< 768px`), renderizar cada organização em formato de **Card de Organização**:
    - [x] Cabeçalho do card: Nome da organização + Chip de Status (`Ativa`/`Inativa`).
    - [x] Informações centrais: Tipo (`Cooperativa`/`Cliente`) + CNPJ.
    - [x] Rodapé do card: Botões `Editar` e `Excluir` com área de toque mínima de `44px`.

#### 2.2. Cadastro de Organização (Formulário)
- [x] **Construir o formulário de cadastro de organização:**
  - [x] **Nome da Organização:** Campo de texto obrigatório com validação de preenchimento.
  - [x] **CNPJ:** Campo de texto com máscara automática (`00.000.000/0001-00`) e validação de formato.
  - [x] **Tipo da Organização:** Select com 2 opções exclusivas:
    - [x] `Cooperativa`
    - [x] `Cliente`
  - [x] **Status:** Componente visual **Switch** (ou Checkbox estilizado) para alternar entre `Ativa` e `Inativa`, com rótulo descritivo e feedback imediato.
  - [x] **Ações do Formulário:**
    - [x] Botão secundário `Cancelar` (outlined/neutro, retorna para a listagem sem salvar).
    - [x] Botão primário `Salvar` (verde sólido, valida os campos e persiste o cadastro).
  - [x] Feedback ao usuário via Toast notification (Sonner) em caso de sucesso ou erro de validação.

#### 2.3. Edição de Organização
- [x] **Implementar fluxo de edição reutilizando a estrutura visual do cadastro:**
  - [x] Reutilização estrita da mesma estrutura de formulário (garantindo consistência e baixa duplicação de código).
  - [x] Ao clicar em `Editar` na listagem, o formulário é carregado com todos os campos previamente preenchidos com os dados da organização selecionada.
  - [x] O switch de status reflete exatamente o estado atual da organização (`Ativa` ou `Inativa`).
  - [x] Botão `Salvar alterações` atualiza os dados e retorna à listagem com toast de sucesso.
  - [x] Botão `Cancelar` descarta edições e retorna à listagem.

#### 2.4. Ação de Exclusão de Organização
- [x] **Criar modal de confirmação visual antes da exclusão:**
  - [x] Modal de alerta com ícone de atenção/perigo.
  - [x] Título claro: *"Excluir organização?"*.
  - [x] Mensagem de confirmação citando expressamente o nome da organização (ex: *"Tem certeza que deseja excluir 'Cooperativa Rosa Virginia'? Esta ação não poderá ser desfeita."*).
  - [x] Botões: `Cancelar` (foco padrão, evita exclusões acidentais) e `Sim, excluir` (vermelho destrutivo).
  - [x] Toast de confirmação ao concluir a exclusão.

#### 2.5. Entregáveis e Critérios de Conclusão do Módulo 2
- [x] Listagem completa com busca, filtros por tipo/status e paginação.
- [x] Formulário de cadastro claro com máscara de CNPJ e switch de status.
- [x] Fluxo de edição preenchendo automaticamente os dados.
- [x] Modal de confirmação antes de qualquer exclusão.
- [x] 100% responsivo para Desktop, Tablet e Celular.

---

## MODULO 3: Gerenciamento de Usuários

### Objetivo do Módulo
Permitir que o administrador visualize os usuários cadastrados, identifique seus papéis no sistema por meio de etiquetas visuais e realize a criação e vinculação de usuários às organizações existentes.

### Checklist de Tarefas e Verificação:

#### 3.1. Listagem de Usuários (Interface Principal)
- [x] **Construir a tabela/grade de listagem de usuários:**
  - [x] Coluna **Nome do Usuário** (com avatar/iniciais em círculo).
  - [x] Coluna **E-mail do Usuário** (tipografia discreta e legível).
  - [x] Coluna **Papel (Role)** apresentado como **Etiqueta Visual (Chip/Badge)** colorida para facilitar a rápida identificação:
    - [x] `Gestor Yby — YBY Manager` (Chip Verde Floresta `#267332`)
    - [x] `Colaborador Yby — YBY Worker` (Chip Verde Claro `#3D8A4E`)
    - [x] `Presidente da Cooperativa` (Chip Azul `#005885`)
    - [x] `Colaborador da Cooperativa — Worker da Cooperativa` (Chip Laranja `#E65124`)
    - [x] `Cliente` (Chip Bege/Terra `#7A7067` ou Neutro)
  - [x] Coluna **Organização Vinculada:**
    - [x] Nome da Cooperativa ou do Cliente ao qual o usuário pertence (com ícone indicativo do tipo).
  - [x] Coluna **Ações:**
    - [x] Botão/ícone visual de **Editar**.
    - [x] Botão/ícone de **Excluir**.
- [x] **Controles e Filtros da Listagem:**
  - [x] Botão primário destacado: `+ Adicionar usuário` (ou `Novo usuário`).
  - [x] **Barra de busca:** localizar por nome do usuário ou e-mail.
  - [x] **Filtro por Papel (Role):** Select contendo os 5 papéis do sistema + opção `Todos os papéis`.
  - [x] **Filtro por Organização:** Select com as organizações cadastradas + opção `Todas as organizações`.
  - [x] **Paginação:**
    - [x] Contador de registros visíveis (ex: *"Mostrando 1 a 10 de 85 usuários"*).
    - [x] Controles de navegação anterior/próxima e indicador de página atual.
    - [x] Empty State quando nenhum usuário for encontrado com os filtros selecionados.
- [x] **Adaptação Mobile da Listagem:**
  - [x] No celular (`< 768px`), renderizar em formato de **Card de Usuário**:
    - [x] Topo do card: Avatar + Nome do usuário + Chip do Papel (Role).
    - [x] Meio do card: E-mail + Organização vinculada em destaque.
    - [x] Rodapé do card: Botões `Editar` e `Excluir` com área de toque mínima de `44px`.

#### 3.2. Cadastro de Usuário (Formulário)
- [x] **Construir o formulário de cadastro de usuário:**
  - [x] **Nome:** Campo de texto obrigatório para o nome completo do usuário.
  - [x] **E-mail:** Campo de e-mail com validação de formato (`nome@dominio.com`).
  - [x] **Papel (Role) do Usuário:**
    - [x] Campo Select obrigatório contendo exatamente as **5 opções em português**:
      1. `Gestor Yby — YBY Manager`
      2. `Colaborador Yby — YBY Worker`
      3. `Presidente da Cooperativa`
      4. `Colaborador da Cooperativa — Worker da Cooperativa`
      5. `Cliente`
  - [x] **Organização Vinculada:**
    - [x] Campo Select obrigatório listando as organizações previamente cadastradas.
    - [x] Permitir a seleção de **apenas uma organização** para vincular ao usuário.
    - [x] **Importante:** Garantir a separação e independência clara entre os campos `Papel (Role)` e `Organização Vinculada` na interface.
  - [x] **Ações do Formulário:**
    - [x] Botão secundário `Cancelar` (retorna para a listagem de usuários).
    - [x] Botão primário `Salvar` (valida os campos obrigatórios e adiciona o usuário).
  - [x] Feedback visual ao salvar via Toast notification (Sonner).

#### 3.3. Edição e Exclusão de Usuários
- [x] **Ação de Edição de Usuários:**
  - [x] O botão de editar deve estar visível e alinhado na listagem.
  - [x] Fluxo de edição carrega dados atuais no formulário unificado e persiste alterações.
- [x] **Ação de Exclusão de Usuários:**
  - [x] Botão de excluir aciona modal de confirmação visual antes da remoção definitiva do usuário.
  - [x] Título claro: *"Excluir usuário?"*.
  - [x] Mensagem exibindo o nome e e-mail do usuário.
  - [x] Botões: `Cancelar` e `Sim, excluir` (destrutivo).

#### 3.4. Entregáveis e Critérios de Conclusão do Módulo 3
- [x] Listagem de usuários com chips coloridos dos 5 papéis.
- [x] Filtros combinados por Role e por Organização Vinculada.
- [x] Formulário de cadastro com os 5 papéis em português e vinculação de organização única.
- [x] Clareza absoluta na distinção entre Papel (função do usuário) e Organização (entidade vinculada).
- [x] Modal de confirmação visual para exclusão.
- [x] 100% responsivo para Desktop e Mobile.

---

## MODULO 4: Diretrizes de UX/UI, Design System e Consistência

### Checklist de Qualidade e Conformidade:
- [x] **Paleta de Cores do Yby Impacta:**
  - [x] Verde Floresta / Primário: `#267332`
  - [x] Verde Escuro / Heading: `#3D2E28` e `#2A5C43`
  - [x] Fundo Creme / Superfície: `#F4EFE6` e `#FFFFFF`
  - [x] Borda / Divisórias: `#E6DFD3`
  - [x] Acento Destrutivo (Exclusão): `#E65124` / `#DC2626`
- [x] **Tipografia e Acessibilidade:**
  - [x] Fonte base: `Plus Jakarta Sans` ou `Inter` com hierarquia clara (`text-2xl`, `text-lg`, `text-sm`, `text-xs`).
  - [x] Contraste visual adequado em todos os chips, textos e botões (conforme WCAG AA).
  - [x] Inputs com altura mínima de toque de `44px` a `48px` no mobile.
  - [x] Estados de foco (`focus:ring-2 focus:ring-yby-primary`) visíveis para navegação por teclado.
- [x] **Componentes Reutilizáveis:**
  - [x] `InputField`: com suporte a máscara de CNPJ e estados de erro.
  - [x] `SelectField`: com opções formatadas e acessíveis.
  - [x] `SwitchToggle`: para estado ativo/inativo da organização.
  - [x] `BadgeChip`: com cores mapeadas por papel de usuário e tipo de organização.
  - [x] `ConfirmModal`: com foco seguro no botão de cancelamento.
  - [x] `EmptyState`: para buscas e filtros sem retorno.

---

## MODULO 5: Validação, Testes e Critérios de Conclusão

- [x] **Validação em Resoluções (Desktop, Tablet e Celular):**
  - [x] Desktop (`1440px` e `1280px`): tabelas completas, filtros em linha, paginação visível.
  - [x] Tablet (`768px` a `1023px`): comportamento responsivo sem sobreposição de colunas.
  - [x] Mobile (`375px` e `414px`): cards táteis, drawer lateral, modais em tela cheia/bottom sheet.
- [x] **Validação de Fluxos Administrativos:**
  - [x] Alternância entre listagem, cadastro e edição sem recarregamento de página.
  - [x] Sincronização de busca em tempo real com debounce.
  - [x] Confirmação de exclusão funcional para Organizações e Usuários.
  - [x] Teste de build de produção (`npm run build`) aprovado com zero erros.
- [x] **Revisão e Disponibilização:**
  - [x] Interface e protótipo revisados com a equipe.
  - [x] Documentação de rotas e componentes atualizada no repositório.
