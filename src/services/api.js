import axios from 'axios';
import courier from './stockeryClient';

const Dunzo = {
  loginUser: async (userCredentials) => {
    return axios({
      method: 'POST',
      url: 'http://localhost:8005/auth/login',
      data: userCredentials,
    });
  },

  signUpUser: async (userCredentials) => {
    return axios({
      method: 'POST',
      url: 'http://localhost:8005/api/v1/users',
      data: userCredentials,
    });
  },

  notificationSubscriber: async (subscription) => {
    return axios({
      method: 'POST',
      url: 'http://localhost:8005/api/v1/subscribe',
      data: subscription,
    });
  },

  createLabel: async (labelInfo) => {
    return courier({
      method: 'POST',
      url: 'http://localhost:8005/api/v1/labels',
      data: labelInfo,
    });
  },

  editTodo: async (todoInfo, todoId) => {
    return courier({
      method: 'PATCH',
      url: `http://localhost:8005/api/v1/tasks/${todoId}`,
      data: todoInfo,
    });
  },

  createTodo: async (todoInfo) => {
    return courier({
      method: 'POST',
      url: `http://localhost:8005/api/v1/tasks`,
      data: todoInfo,
    });
  },

  getTasksByLabel: async (labelInfo) => {
    return courier({
      method: 'GET',
      url: `http://localhost:8005/api/v1/tasks`,
      params: labelInfo,
    });
  },
  getTasksByPriority: async (priorityInfo) => {
    return courier({
      method: 'GET',
      url: `http://localhost:8005/api/v1/tasks`,
      params: priorityInfo,
    });
  },
  getTasksByStatus: async (statusInfo) => {
    return courier({
      method: 'GET',
      url: `http://localhost:8005/api/v1/tasks`,
      params: statusInfo,
    });
  },

  getAllTasksStatusActive: async () => {
    return courier({
      method: 'GET',
      url: `http://localhost:8005/api/v1/tasks`,
    });
  },
};

export { Dunzo };
