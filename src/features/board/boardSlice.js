import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const STATUS = ['todo', 'doing', 'done'];

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const now = Date.now();

const demoTasks = [
  {
    id: 't-1',
    title: 'Create global board state',
    description: 'Store tasks, filters, and API status in Redux.',
    priority: 'high',
    status: 'doing',
    assignee: 'Alex',
    tags: ['state', 'core'],
    completed: false,
    createdAt: now - 1000 * 60 * 60,
  },
  {
    id: 't-2',
    title: 'Design selectors',
    description: 'Use memoized selectors for stats and filtered lists.',
    priority: 'medium',
    status: 'todo',
    assignee: 'Sam',
    tags: ['performance'],
    completed: false,
    createdAt: now - 1000 * 60 * 40,
  },
  {
    id: 't-3',
    title: 'Build async demo action',
    description: 'Simulate server fetch and handle pending/success/error states.',
    priority: 'low',
    status: 'done',
    assignee: 'Riley',
    tags: ['async', 'thunk'],
    completed: true,
    createdAt: now - 1000 * 60 * 20,
  },
];

const fetchedTemplates = [
  {
    id: 'tpl-1',
    title: 'Add optimistic update sample',
    description: 'Show immediate UI change before async confirmation.',
    priority: 'medium',
    status: 'todo',
    assignee: 'Jordan',
    tags: ['async', 'ux'],
    completed: false,
    createdAt: now,
  },
  {
    id: 'tpl-2',
    title: 'Include undo delete behavior',
    description: 'Restore the last removed task from dedicated state.',
    priority: 'high',
    status: 'todo',
    assignee: 'Alex',
    tags: ['patterns'],
    completed: false,
    createdAt: now + 1,
  },
  {
    id: 'tpl-3',
    title: 'Document action flow in UI',
    description: 'Explain dispatch -> reducer -> selector -> view cycle.',
    priority: 'low',
    status: 'doing',
    assignee: 'Sam',
    tags: ['learning'],
    completed: false,
    createdAt: now + 2,
  },
];

export const loadDemoTasks = createAsyncThunk('board/loadDemoTasks', async () => {
  await delay(900);

  if (Math.random() < 0.2) {
    throw new Error('Server timeout while loading templates. Retry.');
  }

  return fetchedTemplates;
});

const initialState = {
  tasks: demoTasks,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    tag: 'all',
    assignee: 'all',
    sortBy: 'newest',
  },
  request: {
    status: 'idle',
    error: null,
  },
  lastDeleted: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        state.tasks.unshift(action.payload);
      },
      prepare(payload) {
        const safeTitle = payload.title.trim();
        const safeDescription = payload.description.trim();

        return {
          payload: {
            id: `task-${Date.now()}`,
            title: safeTitle,
            description: safeDescription,
            priority: payload.priority,
            status: 'todo',
            assignee: payload.assignee.trim() || 'Unassigned',
            tags: payload.tags,
            completed: false,
            createdAt: Date.now(),
          },
        };
      },
    },
    taskDeleted(state, action) {
      const removed = state.tasks.find((task) => task.id === action.payload);
      state.lastDeleted = removed || null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    lastDeletedRestored(state) {
      if (!state.lastDeleted) {
        return;
      }

      state.tasks.unshift(state.lastDeleted);
      state.lastDeleted = null;
    },
    taskToggled(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) {
        return;
      }

      task.completed = !task.completed;
      task.status = task.completed ? 'done' : task.status === 'done' ? 'todo' : task.status;
    },
    taskStatusAdvanced(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) {
        return;
      }

      const index = STATUS.indexOf(task.status);
      const nextStatus = STATUS[Math.min(index + 1, STATUS.length - 1)];
      task.status = nextStatus;
      task.completed = nextStatus === 'done';
    },
    taskStatusReverted(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) {
        return;
      }

      const index = STATUS.indexOf(task.status);
      const previousStatus = STATUS[Math.max(index - 1, 0)];
      task.status = previousStatus;
      task.completed = previousStatus === 'done';
    },
    allMarkedDone(state) {
      state.tasks.forEach((task) => {
        task.completed = true;
        task.status = 'done';
      });
    },
    completedCleared(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
    filtersUpdated(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    filtersReset(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDemoTasks.pending, (state) => {
        state.request.status = 'loading';
        state.request.error = null;
      })
      .addCase(loadDemoTasks.fulfilled, (state, action) => {
        state.request.status = 'succeeded';

        const existingIds = new Set(state.tasks.map((task) => task.id));
        const uniqueIncoming = action.payload.filter((task) => !existingIds.has(task.id));
        state.tasks = [...uniqueIncoming, ...state.tasks];
      })
      .addCase(loadDemoTasks.rejected, (state, action) => {
        state.request.status = 'failed';
        state.request.error = action.error.message || 'Unknown error';
      });
  },
});

export const {
  taskAdded,
  taskDeleted,
  lastDeletedRestored,
  taskToggled,
  taskStatusAdvanced,
  taskStatusReverted,
  allMarkedDone,
  completedCleared,
  filtersUpdated,
  filtersReset,
} = boardSlice.actions;

export const selectBoard = (state) => state.board;
export const selectTasks = (state) => state.board.tasks;
export const selectFilters = (state) => state.board.filters;
export const selectRequest = (state) => state.board.request;
export const selectLastDeleted = (state) => state.board.lastDeleted;

export const selectAvailableTags = createSelector([selectTasks], (tasks) => {
  const values = new Set();

  tasks.forEach((task) => {
    task.tags.forEach((tag) => values.add(tag));
  });

  return Array.from(values).sort();
});

export const selectAvailableAssignees = createSelector([selectTasks], (tasks) => {
  return Array.from(new Set(tasks.map((task) => task.assignee))).sort();
});

export const selectFilteredTasks = createSelector([selectTasks, selectFilters], (tasks, filters) => {
  const searched = tasks.filter((task) => {
    const pool = `${task.title} ${task.description} ${task.tags.join(' ')} ${task.assignee}`.toLowerCase();
    const textMatch = pool.includes(filters.search.toLowerCase());
    const statusMatch = filters.status === 'all' || task.status === filters.status;
    const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
    const tagMatch = filters.tag === 'all' || task.tags.includes(filters.tag);
    const assigneeMatch = filters.assignee === 'all' || task.assignee === filters.assignee;

    return textMatch && statusMatch && priorityMatch && tagMatch && assigneeMatch;
  });

  const sorted = [...searched].sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return b.createdAt - a.createdAt;
    }

    if (filters.sortBy === 'oldest') {
      return a.createdAt - b.createdAt;
    }

    if (filters.sortBy === 'priority') {
      const score = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return score[b.priority] - score[a.priority];
    }

    return a.title.localeCompare(b.title);
  });

  return sorted;
});

export const selectStats = createSelector([selectTasks], (tasks) => {
  const total = tasks.length;
  const done = tasks.filter((task) => task.completed).length;
  const inProgress = tasks.filter((task) => task.status === 'doing').length;
  const todo = tasks.filter((task) => task.status === 'todo').length;

  return {
    total,
    done,
    inProgress,
    todo,
    completionRate: total === 0 ? 0 : Math.round((done / total) * 100),
  };
});

export const selectGroupedTasks = createSelector([selectFilteredTasks], (tasks) => {
  return {
    todo: tasks.filter((task) => task.status === 'todo'),
    doing: tasks.filter((task) => task.status === 'doing'),
    done: tasks.filter((task) => task.status === 'done'),
  };
});

export default boardSlice.reducer;
