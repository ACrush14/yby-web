# 03 — Arquitetura Técnica e Mapeamento de API

## 1. Stack Tecnológica do Sistema Atual

* **Frontend (`somosyby.com`):**
  * **Build Tool:** Vite + React 18 (SPA)
  * **Roteamento:** `react-router-dom` v6
  * **UI & Estilização:** Material UI (`@mui/material`, `@mui/x-data-grid`), `styled-components` e `@emotion`
  * **Tipografia atual:** `Manrope` (interface geral) e `Spectral` + `Hanken Grotesk` (relatórios executivos e artes para Stories)
  * **Paleta de Cores Atual:**
    * Verde Primário: `#15853B` / `#2E7D32` / Floresta `#14271C`, `#2C5639`
    * Marrom Secundário: `#4B3838` / `#2E2222`
    * Bege de Fundo/Cards: `#FAF1E8`, `#F9F5ED`, `rgba(221, 195, 147, 0.2)`
  * **Formulários e Validação:** `react-hook-form` + `yup` + `react-imask` (máscaras de CNPJ, CEP e Telefone)
  * **Tabelas e Listas Longas:** `react-virtuoso` + `rxjs` (scroll infinito reativo na tela de Relatórios)
  * **Gráficos:** `recharts` (`LineChart`, `BarChart`, `PieChart`)
  * **Geração de Arquivos no Cliente:**
    * PDF: `@react-pdf/renderer`
    * Excel (`.xlsx`): `xlsx` (SheetJS)
    * Imagens/Stories (`.zip`): `html-to-image` + `jszip` + `file-saver`
* **Backend (`https://back.somosyby.com/api`):**
  * Desenvolvido em **Strapi CMS / Headless API** (identificável pelo padrão `/auth/local`, `/users-permissions/*`, `documentId`, `populate=*` e `filters[...][$eq]`).
  * Autenticação via **Bearer Token JWT** armazenado em `localStorage.getItem("usuario")`.

---

## 2. Catálogo Completo de Endpoints da API (`https://back.somosyby.com/api`)

