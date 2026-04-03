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

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    tagsText: '',
  });

  const columns = useMemo(
    () => [
      { key: 'todo', label: 'To do', helper: 'Ideas and queued tasks.' },
      { key: 'doing', label: 'In progress', helper: 'Current focus.' },
      { key: 'done', label: 'Done', helper: 'Completed work.' },
    ],
    []
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

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="kicker">React Redux Learning Studio</p>
        <h1>From Dispatch to UI, End to End</h1>
        <p>
          This board shows real Redux Toolkit patterns: normalized global state, memoized selectors,
          async thunks with request states, and intentional UI updates.
        </p>

        <div className="stats-grid">
          <article className="stat-card">
            <p>Total tasks</p>
            <strong>{stats.total}</strong>
          </article>
          <article className="stat-card">
            <p>In progress</p>
            <strong>{stats.inProgress}</strong>
          </article>
          <article className="stat-card">
            <p>Done</p>
            <strong>{stats.done}</strong>
          </article>
          <article className="stat-card">
            <p>Completion</p>
            <strong>{stats.completionRate}%</strong>
          </article>
        </div>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <h2>Create Task (sync reducer)</h2>
          <p className="panel-note">Dispatches taskAdded with a prepared payload.</p>
          <form onSubmit={handleCreateTask} className="task-form">
            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder="Add memoized selector examples"
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={updateForm}
                placeholder="What should be implemented?"
                rows={3}
              />
            </label>

            <div className="inline-grid">
              <label>
                Priority
                <select name="priority" value={form.priority} onChange={updateForm}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>

              <label>
                Assignee
                <input
                  name="assignee"
                  value={form.assignee}
                  onChange={updateForm}
                  placeholder="Taylor"
                />
              </label>
            </div>

            <label>
              Tags (comma separated)
              <input
                name="tagsText"
                value={form.tagsText}
                onChange={updateForm}
                placeholder="redux, selectors, ui"
              />
            </label>

            <button type="submit" className="button button-primary">
              Add task
            </button>
          </form>

          <div className="action-row">
            <button type="button" className="button" onClick={handleLoadAsyncData}>
              Load async templates
            </button>
            <button type="button" className="button" onClick={() => dispatch(allMarkedDone())}>
              Mark all done
            </button>
            <button type="button" className="button" onClick={() => dispatch(completedCleared())}>
              Clear completed
            </button>
            <button type="button" className="button" onClick={() => dispatch(filtersReset())}>
              Reset filters
            </button>
          </div>

          <div className="request-box" aria-live="polite">
            <strong>Async state:</strong> {request.status}
            {request.error ? <p className="error">{request.error}</p> : null}
          </div>

          {lastDeleted ? (
            <div className="undo-box">
              Last deleted: <strong>{lastDeleted.title}</strong>
              <button
                type="button"
                className="button button-inline"
                onClick={() => dispatch(lastDeletedRestored())}
              >
                Undo
              </button>
            </div>
          ) : null}
        </section>

        <section className="panel filters-panel">
          <h2>Selectors + Filters</h2>
          <p className="panel-note">
            Filters are global state. The board uses memoized selectors to avoid unnecessary recalculations.
          </p>
          <div className="filters-grid">
            <label>
              Search
              <input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search text, tag, assignee..."
              />
            </label>

            <label>
              Status
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="todo">To do</option>
                <option value="doing">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label>
              Priority
              <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>

            <label>
              Tag
              <select name="tag" value={filters.tag} onChange={handleFilterChange}>
                <option value="all">All</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Assignee
              <select name="assignee" value={filters.assignee} onChange={handleFilterChange}>
                <option value="all">All</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Sort
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>

          <p className="visible-count">
            Showing <strong>{visibleTasks.length}</strong> task(s) from global state.
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
                    <span className={priorityClass[task.priority]}>{task.priority}</span>
                    <span className={statusClass[task.status]}>{statusLabel[task.status]}</span>
                  </div>

                  <h4>{task.title}</h4>
                  <p>{task.description || 'No description.'}</p>

                  <div className="meta-row">
                    <span>@{task.assignee}</span>
                    <span>{new Date(task.createdAt).toLocaleTimeString()}</span>
                  </div>

                  <div className="tag-row">
                    {task.tags.length ? task.tags.map((tag) => <span key={tag}>#{tag}</span>) : <span>#none</span>}
                  </div>

                  <div className="card-actions">
                    <button type="button" className="button" onClick={() => dispatch(taskStatusReverted(task.id))}>
                      Back
                    </button>
                    <button type="button" className="button" onClick={() => dispatch(taskStatusAdvanced(task.id))}>
                      Next
                    </button>
                    <button type="button" className="button" onClick={() => dispatch(taskToggled(task.id))}>
                      Toggle done
                    </button>
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => dispatch(taskDeleted(task.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {grouped[column.key].length === 0 ? (
                <p className="column-empty">No tasks in this column for current filters.</p>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
