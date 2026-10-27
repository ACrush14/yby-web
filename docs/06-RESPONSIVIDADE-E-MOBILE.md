# 06 — Estratégia de Responsividade e Experiência Mobile (Celular, Tablet e Desktop)

Como o protótipo no Figma foi desenhado na resolução Desktop (`1440px`), este documento especifica exatamente como **cada tela, tabela, menu e gráfico** se comportará em telas menores (**Celulares e Tablets**), garantindo uma experiência fluida, sem quebras de layout ou rolagem horizontal indesejada.

---

## 📐 1. Sistema de Breakpoints e Grid Fluido

Toda a interface será construída com **CSS Grid / Flexbox** e abordagem **Mobile-First**, utilizando 3 faixas principais de resolução:

| Breakpoint | Faixa de Largura | Dispositivos Alvo | Comportamento da Estrutura Base (`AppShell`) |
| :--- | :--- | :--- | :--- |
| **Mobile (`sm`)** | `320px` a `767px` | Celulares Android e iPhone (retrato) | **Sem Sidebar fixa.** Exibe `MobileHeader` fixo no topo (`56px`) com Logo YBY à esquerda e botão Menu Hamburguer (`☰`) à direita que abre um **Drawer deslizante**. Padding lateral de `16px`. |
| **Tablet (`md`)** | `768px` a `1023px` | iPads, Tablets e Celulares deitados | **Sidebar recolhida por padrão (`72px` apenas ícones)** com opção de expandir sobre o conteúdo, ou Drawer rápido. Grids em 2 colunas. Padding lateral de `24px`. |
| **Desktop (`lg` / `xl`)** | `1024px` a `1440px+` | Notebooks e Monitores | **Sidebar completa (`240px`)** com botão `<` para recolher (`72px`). Conteúdo principal fluido com largura máxima controlada e padding de `32px` a `40px`. |

---

## 📱 2. Adaptação Tela a Tela para Celular (Mobile)

### 2.1. Landing Page Institucional (`/`)
* **Navbar:**
  * *Desktop:* Logo + 4 links horizontais (`Como funciona`, `Impacto`, `Funcionalidades`, `Para quem`) + botão `Entrar`.
  * *Celular:* Logo à esquerda + botão `Entrar` compacto + ícone `☰` que abre menu vertical suave com as âncoras da página.
* **Hero Section:**
  * Tipografia fluida (`clamp(2rem, 5vw, 3.75rem)`) para que o título `"Gestão de resíduos com dados de impacto"` fique imponente sem estourar a tela do celular.
* **Seções em Grid:**
  * **Impacto Mensurável (4 KPIs):** `4 colunas` no Desktop -> `2x2` no Tablet -> `1 coluna empilhada` no Celular.
  * **Como Funciona (Passos 01 a 04):** `4 colunas` no Desktop -> `2x2` no Tablet -> `Lista vertical conectada` no Celular.
  * **Para Quem (3 perfis):** `3 colunas` no Desktop -> `1 coluna` no Celular.
  * **Funcionalidades (4 cards):** `2x2` no Desktop -> `1 coluna` no Celular.

---

### 2.2. Autenticação (`/signIn`, `/forgot-password`, `/reset-password`, `/signIn-client`)
* *Desktop:* Layout **Split-Screen** (`50%` painel institucional verde floresta `#1E5E2A` à esquerda + `50%` painel creme com card branco à direita).
* *Celular:*
  * O painel esquerdo verde floresta se transforma em um **Cabeçalho Compacto Institucional** no topo (`padding: 24px 16px`), exibindo a logo YBY e a frase `"Cada coleta registrada vira impacto medido."`.
  * Logo abaixo, o card branco de Login ocupa `100%` da largura útil com inputs de altura confortável para toque (`min-height: 48px`) e fonte `16px` (evitando o auto-zoom forçado do iOS Safari ao focar no campo).

---

### 2.3. Dashboard Ambiental (`/dashboard`)
* **Header:**
  * *Desktop:* Título `"Dashboard"` à esquerda e botões `"Baixar artes para Stories"` + `"Baixar relatório PDF"` lado a lado à direita.
  * *Celular:* Título no topo e os 2 botões de exportação dividindo `50% / 50%` da linha logo abaixo do título.
* **Barra de Filtros (`#F4EFE6`):**
  * *Desktop:* 4 inputs lado a lado + pílulas `"Mês atual"` e `"Semana Atual"`.
  * *Celular:* Pílulas `"Mês atual"` e `"Semana Atual"` visíveis imediatamente no topo + botão recolhível `"Filtros avançados (PEV, Resíduo, Período) v"` para não ocupar toda a primeira dobra da tela do celular, ou empilhados em grid `1 coluna` (PEV e Resíduo) e `2 colunas` (`Data inicial` | `Data final`).
* **Cards de KPIs (Primários e Secundários):**
  * *Desktop:* `4 colunas` (`repeat(4, 1fr)`).
  * *Tablet:* `2 colunas` (`repeat(2, 1fr)`).
  * *Celular:* `1 coluna` para os 4 KPIs principais (com ícone circular à esquerda e valor grande à direita) e grid `2x2` compacto para os 4 KPIs secundários.
* **Gráficos (`Coleta em peso`, `Tipo de resíduo`, `Água`, `Energia`):**
  * *Desktop:* `2 colunas` (`65% / 35%` na linha superior e `50% / 50%` na inferior).
  * *Celular:* `1 coluna` (`100%` de largura), usando `ResponsiveContainer` com altura otimizada (`260px`) e tooltips adaptados ao toque.

---