### 2.1. Autenticação e Usuários
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/local` | Login com `{ identifier, password }`. Para cooperativas, `identifier` é `${codigo}@coop.com`. Retorna `{ jwt, user }`. |
| `GET` | `/users/me?populate[role]=*&populate[clients]=*&populate[manager][populate][clients]=*` | Carrega os dados completos do usuário logado, seu papel (`role`), se é `admin`, `client_id`, `cooperative_id` e a carteira de clientes do gestor (`manager.clients`). |
| `POST` | `/users-permissions/forgot-password` | Solicita recuperação de senha enviando `{ email }`. |
| `POST` | `/users-permissions/reset-password` | Redefine a senha enviando `{ code, password, passwordConfirmation }`. |

### 2.2. Clientes / PEVs (`/clients`)
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `GET` | `/clients?populate=adress_data&pagination[start]=0&pagination[limit]=100000` | Lista todos os clientes com seus endereços. |
| `GET` | `/clients?populate=adress_data&filters[social_name][$eq]=${nome}` | Busca um cliente específico pela Razão Social (usado na tela de Edição). |
| `GET` | `/clients?filters[cnpj][$in][0]=...` | Busca clientes filtrando por lista de CNPJs (ou todos se array vazio). |
| `GET` | `/clients?filters[email][$eq]=${email}` | Verifica se o e-mail já está cadastrado antes de criar novo cliente. |
| `POST` | `/clients` | Cria novo cliente e seu PEV/endereço (`{ data: { cnpj, social_name, email, responsible_name, password, phone, adress_data: [...] } }`). |
| `PUT` | `/clients/${document_id}` | Atualiza dados cadastrais, endereço e sub-clientes de um cliente existente. |

### 2.3. Cooperativas (`/cooperatives`)
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `GET` | `/cooperatives?populate=*&pagination[start]=0&pagination[limit]=100000` | Lista todas as cooperativas cadastradas. |
| `POST` | `/cooperatives` | Cria uma nova cooperativa (`{ data: { cooperative_name, cooperative_code_access, cooperative_employees } }`). |
| `PUT` | `/cooperatives/${document_id}` | Atualiza nome, código de acesso e quantidade de cooperados de uma cooperativa. |

### 2.4. Gestores (`/managers`)
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `GET` | `/managers?populate[user]=*&populate[clients]=*&pagination[start]=0&pagination[limit]=100000` | Lista todos os gestores com seus respectivos usuários de login e clientes vinculados. |
| `POST` | `/managers` | Cria um novo gestor (`{ data: { username, email, password, clients } }`). |
| `PUT` | `/managers/${documentId}` | Atualiza nome de usuário, e-mail, senha (opcional) e carteira de clientes do gestor. |

### 2.5. Planejamento Semanal (`/plannings`)
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `GET` | `/plannings?populate=*&pagination[start]=0&pagination[limit]=100000` | Lista o planejamento semanal de todos os PEVs (qual cooperativa coleta em `seg`, `ter`, `qua`, `qui`, `sex`). |
| `GET` | `/plannings?populate=*&pagination[start]=0&pagination[limit]=100000&filters[client][$notNull]=true` | Usado na visão da cooperativa (`/ponto-coleta`) para filtrar os PEVs atribuídos àquela cooperativa e seus dias de coleta. |
| `PUT` | `/plannings/${documentId}` | Salva a escala de segunda a sexta de um PEV (`{ data: { seg, ter, qua, qui, sex } }`). |

### 2.6. Coletas, Itens de Coleta, Resíduos e Upload (`/collections`, `/wastes`, `/upload`)
| Método | Endpoint | Uso / Descrição |
| :--- | :--- | :--- |
| `GET` | `/collections?...` | Busca paginada e filtrada das coletas para a tela de Relatórios e exportações (filtrando por data, PEV, cooperativa, tipo de resíduo e carteira do usuário). |
| `POST` | `/collections/with-items` | Registra uma nova coleta completa enviada pela cooperativa em campo, criando a coleta mãe e seus itens (`items`) em uma única transação. |
| `PUT` | `/collections/${documentId}` | Atualiza dados da coleta mãe (data/hora, peso total recalculado, justificativa de edição, remoção de foto de coletor/avaria). |
| `PUT` | `/collection-items/${documentId}` | Atualiza o peso corrigido em Kg (`weight_kg`) de um item específico da coleta. |
| `DELETE` | `/collections/${documentId}` | Exclui um registro de coleta (ação exclusiva do Admin nos Relatórios). |
| `POST` | `/upload` | Upload `multipart/form-data` das fotos comprimidas dos coletores e avarias. Retorna array com `{ id, url }` da mídia salva. |
| `GET` | `/wastes?pagination[limit]=1000` | Lista os tipos de resíduos cadastrados no sistema. |

### 2.7. Endpoints Analíticos do Dashboard (`/collections/dashboard/*`)
Todos recebem como query params `{ start, end, pevId, wasteId }`:

| Método | Endpoint | Retorno |
| :--- | :--- | :--- |
| `GET` | `/collections/dashboard/by-waste` | Percentual de coleta por tipo de resíduo (Gráfico de Rosca). |
| `GET` | `/collections/dashboard/by-month` | Peso total coletado (kg) mês a mês. |
| `GET` | `/collections/dashboard/by-energy-month` | Energia economizada (MWh) mês a mês. |
| `GET` | `/collections/dashboard/by-water-month` | Água economizada (Litros) mês a mês. |
| `GET` | `/collections/dashboard/by-oil-month` | Petróleo economizado (Litros) mês a mês. |
| `GET` | `/collections/dashboard/by-tree-month` | Árvores poupadas mês a mês. |
| `GET` | `/collections/dashboard/summary` | Resumo geral de peso (`totalWeight`). |
| `GET` | `/collections/dashboard/summary-co2` | Total de CO₂e evitado no período. |
| `GET` | `/collections/dashboard/summary-energy` | Total de energia economizada no período. |
| `GET` | `/collections/dashboard/summary-land-fill-space` | Espaço de aterro sanitário poupado no período. |
| `GET` | `/collections/dashboard/summary-oil` | Total de petróleo economizado no período. |
| `GET` | `/collections/dashboard/summary-recoveredValue` | Valor financeiro estimado recuperado no período. |
| `GET` | `/collections/dashboard/summary-tree` | Total de árvores poupadas no período. |
| `GET` | `/collections/dashboard/summary-water` | Total de água economizada no período. |
