# 01 — Visão Geral, Domínio e Regras de Negócio

## 1. O que é o Projeto YBY?

A **YBY Soluções Sustentáveis** é uma empresa/plataforma focada em **gestão de resíduos sólidos, coleta seletiva descomplicada, economia circular e impacto socioambiental positivo (ESG)**.

O ecossistema digital da YBY divide-se em duas frentes principais:
1. **Site Institucional (`https://somosyby.com.br/`):**
   * Apresenta a proposta de valor da YBY para condomínios, empresas, escolas e instituições.
   * Destaca serviços como Gestão Integrada de Resíduos, Logística Reversa, Educação Ambiental, Compostagem *in loco* e inclusão produtiva de cooperativas de catadores.
   * Possui formulário de captação de leads (Condomínio / Empresa).
2. **Plataforma Operacional e de Gestão (`https://somosyby.com/`):**
   * Sistema web (Desktop e Mobile) onde ocorre toda a operação de ponta a ponta: cadastro de clientes/PEVs, cooperativas e gestores, planejamento semanal de rotas de coleta, registro das coletas em campo pelas cooperativas (com fotos e geolocalização), auditoria/relatórios operacionais e dashboards de impacto ambiental (ESG).

---

## 2. Atores e Perfis de Acesso (RBAC)

O sistema possui **4 perfis de usuários** com visões, permissões e fluxos específicos:

| Perfil | Forma de Login | Permissão de Visualização | Permissão de Ação |
| :--- | :--- | :--- | :--- |
| **1. Administrador (`isAdmin: true`)** | `/signIn` (E-mail e Senha) | Acesso irrestrito a todas as telas (`Cadastro`, `Planejamento`, `Relatórios`, `Dashboard`, `Edição`). | Criar/editar clientes, cooperativas e gestores; definir planejamento semanal; filtrar todos os PEVs; editar/excluir coletas nos relatórios; exportar PDFs, Excel e Stories. |
| **2. Gestor (`role: "gestor"`)** | `/signIn` (E-mail e Senha) | Acesso apenas a `Relatórios` e `Dashboard`, restrito à carteira de **Clientes vinculados** (`manager.clients`) ao seu perfil. | Filtrar entre os PEVs da sua carteira, visualizar evidências fotográficas das coletas, exportar relatórios (PDF/Excel) e indicadores do Dashboard (PDF/Stories). Não edita nem exclui coletas. |
| **3. Cliente / PEV (`client_id`)** | `/signIn` (E-mail e Senha) | Acesso apenas a `Relatórios` e `Dashboard`, restrito **exclusivamente aos dados do próprio PEV/Cliente**. | Visualizar histórico de coletas do seu condomínio/empresa, ver fotos dos coletores e avarias, acompanhar seus indicadores ambientais no Dashboard e baixar PDF/Excel/Stories. Não vê filtro de busca de outros PEVs ou cooperativas e não edita/exclui registros. |
| **4. Cooperativa (`cooperative_id`)** | `/signIn-client` (Apenas **Código de Acesso**) | Redirecionado automaticamente para `/ponto-coleta` (menu lateral exibe apenas `PEVs`). | Visualizar a lista de PEVs atribuídos à cooperativa no planejamento semanal (com destaque para coletas de `HOJE`) e **registrar novas coletas em campo** com múltiplos resíduos, pesos/volumes, fotos dos coletores, fotos de avarias e geolocalização GPS. |

---

## 3. Entidades Principais do Domínio

1. **Cliente / PEV (Ponto de Entrega Voluntária):**
   * Condomínio, empresa ou instituição onde os resíduos são gerados e armazenados para coleta.
   * Dados: `Razão Social (social_name)`, `CNPJ`, `Nome do Responsável`, `E-mail`, `Telefone`, `Usuário/Senha`, `Endereço (CEP, Rua, Número, Bairro, Cidade, Estado)` e eventual vínculo com sub-clientes (`clients`).
2. **Cooperativa (`Cooperative`):**
   * Organização parceira responsável por realizar a coleta física nos PEVs.
   * Dados: `Nome da Cooperativa`, `Código de Acesso (cooperative_code_access)` (usado para login simplificado dos coletores) e `Quantidade de cooperados/colaboradores (cooperative_employees)`.
3. **Gestor (`Manager`):**
   * Usuário que administra ou acompanha um grupo específico de Clientes/PEVs (ex: administradora de condomínios, consultor ambiental ou gestor regional).
   * Dados: `Nome de usuário`, `E-mail`, `Senha` e `Lista de Clientes vinculados (clients)`.
