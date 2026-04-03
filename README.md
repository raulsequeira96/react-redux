# React Redux Learning Studio

Default language for this README is English. A full Spanish version is included below.

This project is a full educational example of modern React + Redux Toolkit.
It is designed to teach Redux from both perspectives:

- Code architecture (store, slice, selectors, async thunks)
- UI behavior (filters, derived state, task flow, async request states)

## What this demo includes

- Global store with `configureStore`
- Feature slice with reducers and prepared payloads
- Async flow with `createAsyncThunk` (`pending`, `fulfilled`, `rejected`)
- Memoized selectors via `createSelector`
- Derived dashboard stats and filtered/grouped task views
- Undo pattern for deleted items
- Responsive UI that visualizes state transitions in real time

## Project structure

- `src/app/store.js`: Redux store setup
- `src/features/board/boardSlice.js`: State, reducers, thunks, selectors
- `src/App.js`: Connected UI using `useDispatch` and `useSelector`
- `src/App.css` + `src/index.css`: Visual system and responsive layout

## Quick start

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test -- --watchAll=false
```

## Suggested learning path

1. Create tasks from the UI to see sync reducers.
2. Use filters and sort options to understand memoized selectors.
3. Click "Load async templates" to inspect thunk request states.
4. Delete and undo tasks to learn reversible state transitions.
5. Move tasks across columns to see derived grouped views.

---

## Version en Espanol

Este proyecto es un ejemplo educativo completo de React moderno + Redux Toolkit.
Esta pensado para aprender Redux desde dos puntos de vista:

- Arquitectura de codigo (store, slice, selectores, thunks async)
- Comportamiento de UI (filtros, estado derivado, flujo de tareas, estados async)

## Que incluye esta demo

- Store global con `configureStore`
- Slice de feature con reducers y payloads preparados
- Flujo async con `createAsyncThunk` (`pending`, `fulfilled`, `rejected`)
- Selectores memoizados con `createSelector`
- Estadisticas derivadas y vistas filtradas/agrupadas
- Patron de undo para elementos eliminados
- UI responsive que visualiza transiciones de estado en tiempo real

## Estructura del proyecto

- `src/app/store.js`: Configuracion del store de Redux
- `src/features/board/boardSlice.js`: Estado, reducers, thunks, selectores
- `src/App.js`: UI conectada con `useDispatch` y `useSelector`
- `src/App.css` + `src/index.css`: Sistema visual y layout responsive

## Inicio rapido

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm start
```

Build de produccion:

```bash
npm run build
```

Ejecutar tests:

```bash
npm test -- --watchAll=false
```

## Camino sugerido de aprendizaje

1. Crear tareas desde la UI para ver reducers sincronicos.
2. Usar filtros y orden para entender selectores memoizados.
3. Hacer click en "Load async templates" para revisar estados de request en thunks.
4. Eliminar y restaurar tareas para aprender transiciones reversibles de estado.
5. Mover tareas entre columnas para ver vistas derivadas agrupadas.
