import { createSlice } from '@reduxjs/toolkit';

export const todoistDashboardSlice = createSlice({
  name: 'todoistDashboard',
  initialState: {
    "overdue": [],
    "today": [],
    "tomorrow": [],
    "overmorrow": [],
    "labels": []
  },
  reducers: {
    dashboardTodoistUpdate: (state, action) => {
      state.overdue = action.payload.overdue;
      state.today = action.payload.today;
      state.tomorrow = action.payload.tomorrow;
      state.overmorrow = action.payload.overmorrow;
      state.labels = action.payload.labels;
    },
  },
});

export const { dashboardTodoistUpdate } = todoistDashboardSlice.actions;

export const defaultDashboardTodoistState = state => state.todoistDashboard;

export default todoistDashboardSlice.reducer;
