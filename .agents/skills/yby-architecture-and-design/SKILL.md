---
name: yby-architecture-and-design
description: >-
  Architecture, SOLID/GRASP engineering standards, JavaScript coding rules,
  Figma Design System tokens, and mobile responsiveness guidelines for the YBY project.
  Use whenever creating, refactoring, or reviewing any file in the YBY repository.
---

# YBY Architecture, SOLID/GRASP & Design System Skill

Use this skill whenever building or modifying any module in the **YBY** web application (`somosyby.com` / `somosyby.com.br` redesign).

## 1. Language & Tech Stack Constraints
- **Language:** Pure **JavaScript (ES6+ — `.js` and `.jsx`)** with **JSDoc** annotations for IDE autocomplete and readability. Do NOT use TypeScript (`.ts`/`.tsx`) unless explicitly requested by the user.
- **Keep Files Small & Readable:** No file should exceed ~150–200 lines. Split large views into focused subcomponents and extract state orchestration into Controller Hooks (`use<Feature>Controller.js`).

## 2. Mandatory SOLID & GRASP Rules
1. **Single Responsibility (SRP) & GRASP Controller:**
   - `.jsx` View files ONLY render UI and forward user events to a Controller Hook (`use...Controller.js`).
   - `.jsx` files NEVER call `fetch`/`axios` directly and NEVER contain domain math or business rules.
2. **Information Expert & Pure Domain (`src/domain/`):**
   - All domain calculations (e.g., converting Liters to Kg via waste density factors, calculating `"X de 5 dias com cooperativa"`, detecting `"Salvo"` vs `"Não salvo"`, checking RBAC permissions) MUST live in pure JavaScript functions inside `src/domain/`.
3. **Open/Closed (OCP) & Polymorphism:**
   - Use configuration maps/strategies instead of long `if/else` or `switch` chains for waste density conversions (`Plástico: 1.41`, `Metal: 2.70`, `Vidro: 2.50`, `Papel: 0.80`, `Orgânicos: 1.10`, `Óleo: 0.90`, `Recicláveis Geral: 1.40`), cooperative colors, role permissions (`Admin`, `Gestor`, `Cliente`, `Cooperativa`), and report exporters (`PDF`, `Excel`, `Stories`).
4. **Dependency Inversion (DIP) & Protected Variations (`src/services/mappers/`):**
   - Never leak raw Strapi API structures (`attributes`, `documentId`, `filters[$eq]`) into UI components. Always normalize API responses in `src/services/mappers/` before returning them from repositories.

## 3. YBY Figma Design System Tokens
- **Brand Dark Green (Auth Left Panel):** `#1E5E2A`
- **Primary Action Green (Buttons, Active Tabs, Charts):** `#267332` (hover `#1E5E2A`)
- **Soft Green (Active Sidebar Item, Focus Ring, Badges):** `#DCEAD9` / `#E6F0E8`
- **Cream Surface (Sidebar, Filter Cards, Table Header):** `#F4EFE6` / `#F6F2EA`
- **Table Zebra Alt Row & KPI Card Background:** `#F7F4EC`
- **Heading Text (Dark Earth Brown):** `#3D2E28` / `#2E2222`
- **Muted Text / Labels:** `#7A7067`
- **Borders:** `#E6DFD3`
- **Semantic Accents:**
  - Energy / Rede Ceará / Unsaved Status: `#E65124` (Orange)
  - Water / Oil / Coocencipe: `#005885` (Deep Blue)
  - CO₂ / Trees: `#2A5C43` (Forest Teal)
  - Danger / Delete: `#C62828` (Red)

## 4. Mobile-First & Responsive Design (`320px` -> `1440px+`)
- Every screen MUST work seamlessly on Mobile (`< 768px`), Tablet (`768px - 1023px`), and Desktop (`>= 1024px`).
- **Sidebar:** Collapsible permanent sidebar on Desktop (`240px` expanded / `72px` collapsed); top `MobileHeader` + slide-over Drawer on Mobile.
- **Planejamento (`/planejamento`) & Relatórios (`/relatorios`):** Full table on Desktop (`>= 1024px`); interactive Mobile Cards on phones (`< 768px`) with >= `44x44px` touch targets.
