import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  allMarkedDone,
  completedCleared,
  filtersReset,
  filtersUpdated,
  lastDeletedRestored,
  loadDemoTasks,
  selectAvailableAssignees,
  selectAvailableTags,
  selectFilteredTasks,
  selectFilters,
  selectGroupedTasks,
  selectLastDeleted,
  selectRequest,
  selectStats,
  taskAdded,
  taskDeleted,
  taskStatusAdvanced,
  taskStatusReverted,
  taskToggled,
} from './features/board/boardSlice';

const statusLabel = {
  todo: 'To do',
  doing: 'In progress',
  done: 'Done',
};

const statusClass = {
  todo: 'chip chip-todo',
  doing: 'chip chip-doing',
  done: 'chip chip-done',
};

const priorityClass = {
  high: 'priority high',
  medium: 'priority medium',
  low: 'priority low',
};

const messages = {
  en: {
    languageButton: 'ES',
    languageButtonA11y: 'Switch to Spanish',
    kicker: 'React Redux Learning Studio',
    title: 'From Dispatch to UI, End to End',
    intro:
      'This board shows real Redux Toolkit patterns: normalized global state, memoized selectors, async thunks with request states, and intentional UI updates.',
    statsTotal: 'Total tasks',
    statsInProgress: 'In progress',
    statsDone: 'Done',
    statsCompletion: 'Completion',
    createTitle: 'Create Task (sync reducer)',
    createNote: 'Dispatches taskAdded with a prepared payload.',
    labelTitle: 'Title',
    placeholderTitle: 'Add memoized selector examples',
    labelDescription: 'Description',
    placeholderDescription: 'What should be implemented?',
    labelPriority: 'Priority',
    labelAssignee: 'Assignee',
    placeholderAssignee: 'Taylor',
    labelTags: 'Tags (comma separated)',
    placeholderTags: 'redux, selectors, ui',
    actionAddTask: 'Add task',
    actionLoadTemplates: 'Load async templates',
    actionMarkAllDone: 'Mark all done',
    actionClearCompleted: 'Clear completed',
    actionResetFilters: 'Reset filters',
    asyncState: 'Async state',
    lastDeleted: 'Last deleted',
    undo: 'Undo',
    filtersTitle: 'Selectors + Filters',
    filtersNote:
      'Filters are global state. The board uses memoized selectors to avoid unnecessary recalculations.',
    labelSearch: 'Search',
    placeholderSearch: 'Search text, tag, assignee...',
    labelStatus: 'Status',
    labelTag: 'Tag',
    labelSort: 'Sort',
    all: 'All',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    sortPriority: 'Priority',
    sortTitle: 'Title',
    visibleCountStart: 'Showing',
    visibleCountEnd: 'task(s) from global state.',
    columnTodoLabel: 'To do',
    columnTodoHelper: 'Ideas and queued tasks.',
    columnDoingLabel: 'In progress',
    columnDoingHelper: 'Current focus.',
    columnDoneLabel: 'Done',
    columnDoneHelper: 'Completed work.',
    noDescription: 'No description.',
    noTags: '#none',
    back: 'Back',
    next: 'Next',
    toggleDone: 'Toggle done',
    delete: 'Delete',
    emptyColumn: 'No tasks in this column for current filters.',
    statuses: {
      todo: 'To do',
      doing: 'In progress',
      done: 'Done',
    },
    priorities: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    requestStatus: {
      idle: 'idle',
      loading: 'loading',
      succeeded: 'succeeded',
      failed: 'failed',
    },
  },
  es: {
    languageButton: 'EN',
    languageButtonA11y: 'Cambiar a ingles',
    kicker: 'Laboratorio React Redux',
    title: 'Del Dispatch a la UI, de punta a punta',
    intro:
      'Este tablero muestra patrones reales de Redux Toolkit: estado global normalizado, selectores memoizados, thunks async con estados de request y actualizaciones intencionales de UI.',
    statsTotal: 'Total de tareas',
    statsInProgress: 'En progreso',
    statsDone: 'Completadas',
    statsCompletion: 'Avance',
    createTitle: 'Crear tarea (reducer sync)',
    createNote: 'Dispara taskAdded con payload preparado.',
    labelTitle: 'Titulo',
    placeholderTitle: 'Agregar ejemplos de selectores memoizados',
    labelDescription: 'Descripcion',
    placeholderDescription: 'Que se debe implementar?',
    labelPriority: 'Prioridad',
    labelAssignee: 'Responsable',
    placeholderAssignee: 'Taylor',
    labelTags: 'Etiquetas (separadas por coma)',
    placeholderTags: 'redux, selectores, ui',
    actionAddTask: 'Agregar tarea',
    actionLoadTemplates: 'Cargar plantillas async',
    actionMarkAllDone: 'Marcar todo como hecho',
    actionClearCompleted: 'Limpiar completadas',
    actionResetFilters: 'Resetear filtros',
    asyncState: 'Estado async',
    lastDeleted: 'Ultima eliminada',
    undo: 'Deshacer',
    filtersTitle: 'Selectores + Filtros',
    filtersNote:
      'Los filtros viven en estado global. El tablero usa selectores memoizados para evitar recalculos innecesarios.',
    labelSearch: 'Busqueda',
    placeholderSearch: 'Buscar texto, etiqueta, responsable...',
    labelStatus: 'Estado',
    labelTag: 'Etiqueta',
    labelSort: 'Orden',
    all: 'Todos',
    sortNewest: 'Mas nuevos',
    sortOldest: 'Mas antiguos',
    sortPriority: 'Prioridad',
    sortTitle: 'Titulo',
    visibleCountStart: 'Mostrando',
    visibleCountEnd: 'tarea(s) del estado global.',
    columnTodoLabel: 'Por hacer',
    columnTodoHelper: 'Ideas y tareas en cola.',
    columnDoingLabel: 'En progreso',
    columnDoingHelper: 'Foco actual.',
    columnDoneLabel: 'Hecho',
    columnDoneHelper: 'Trabajo completado.',
    noDescription: 'Sin descripcion.',
    noTags: '#ninguna',
    back: 'Atras',
    next: 'Siguiente',
    toggleDone: 'Alternar hecho',
    delete: 'Eliminar',
    emptyColumn: 'No hay tareas en esta columna para los filtros actuales.',
    statuses: {
      todo: 'Por hacer',
      doing: 'En progreso',
      done: 'Hecho',
    },
    priorities: {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja',
    },
    requestStatus: {
      idle: 'inactivo',
      loading: 'cargando',
      succeeded: 'ok',
      failed: 'error',
    },
  },
};

