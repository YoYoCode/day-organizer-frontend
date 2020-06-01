import { configureStore } from '@reduxjs/toolkit';
import todoistDashboardReducer from '../components/Todoist/todoist-dashboard-slice';
import todoistDashboardReducer1 from '../components/Todoist/todoist-dashboard-slice';

export default configureStore({
  reducer: {
    todoistDashboard: todoistDashboardReducer,
    todoistDashboard1: todoistDashboardReducer1,
  },
});