### 2.4. Planejamento Semanal (`/planejamento`) — Solução Dupla (Tabela Desktop vs. Cards Mobile)
> [!IMPORTANT]
> Uma tabela de 7 colunas (`Cliente`, `Seg`, `Ter`, `Qua`, `Qui`, `Sex`, `Status`) fica difícil de usar em uma tela de celular de `375px` se apenas for espremida. Por isso, aplicaremos **Renderização Adaptativa**:

* **No Desktop (`>= 1024px`):**
  * Exibe exatamente a **Tabela / Matriz Semanal** do novo Figma (`node-id=122-1141`), com todas as 7 colunas lado a lado.
* **No Celular (`< 768px`):**
  * Cada Cliente/PEV é renderizado como um **Card Semanal Interativo**:
    * **Cabeçalho do Card:** Nome do Cliente (`Arvoredo`), subtítulo (`"3 de 5 dias com cooperativa"`) e badge de status à direita (`✓ Salvo` ou `● Não salvo`).
    * **Corpo do Card:** Grade limpa dos 5 dias úteis (`Segunda` a `Sexta`), onde cada dia mostra o rótulo à esquerda e o **Select em pílula colorida da cooperativa** à direita com área de toque ampla (`44px` de altura).
  * **Botão `"Salvar alterações"`:** No celular, quando houver qualquer linha com status `● Não salvo`, aparece uma **Barra Flutuante Inferior (Sticky Bottom Bar)** com o contador de alterações pendentes e o botão verde `"Salvar alterações"` sempre ao alcance do polegar!

---

### 2.5. Relatórios (`/relatorios`)
* **Card de Filtros:**
  * *Desktop:* 3 campos na linha 1 + 2 datas e botão `Filtrar` na linha 2.
  * *Celular:* Campos empilhados com `Data inicial` e `Data final` lado a lado (`50% / 50%`) e botão `"Filtrar"` em largura total (`100%`).
* **Listagem de Coletas:**
  * *Desktop (`>= 1024px`):* Tabela completa com *zebra striping* conforme o Figma (`node-id=42-531`).
  * *Tablet (`768px - 1023px`):* Tabela com scroll horizontal suave e coluna `PEV` + `Ações` fixas (*sticky*).
  * *Celular (`< 768px`):* **Modo Card de Coleta Mobile** (com opção de alternar para tabela):
    * Topo do card: `#ID 2561` + `15/10/2026 às 15:00` + Badge `"Recicláveis Geral"`.
    * Meio do card: **PEV** em destaque (`Prisma Residencial`), **Peso (`50 kg`)**, **Cooperativa (`Rosa Virginia`)** e **Avaria (`Não`)**.
    * Rodapé do card: Botões de ação com área de toque confortável (`Editar`, `Ver Fotos`, `Excluir`).

---

### 2.6. Cadastro e Edição Unificados (`/cadastro` e `/edicao`)
* **Abas em Pílula (`Cliente` | `Cooperativa` | `Gestor`):**
  * Em celulares, ocupam `100%` da largura divididas igualmente em 3 partes (`flex: 1`), facilitando a troca de aba com o polegar.
* **Formulários (`Dados básicos` e `Endereço`):**
  * *Desktop:* Grid de `3 colunas` (ex: `Razão social`, `CNPJ`, `Responsável`).
  * *Tablet:* Grid de `2 colunas`.
  * *Celular:* Grid de `1 coluna` (exceto pares curtos como `Número` + `CEP` ou `Estado` + `Cidade`, que podem ficar `50% / 50%`).
  * Botões `"Cancelar"` e `"Cadastrar" / "Salvar alterações"` ficam lado a lado ocupando `100%` da base do card no celular.

---

### 2.7. Ponto de Coleta (`/ponto-coleta` — Visão da Cooperativa em Campo)
* Como as cooperativas utilizam o sistema majoritariamente pelo **celular durante a rota de coleta**, esta tela terá prioridade máxima de ergonomia mobile:
  * Botões grandes (`min-height: 48px`), alto contraste sob luz solar, destaque visual imediato para PEVs com coleta **HOJE**, abertura direta da câmera traseira (`capture="environment"`) para foto dos coletores/avarias e captura automática de GPS.

---

### 2.8. Menu Lateral (Sidebar / Drawer no Mobile) e Modal de Configurações
* **Drawer Deslizante no Celular (`MobileHeader` + `Sidebar`):**
  * O menu hamburguer abre a Sidebar como Drawer lateral suave (`280px` de largura útil) com backdrop fosco.
  * **Submenus Expansíveis:** Os acordeões de `Cadastro` e `Edição` abrem com toque suave revelando `Cliente`, `Cooperativa` e `Gestor`.
  * **Fechamento Automático:** Ao selecionar qualquer subitem, o drawer se fecha automaticamente para exibir o formulário na aba correta.
  * **Perfil e Configurações:** O card de perfil no rodapé exibe o avatar e botão de engrenagem (`⚙️`), abrindo o `AccountSettingsModal.jsx` em tela cheia/bottom-sheet no celular, permitindo trocar foto e redefinir senha com teclado virtual otimizado.

---

## ♿ 3. Diretrizes de Usabilidade Touch e Acessibilidade Web
Seguindo a skill instalada `web-design-guidelines`:
1. **Alvos de Toque (*Tap Targets*):** Nenhum botão, ícone de ação (`Editar`, `Excluir`, `Fotos`) ou pílula de seleção terá menos de **`44px x 44px`** de área clicável no mobile.
2. **Prevenção de Zoom Indesejado no Mobile:** Todos os `<input>` e `<select>` terão `font-size: 16px` no breakpoint mobile.
3. **Modais Responsivos (*Bottom Sheet* no Celular):** Modais de edição de coleta, galeria de fotos e seleção de cooperativa abrem centralizados no Desktop e como **Bottom Sheet** (deslizando de baixo para cima) no Celular.