function App() {
  const dispatch = useDispatch();

  const filters = useSelector(selectFilters);
  const stats = useSelector(selectStats);
  const grouped = useSelector(selectGroupedTasks);
  const visibleTasks = useSelector(selectFilteredTasks);
  const request = useSelector(selectRequest);
  const lastDeleted = useSelector(selectLastDeleted);
  const tags = useSelector(selectAvailableTags);
  const assignees = useSelector(selectAvailableAssignees);
  const [language, setLanguage] = useState('en');
  const t = messages[language];

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    tagsText: '',
  });

  const columns = useMemo(
    () => [
      { key: 'todo', label: t.columnTodoLabel, helper: t.columnTodoHelper },
      { key: 'doing', label: t.columnDoingLabel, helper: t.columnDoingHelper },
      { key: 'done', label: t.columnDoneLabel, helper: t.columnDoneHelper },
    ],
    [t]
  );

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const tagsList = form.tagsText
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    dispatch(
      taskAdded({
        title: form.title,
        description: form.description,
        priority: form.priority,
        assignee: form.assignee,
        tags: tagsList,
      })
    );

    setForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      tagsText: '',
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(filtersUpdated({ [name]: value }));
  };

  const handleLoadAsyncData = () => {
    dispatch(loadDemoTasks());
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-top">
          <p className="kicker">{t.kicker}</p>
          <button
            type="button"
            className="button button-language"
            onClick={toggleLanguage}
            aria-label={t.languageButtonA11y}
          >
            {t.languageButton}
          </button>
        </div>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>

        <div className="stats-grid">
          <article className="stat-card">
            <p>{t.statsTotal}</p>
            <strong>{stats.total}</strong>
          </article>
          <article className="stat-card">
            <p>{t.statsInProgress}</p>
            <strong>{stats.inProgress}</strong>
          </article>
          <article className="stat-card">
            <p>{t.statsDone}</p>
            <strong>{stats.done}</strong>
          </article>
          <article className="stat-card">
            <p>{t.statsCompletion}</p>
            <strong>{stats.completionRate}%</strong>
          </article>
        </div>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <h2>{t.createTitle}</h2>
          <p className="panel-note">{t.createNote}</p>
          <form onSubmit={handleCreateTask} className="task-form">
            <label>
              {t.labelTitle}
              <input
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder={t.placeholderTitle}
              />
            </label>

            <label>
              {t.labelDescription}
              <textarea
                name="description"
                value={form.description}
                onChange={updateForm}
                placeholder={t.placeholderDescription}
                rows={3}
              />
            </label>

            <div className="inline-grid">
              <label>
                {t.labelPriority}
                <select name="priority" value={form.priority} onChange={updateForm}>
                  <option value="high">{t.priorities.high}</option>
                  <option value="medium">{t.priorities.medium}</option>
                  <option value="low">{t.priorities.low}</option>
                </select>
              </label>

              <label>
                {t.labelAssignee}
                <input
                  name="assignee"
                  value={form.assignee}
                  onChange={updateForm}
                  placeholder={t.placeholderAssignee}
                />
              </label>
            </div>

            <label>
              {t.labelTags}
              <input
                name="tagsText"
                value={form.tagsText}
                onChange={updateForm}
                placeholder={t.placeholderTags}
              />
            </label>

            <button type="submit" className="button button-primary">
              {t.actionAddTask}
            </button>
          </form>

          <div className="action-row">
            <button type="button" className="button" onClick={handleLoadAsyncData}>
              {t.actionLoadTemplates}
            </button>
            <button type="button" className="button" onClick={() => dispatch(allMarkedDone())}>
              {t.actionMarkAllDone}
            </button>
            <button type="button" className="button" onClick={() => dispatch(completedCleared())}>
              {t.actionClearCompleted}
            </button>
            <button type="button" className="button" onClick={() => dispatch(filtersReset())}>
              {t.actionResetFilters}
            </button>
          </div>

          <div className="request-box" aria-live="polite">
            <strong>{t.asyncState}:</strong> {t.requestStatus[request.status] || request.status}
            {request.error ? <p className="error">{request.error}</p> : null}
          </div>

          {lastDeleted ? (
            <div className="undo-box">
              {t.lastDeleted}: <strong>{lastDeleted.title}</strong>
              <button
                type="button"
                className="button button-inline"
                onClick={() => dispatch(lastDeletedRestored())}
              >
                {t.undo}
              </button>
            </div>
          ) : null}
        </section>

        <section className="panel filters-panel">
          <h2>{t.filtersTitle}</h2>
          <p className="panel-note">{t.filtersNote}</p>
          <div className="filters-grid">
            <label>
              {t.labelSearch}
              <input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder={t.placeholderSearch}
              />
            </label>

            <label>
              {t.labelStatus}
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="all">{t.all}</option>
                <option value="todo">{t.statuses.todo}</option>
                <option value="doing">{t.statuses.doing}</option>
                <option value="done">{t.statuses.done}</option>
              </select>
            </label>

            <label>
              {t.labelPriority}
              <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                <option value="all">{t.all}</option>
                <option value="high">{t.priorities.high}</option>
                <option value="medium">{t.priorities.medium}</option>
                <option value="low">{t.priorities.low}</option>
              </select>
            </label>

            <label>
              {t.labelTag}
              <select name="tag" value={filters.tag} onChange={handleFilterChange}>
                <option value="all">{t.all}</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.labelAssignee}
              <select name="assignee" value={filters.assignee} onChange={handleFilterChange}>
                <option value="all">{t.all}</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.labelSort}
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="newest">{t.sortNewest}</option>
                <option value="oldest">{t.sortOldest}</option>
                <option value="priority">{t.sortPriority}</option>
                <option value="title">{t.sortTitle}</option>
              </select>
            </label>
          </div>

          <p className="visible-count">
            {t.visibleCountStart} <strong>{visibleTasks.length}</strong> {t.visibleCountEnd}
          </p>
        </section>
      </main>

      <section className="board">
        {columns.map((column) => (
          <article key={column.key} className="column">
            <div className="column-head">
              <h3>{column.label}</h3>
              <p>{column.helper}</p>
            </div>

            <div className="cards">
              {grouped[column.key].map((task) => (
                <div key={task.id} className="card">
                  <div className="card-top">
                    <span className={priorityClass[task.priority]}>{t.priorities[task.priority]}</span>
                    <span className={statusClass[task.status]}>{t.statuses[task.status] || statusLabel[task.status]}</span>
                  </div>

                  <h4>{task.title}</h4>
                  <p>{task.description || t.noDescription}</p>

                  <div className="meta-row">
                    <span>@{task.assignee}</span>
                    <span>{new Date(task.createdAt).toLocaleTimeString()}</span>
                  </div>

                  <div className="tag-row">
                    {task.tags.length ? task.tags.map((tag) => <span key={tag}>#{tag}</span>) : <span>{t.noTags}</span>}
                  </div>

                  <div className="card-actions">
                    <button type="button" className="button" onClick={() => dispatch(taskStatusReverted(task.id))}>
                      {t.back}
                    </button>
                    <button type="button" className="button" onClick={() => dispatch(taskStatusAdvanced(task.id))}>
                      {t.next}
                    </button>
                    <button type="button" className="button" onClick={() => dispatch(taskToggled(task.id))}>
                      {t.toggleDone}
                    </button>
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => dispatch(taskDeleted(task.id))}
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))}

              {grouped[column.key].length === 0 ? (
                <p className="column-empty">{t.emptyColumn}</p>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
