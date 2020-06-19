import axios from 'axios';

const client = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:8005/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const courier = axios.create(defaultOptions);

  courier.interceptors.request.use((config) => {
    // TODO: Look into this later
    /* const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''; */
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  });

  return courier;
};

export default client();
