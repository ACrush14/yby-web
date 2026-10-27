# 04 — Reformulação e Novo Design (Protótipo Figma -> Código)

Este documento registra o mapeamento completo do **novo protótipo do Projeto YBY no Figma**, detalhando o novo Design System, a evolução visual e de usabilidade (UX) em relação ao sistema antigo (`somosyby.com`) e as telas capturadas durante a navegação automatizada.

---

## 🔗 1. Link Oficial do Protótipo no Figma

* **URL do Protótipo:** [Projeto YBY — Figma Prototype](https://www.figma.com/proto/smcM50NPk6mbS9j5uzONPP/Projeto-YBY?node-id=2-206&t=I8hdCf3hORwKR4Sx-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A206)
* **Diretório Local de Capturas (Screenshots):** [`docs/figma-screens/`](./figma-screens/)

---

## 🎨 2. Novo Design System e Identidade Visual

O novo design mantém a essência orgânica e sustentável da YBY (tons terrosos, creme e verde floresta), mas elimina a aparência engessada do Material UI padrão, introduzindo uma hierarquia tipográfica limpa, bordas suaves, badges semânticos e estados visuais muito bem definidos.

### 2.1. Paleta de Cores (Design Tokens)
| Token / Função | Hex Aproximado | Aplicação no Protótipo |
| :--- | :--- | :--- |
| **Verde Floresta (Brand Dark)** | `#1E5E2A` | Painel esquerdo das telas de autenticação (Login / Recuperação de senha). |
| **Verde Primário (Action)** | `#267332` / `#2B7A33` | Botões primários (`Entrar`, `Filtrar`, `Salvar alterações`, `Exportar para PDF`), abas ativas e gráficos principais. |
| **Verde Suave (Active / Focus / Badge)** | `#DCEAD9` / `#E6F0E8` | Item ativo na Sidebar, fundo de inputs em foco, pílula do filtro rápido (`Mês atual`) e badge `"Recicláveis Geral"`. |
| **Creme Principal (Surface / Sidebar / Filter Box)** | `#F4EFE6` / `#F6F2EA` | Fundo da Sidebar lateral, caixas de filtros (`Relatórios`, `Dashboard`), cabeçalho de tabelas e fundo direito do Login. |
| **Branco Puro (Background / Cards)** | `#FFFFFF` | Área principal de conteúdo das telas internas, cards de formulários (`Cadastro`, `Edição`) e linhas pares das tabelas. |
| **Creme Zebra (Table Alt Row)** | `#F7F4EC` | Linhas alternadas (*zebra striping*) na tabela de Relatórios e cards de KPIs do Dashboard. |
| **Marrom Escuro (Heading Text)** | `#3D2E28` / `#2E2222` | Títulos principais das páginas (`Dashboard`, `Relatórios`, `Planejamento`, `Cadastro`, `Edição`) e números de destaque dos KPIs. |
| **Cinza Terroso (Muted Text)** | `#7A7067` | Subtítulos de páginas, labels de inputs, cabeçalhos de colunas e textos secundários. |
| **Borda Suave (Border)** | `#E6DFD3` / `#D8D0C5` | Bordas de cards, divisórias de tabelas e contornos de inputs em repouso. |
| **Laranja Energia (Accent 1)** | `#E65124` | KPI/Gráfico de `Consumo de energia`, cooperativa `Rede Ceará` e status `● Não salvo` no Planejamento. |
| **Azul Água (Accent 2)** | `#005885` | KPI/Gráfico de `Economia de água`, `Petróleo` e cooperativa `Coocencipe`. |
| **Verde Escuro CO₂ (Accent 3)** | `#2A5C43` | KPI de `CO₂ evitado` e `Árvores poupadas`. |
| **Vermelho Alerta (Danger)** | `#C62828` | Ícone de exclusão (lixeira) na tabela de Relatórios e asteriscos (`*`) de campos obrigatórios. |

---

## 🔄 3. Matriz Comparativa: Sistema Atual vs. Novo Design (Figma)

| Área / Tela | Como é no Sistema Atual (`somosyby.com`) | Como ficou no Novo Design (Figma) | Ganho de UX / Design |
| :--- | :--- | :--- | :--- |
| **Institucional / Entrada** | Site separado em WordPress (`somosyby.com.br`) desconectado visualmente do web app. | **Landing Page integrada (`node-id=2-206`)** com a mesma linguagem visual do sistema, apresentando KPIs reais, fluxo em 4 etapas, públicos e funcionalidades. | Transição fluida entre apresentação institucional e login na plataforma. |
| **Autenticação (`/signIn` e Senha)** | Card simples centralizado em fundo bege; recuperação de senha abre modal básico do MUI. | **Layout Split-Screen (`31-430`, `35-452`, `35-496`, `104-1133`)** com painel institucional verde à esquerda e jornada de recuperação em 3 passos claros à direita. | Visual premium de SaaS moderno e feedback claro em cada etapa da recuperação de senha. |
| **Menu Lateral (Sidebar)** | Largura fixa (`240px`) sem opção de recolher no Desktop; submenus soltos. | **Sidebar retrátil** com botão `<` no topo, indicador lateral verde no item ativo e ícones alinhados. | Mais espaço horizontal útil para tabelas largas (`Planejamento` e `Relatórios`). |
| **Dashboard (`/dashboard`)** | Filtros de data sem atalhos; cards de KPI com muita borda; gráfico de rosca sem totalizador central. | **Atalhos rápidos (`Mês atual`, `Semana Atual`)**, 4 KPIs principais com ícones circulares vibrantes, **total em kg no centro do Donut Chart** e 4 KPIs secundários com barra superior colorida. | Leitura executiva imediata; hierarquia visual muito superior entre indicadores primários e secundários. |
| **Planejamento (`/planejamento`)** | Lista vertical extensa de cards grandes; cada PEV tem 5 checkboxes + 5 selects + botão `SALVAR` individual. | **Tabela/Grade Semanal compacta (`122-1141`)** com legenda de cores por cooperativa, pílulas coloridas com busca em cada dia, coluna `Status` (`✓ Salvo` vs `● Não salvo`) e **botão único `Salvar alterações`**. | **Transformação radical de usabilidade:** permite enxergar e editar dezenas de clientes rapidamente na mesma tela sem perder o controle do que foi alterado. |
| **Relatórios (`/relatorios`)** | Filtro de `Tipo de Resíduos` em texto livre; data e hora juntas na mesma linha; botões de ação pesados com fundo preenchido. | **Filtro de `Tipo de resíduo` em Select padronizado**, `Data | Horário` em duas linhas hierárquicas, **badges semânticos** para resíduo e avaria, ícones de ação *outline* leves e botão `"Carregar mais"` com contador (`100 de 466`). | Tabela muito mais limpa, legível e escaneável. |
| **Cadastro e Edição** | 6 telas separadas no menu; `Edição` fica em branco até selecionar no dropdown sem explicação visual. | **Páginas unificadas com 3 abas em pílula (`Cliente`, `Cooperativa`, `Gestor`)**, formulários organizados em seções (`Dados básicos` e `Endereço`) e **Empty State ilustrado com lupa (`44-1114`)** antes de selecionar o registro na Edição. | Navegação mais rápida entre entidades e eliminação da sensação de "tela quebrada/vazia" na Edição. |

---

## 🖥️ 4. Mapeamento Detalhado das Telas do Protótipo (Figma)

### 4.1. Nova Landing Page Institucional (`node-id=2-206`)
* **Capturas:**
  * Topo / Hero: [`01_node_2-206_top.png`](./figma-screens/01_node_2-206_top.png)
  * Impacto Mensurável e Como Funciona: [`01_node_2-206_mid.png`](./figma-screens/01_node_2-206_mid.png)
  * Para Quem e Funcionalidades: [`01_node_2-206_bot.png`](./figma-screens/01_node_2-206_bot.png)
  * Rodapé: [`01_node_2-206_footer.png`](./figma-screens/01_node_2-206_footer.png)
* **Estrutura e Componentes:**
  1. **Navbar Superior:** Logo `yby` à esquerda, links de âncora centralizados (`Como funciona`, `Impacto`, `Funcionalidades`, `Para quem`) e botão `"Entrar"` (verde `#267332`) à direita (navega para `31-430`).
  2. **Hero Section:** Título centralizado em grande destaque `"Gestão de resíduos com dados de impacto"` sobre fundo em gradiente suave creme/branco.
  3. **Seção "Impacto Mensurável":** Apresenta os 4 indicadores principais em cards com ícones circulares coloridos (`Energia evitada: 276.984 MWh`, `Água economizada: 24.036.493 L`, `CO₂e evitado: 133.585 kg`, `Árvores poupadas: 644 árvores`).
  4. **Seção "Como Funciona":** Grid de 4 colunas numeradas (`01 Cadastro`, `02 Planejamento`, `03 Coleta registrada`, `04 Relatório de impacto`).
  5. **Seção "Para Quem":** 3 colunas explicando o valor para `Empresas e PEVs`, `Cooperativas` e `Gestores`.
  6. **Seção "Funcionalidades":** Grid 2x2 destacando `Planejamento semanal` (tag `Escala`), `Relatórios filtráveis` (tag `Exportação`), `Dashboard ambiental` (tag `Impacto`) e `Artes para Stories` (tag `Comunicação`).

---

### 4.2. Jornada de Autenticação e Recuperação de Senha

#### A. Login Principal (`node-id=31-430`)
* **Captura:** [`02_node_31-430_top.png`](./figma-screens/02_node_31-430_top.png)
* **Layout:** Dividido em 2 colunas (50% verde floresta `#1E5E2A` / 50% creme `#F6F2EA`).
* **Elementos:**
  * **Painel Esquerdo:** Logo da YBY clicável (volta para a Landing Page `2-206`), selo `"PLATAFORMA DE COLETA SELETIVA"`, título `"Cada coleta registrada vira impacto medido."` e subtítulo `"Acompanhe resíduos, cooperativas e pontos de entrega voluntária em um só lugar."`.
  * **Card Direito (`Bem-vindo de volta`):**
    * Input `E-mail *` (`seu@email.com.br`)
    * Input `Senha *` (`Digite sua senha` + ícone de visualizar senha)
    * Link `"Esqueci minha senha"` alinhado à direita (navega para `35-452`)
    * Botão primário `"Entrar ->"` em largura total (navega para `40-467`)

#### B. Esqueceu sua senha? (`node-id=35-452`)
* **Captura:** [`09_esqueci_senha_35-452.png`](./figma-screens/09_esqueci_senha_35-452.png)
* **Elementos:**
  * Ícone circular verde claro com envelope (`✉`).
  * Título `"Esqueceu sua senha?"` + instrução `"Informe o e-mail cadastrado e enviaremos um link para você criar uma nova senha."`.
  * Input `E-mail *`.
  * Botão primário `"Enviar link de recuperação ->"` (navega para `35-496`).
  * Botão secundário *outlined* `"Voltar para o login"` (volta para `31-430`).

#### C. Verifique seu e-mail (`node-id=35-496`)
* **Captura:** [`10_recuperacao_enviada_35-496.png`](./figma-screens/10_recuperacao_enviada_35-496.png)
* **Elementos:**
  * Painel esquerdo altera o texto para `"RECUPERAÇÃO DE ACESSO — Sem problemas, vamos te ajudar a voltar."`.
  * Card direito exibe ícone circular de sucesso (`✓`), título `"Verifique seu e-mail"`, aviso sobre a caixa de spam, botão `"Clique após confirmar seu endereço"` (navega para `104-1133`) e ação `"Não recebeu? Reenviar e-mail"`.

#### D. Digite sua nova senha (`node-id=104-1133`)
* **Captura:** [`12_redefinir_senha_104-1133.png`](./figma-screens/12_redefinir_senha_104-1133.png)
* **Elementos:**
  * Título `"Digite sua nova senha"`.
  * Dois campos de senha com botão de visualizar (`👁`): `Nova Senha *` e repetição da `Nova Senha *`.
  * Botão `"Confirmar ->"` (finaliza o fluxo retornando para `31-430`).

---

### 4.3. Novo Dashboard Ambiental (`node-id=40-467`)
* **Capturas:**
  * Visão completa com Header e Gráficos: [`flash_40-467_dashboard.png`](./figma-screens/flash_40-467_dashboard.png)
  * Parte Superior: [`seq_01_node_40-467_top.png`](./figma-screens/seq_01_node_40-467_top.png)
  * Parte Inferior: [`seq_01_node_40-467_bot.png`](./figma-screens/seq_01_node_40-467_bot.png)
* **Estrutura e Componentes:**
  1. **Header:** Título `"Dashboard"` + botões `"Baixar artes para Stories"` (outlined) e `"Baixar relatório PDF"` (sólido verde).
  2. **Barra de Filtros (`#F4EFE6`):**
     * 4 campos: `PEV (Todos os PEVs)`, `Tipo de resíduo (Todos os resíduos)`, `Data inicial (16/04/2026)`, `Data final (16/10/2026)`.
     * **Pílulas de Filtro Rápido:** `"Mês atual"` e `"Semana Atual"`.
  3. **4 KPIs Primários (Cards com ícone circular colorido à esquerda):**
     * `Consumo de energia`: `266.049,94 MWh` (Laranja `#E65124`)
     * `Economia de água`: `637.995,42 L` (Azul `#005885`)
     * `CO₂ evitado`: `129.806,64 kg CO₂e` (Verde escuro `#2A5C43`)
     * `Valor climático estimado`: `R$ 5.733,56` (Verde `#2B7A33`)
  4. **Gráficos Principais (Meio):**
     * **Esquerda:** `Coleta em peso (kg) por mês` — Gráfico de linha/área preenchida com pontos demarcados de Abr a Out.
     * **Direita:** `Tipo de resíduo coletado` — Gráfico de rosca com **`68,3 mil kg`** centralizado e lista de participação percentual abaixo (`Recicláveis Geral 87,97%`, `Papel 11,78%`, `Óleo 0,16%`, `Orgânicos 0,09%`).
  5. **4 KPIs Secundários (Cards compactos com barra superior colorida):**
     * `BENEFÍCIO SOCIOAMBIENTAL`: `R$ 3.490,42`
     * `PETRÓLEO`: `1.994.930,61 L`
     * `ÁRVORES POUPADAS`: `597,17 árvores`
     * `ESPAÇO EM ATERRO SANITÁRIO`: `347,67 m³`
  6. **Gráficos Inferiores (Rodapé):**
     * `Economia de água por mês` (Barras verticais azuis).
     * `Consumo de energia por mês` (Barras verticais laranjas).

---

### 4.4. Novo Planejamento Semanal (`node-id=122-1141`)
* **Captura:** [`screen_122-1141_top.png`](./figma-screens/screen_122-1141_top.png)
* **Estrutura e Componentes:**
  1. **Header:** Título `"Planejamento"`, subtítulo `"Defina qual cooperativa atende cada cliente em cada dia da semana"` e botão primário único `"Salvar alterações"` no canto superior direito.
  2. **Barra de Busca e Legenda de Cores:**
     * Input `"Buscar cliente (Nome do cliente ou PEV)"`.
     * Legenda horizontal de cooperativas à direita: `● Yby` (verde), `● Coocencipe` (azul), `● Rede Ceará` (laranja), `● Rosa Virginia` (azul escuro).
  3. **Tabela de Escala Semanal (`Segunda` a `Sexta`):**
     * **Coluna `Cliente`:** Exibe o nome do PEV em negrito (`Ticiana Rolim`, `Hospital Jayme da Fonte`, `Arvoredo`, `Colosso`, `Edifício Le Louvre`, `Locmed (Loja)`) e abaixo o resumo de cobertura (`"5 de 5 dias com cooperativa"`, `"3 de 5 dias com cooperativa"`, etc.).
     * **Colunas `Segunda`, `Terça`, `Quarta`, `Quinta`, `Sexta`:**
       * Quando preenchido: exibe uma pílula colorida com a cor da cooperativa (`● Yby v`, `● Coocencipe v`, `● Rede Ceará v`, `● Rosa Virginia v`).
       * Quando vazio: exibe um botão com borda tracejada `"Selecionar v"`.
       * **Dropdown / Popover de Seleção:** Contém campo de busca interno (`"🔍 Buscar cooperativa"`), lista de cooperativas com indicador colorido e opção `"✕ Sem cooperativa"` no final.
     * **Coluna `Status`:** Indica visualmente quais linhas já estão persistidas (`✓ Salvo` em verde) e quais linhas possuem modificações pendentes de salvamento (`● Não salvo` em laranja).
     * **Rodapé da Tabela:** Contador `"6 clientes exibidos · role para ver mais"`.

---

### 4.5. Novos Relatórios (`node-id=42-531`)
* **Captura:** [`screen_42-531_top.png`](./figma-screens/screen_42-531_top.png)
* **Estrutura e Componentes:**
  1. **Header:** Título `"Relatórios"`, subtítulo `"Coletas registradas nos PEVs, com filtros por cooperativa, resíduo e período"`, botão `"Exportar para Excel"` (outlined) e botão `"Exportar para PDF"` (sólido verde).
  2. **Card de Filtros:**
     * Linha 1: `Buscar (ID, PEV ou cooperativa)`, `Cooperativa (Todas as cooperativas)`, `Tipo de resíduo (Todos os resíduos)`.
     * Linha 2: `Data inicial (16/04/2026)`, `Data final (16/10/2026)` e botão `"Filtrar"`.
  3. **Tabela de Coletas Registradas:**
     * Cabeçalho com ordenação em `Data | Horário ↓`.
     * Coluna `Data | Horário` formatada em 2 linhas (`15/10/2026` em negrito e `15:00` abaixo em cinza).
     * Coluna `Tipo de resíduo` estilizada com badge arredondado verde claro (`Recicláveis Geral`).
     * Coluna `Avaria` estilizada com badge bege (`Não`).
     * Coluna `Ações` com 3 ícones *outline*: Editar (`✏`), Excluir (`🗑` em vermelho) e Ver Fotos (`🖼`).
     * Rodapé com `"Mostrando 100 de 466 registros"` e botão `"Carregar mais"`.

---

### 4.6. Novo Cadastro Unificado (`node-id=44-622`)
* **Captura:** [`screen_44-622_top.png`](./figma-screens/screen_44-622_top.png)
* **Estrutura e Componentes:**
  1. **Header e Abas:** Título `"Cadastro"`, subtítulo `"Cadastre clientes, cooperativas e gestores da plataforma"` e **3 abas em pílula**:
     * `Cliente` (ativa)
     * `Cooperativa`
     * `Gestor`
  2. **Card de Formulário (Aba Cliente):**
     * **Seção `Dados básicos`:** Grid de 3 colunas com `Razão social *`, `Número de CNPJ *`, `Nome do responsável *`, `E-mail *`, `Telefone`, `Usuário *` e `Senha *` (com ícone de olho).
     * **Seção `Endereço`:** Grid de 3 colunas com `CEP *`, `Rua *`, `Número *`, `Bairro *`, `Estado *` (Select) e `Cidade *` (Select).
     * **Ações no Rodapé:** Botão `"Cancelar"` (outlined) e botão `"Cadastrar"` (verde sólido).

---

### 4.7. Nova Edição Unificada (`node-id=44-1114` e `node-id=44-1197`)
* **Capturas:**
  * Estado Inicial (Empty State): [`07_edicao_44-1114_empty.png`](./figma-screens/07_edicao_44-1114_empty.png)
  * Estado Preenchido (Cliente Selecionado): [`11_edicao_cliente_aberto_44-1197.png`](./figma-screens/11_edicao_cliente_aberto_44-1197.png)
* **Estrutura e Componentes:**
  1. **Header e Abas:** Título `"Edição"`, subtítulo `"Atualize os dados cadastrais de clientes, cooperativas e gestores"` e as mesmas **3 abas em pílula** (`Cliente`, `Cooperativa`, `Gestor`).
  2. **Estado 1 — Antes de selecionar (`44-1114`):**
     * Seção `"Selecionar cliente"` com o select/autocomplete `"Buscar e selecionar um cliente"`.
     * Área central com ícone de lupa verde claro (`🔍`), título `"Selecione um cliente"` e descrição `"Escolha um cliente na lista para editar os dados cadastrais."`.
  3. **Estado 2 — Após selecionar (`44-1197`):**
     * Exibe o cliente selecionado (`"Empresa Exemplo Ltda"`) no topo e revela imediatamente as seções `"Dados básicos"` e `"Endereço"` preenchidas para edição, com botões `"Cancelar"` e `"Salvar alterações"` no canto inferior direito.

---

### 4.8. Novo Menu Lateral (Sidebar) com Submenus e Área de Perfil
* **Submenus Expansíveis (Acordeão):**
  * **Cadastro (posicionado antes de Planejamento):**
    * Subitens: `Cliente`, `Cooperativa` e `Gestor`.
    * Cada subitem navega diretamente para `/cadastro?tab=cliente`, `/cadastro?tab=cooperativa` ou `/cadastro?tab=gestor`.
  * **Edição:**
    * Subitens: `Cliente`, `Cooperativa` e `Gestor`.
    * Cada subitem navega diretamente para `/edicao?tab=cliente`, `/edicao?tab=cooperativa` ou `/edicao?tab=gestor`.
  * Ícone chevron suave indicando expansão/recolhimento e sincronização com a rota ativa.
* **Card de Perfil do Usuário (Rodapé da Sidebar, acima de Sair):**
  * **Avatar:** Foto circular ou iniciais estilizadas com background verde floresta.
  * **Identificação:** Nome do usuário logado em negrito (`"Mariana Silva"`) e login/e-mail abaixo em tipografia reduzida (`"mariana@somosyby.com"`).
  * **Botão de Configurações (`⚙️`):** Aciona o `AccountSettingsModal.jsx`.
* **Modal de Configurações da Conta (`AccountSettingsModal.jsx`):**
  * Upload e pré-visualização de nova foto de perfil em tempo real.
  * Alteração de Nome e Login/E-mail.
  * Seção de Segurança: Senha atual, Nova senha e Confirmação de nova senha (com validação de correspondência e feedback toast via Sonner).

---

### 4.9. Comportamento Reativo dos Filtros do Dashboard ("Semana Atual" vs "Mês atual")
* **Pílula "Semana Atual":**
  * Ao clicar, as datas ajustam-se para o intervalo da semana corrente (`12/10/2026 - 18/10/2026`).
  * **Métricas Recalculadas Dinamicamente:**
    * **Consumo de energia:** `61.840,50 MWh`
    * **Economia de água:** `148.220,10 L`
    * **CO₂ evitado:** `29.410,25 kg CO₂e`
    * **Valor climático estimado:** `R$ 1.340,80`
    * **Rosca de Resíduos:** total centralizado em `16,4 mil kg` com percentuais da semana (`Recicláveis Geral 89,2%`, `Papel 10,3%`, `Óleo 0,32%`, `Orgânicos 0,18%`).
    * **4 KPIs Secundários:** Benefício Socioambiental (`R$ 810,20`), Petróleo (`460.120,40 L`), Árvores poupadas (`138,50`), Espaço em aterro (`81,10 m³`).
    * **Gráfico de Área (Coleta em peso na semana):** Eixo X adaptado para dias úteis da semana (`Seg`, `Ter`, `Qua`, `Qui`, `Sex`) com volume diário em kg.
    * **Gráficos de Barras (Água e Energia na semana):** Eixo X adaptado para dias da semana (`Seg` a `Sex`) com unidades dinâmicas (`mil L` e `MWh`).
* **Pílula "Mês atual":**
  * Restaura imediatamente a visão consolidada do período mensal/semestral (`266.049,94 MWh`, `637.995,42 L`, `68,3 mil kg`) com evolução mês a mês (`Abr` a `Out`).

---

## 🚀 5. Itens Implementados e Evoluídos no Código

1. **Abas `Cooperativa` e `Gestor`** finalizadas e integradas com submenus de navegação e busca de CEP automática via API.
2. **Modais da tela de Relatórios** seguindo 100% o novo Design System:
   * Modal de **Edição de Coleta e Itens** (com cálculo automático de peso total e justificativa obrigatória).
   * Modal de **Confirmação de Exclusão** com alerta destrutivo.
   * Modal de **Galeria de Evidências Fotográficas** com zoom e avaria.
3. **Fluxo Mobile / Cooperativa (`/ponto-coleta` e Login Cooperativa `/signIn-client`)** implementado com calculadora de densidade (L -> Kg), lista de PEVs e evidências.
4. **Filtro dinâmico e reativo do Dashboard** com transição fluida sem recarregar a tela inteira.
5. **Sidebar inteligente** com submenus expansíveis e modal completo de configurações de perfil.
6. **Símbolo Oficial do YBY**: Substituição total de 100% dos emojis provisórios (`🌱`) pelo símbolo autêntico do YBY através dos componentes `YbyIcon.jsx` e `YbyLogo.jsx` em todas as telas (Sidebar, MobileHeader, split-screen de Login, Landing Page e Favicon).
