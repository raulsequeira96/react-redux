# React Redux Learning Studio

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
