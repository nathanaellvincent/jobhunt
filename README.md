# jobhunt

Job application pipeline tracker built with Vue 3, Pinia, and Tailwind CSS. Kanban board + stats view, persisted to `localStorage`.

## Why this project

Demonstrates Vue 3 patterns distinct from React:

| Pattern | Where |
|---|---|
| `<script setup>` Composition API | all `.vue` files |
| `defineProps` / `defineEmits` | `AppCard.vue`, `AddModal.vue` |
| Pinia store with `defineStore` (Options vs Setup style) | `stores/applications.js` |
| `<Teleport>` for portal rendering | `AddModal.vue` |
| `vue-router` with hash history + lazy routes | `router/index.js` |
| `computed` derived state from store | `stores/applications.js` |
| `watch` for form reset on prop change | `AddModal.vue` |
| `localStorage` persistence without a library | `stores/applications.js` |

## Features

- **Kanban board**: 7-column pipeline (Wishlist → Offer / Rejected)
- **Per-card actions**: move stage, open URL, delete
- **Stats page**: KPI cards + Bar chart (per-stage) + Doughnut (status split)
- **LocalStorage**: survives page refresh, no backend needed

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```