4. **Planejamento (`Planning`):**
   * Grade semanal fixa de **Segunda a Sexta-feira** (`seg`, `ter`, `qua`, `qui`, `sex`) para cada PEV.
   * Define em quais dias da semana o PEV recebe coleta e **qual Cooperativa** é responsável por cada dia.
5. **Resíduos (`Wastes`):**
   * Categorias de materiais coletados:
     1. `Plástico` (ID: 1)
     2. `Papel` (ID: 2)
     3. `Metal` (ID: 3)
     4. `Vidro` (ID: 4)
     5. `Recicláveis Geral` (ID: 5)
     6. `Orgânicos` (ID: 6)
     7. `Óleo` (ID: 7)
6. **Coleta (`Collection`) e Itens da Coleta (`Collection Items`):**
   * **Coleta Mãe (`Collection`):** Registro do evento de coleta contendo `ID`, `Data/Horário (collection_date)`, `PEV (client)`, `Cooperativa (cooperative)`, `Peso Total (weight em Kg)`, `Geolocalização (latitude, longitude)`, `Foto de Avaria Geral (breakdown)` e `Justificativa de Edição (justification)`.
   * **Itens da Coleta (`items` / `collection-items`):** Cada coleta pode conter **1 ou mais resíduos detalhados**, registrando para cada item:
     * `Ordem (order)`
     * `Resíduo (waste / waste_name)`
     * `Quantidade Original (original_quantity)` e `Unidade Original (original_unit: "kg" | "L")`
     * `Detalhamento de Volume de Coletores (collector_volume_breakdown)`
     * `Peso Calculado/Corrigido em Kg (weight_kg)`
     * `Evidência Fotográfica do Coletor (colector)`

---

## 4. Regras de Negócio Críticas

### 4.1. Conversão de Volume (Litros) para Peso (Kg) por Densidade
Quando a cooperativa registra uma coleta em campo (`/ponto-coleta`), ela pode informar a quantidade diretamente em **Kg** ou em **Litros (L)** (inclusive selecionando a quantidade de coletores cheios).
Quando informado em **Litros**, o sistema converte automaticamente para **Kg** multiplicando o volume pela **tabela de densidade específica do resíduo**:

| Tipo de Resíduo | Fator de Conversão (Kg por Litro) |
| :--- | :--- |
| **Plástico** | `1.41` |
| **Metal** | `2.70` |
| **Vidro** | `2.50` |
| **Papel** | `0.80` |
| **Orgânicos** | `1.10` |
| **Óleo** | `0.90` |
| **Recicláveis Geral** | `1.40` |

### 4.2. Auditoria e Edição de Coletas com Múltiplos Itens
* Quando o **Administrador** edita uma coleta na tela de Relatórios:
  * A edição de peso é feita **sempre em Kg** (individualmente por item quando a coleta possui múltiplos itens, recalculando automaticamente o peso total da coleta mãe).
  * A **quantidade original**, a **unidade original (`kg` ou `L`)** e o **detalhamento de coletores** são **preservados de forma imutável como histórico** da coleta.
  * Toda edição de coleta exige o preenchimento obrigatório do campo **Justificativa da edição (`Motivo da edição`)**.

### 4.3. Controle Diário de Coleta em Campo
* Na visão da Cooperativa (`/ponto-coleta`), os PEVs que possuem coleta agendada para o dia da semana atual recebem a tag **`HOJE`** e aparecem no topo da lista.
* O botão **`"Coletar aqui"`** só fica habilitado nos dias em que o PEV está agendado para aquela cooperativa.
* Após coletar um PEV no dia, seu ID é salvo localmente (`localStorage.getItem("ids")`, limpo a cada 24h) e o botão passa a exibir **`"Já foi coletado"`** (desabilitado) para evitar duplicidade acidental pela equipe de campo.

### 4.4. Indicadores de Impacto Ambiental (ESG)
A partir do peso e tipo dos resíduos coletados, o sistema calcula e apresenta no Dashboard (e nas exportações de PDF e Instagram Stories):
* **Peso total coletado (kg)**
* **Água economizada (Litros)**
* **Energia economizada (MWh)**
* **Emissões de CO₂e evitadas (kg CO₂e)**
* **Árvores poupadas (unidades equivalentes)**
* **Petróleo economizado (Litros)**
* **Espaço em aterro sanitário poupado**
* **Valor financeiro recuperado (R$)**
