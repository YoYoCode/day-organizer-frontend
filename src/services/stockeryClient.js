import axios from 'axios';

const client = () => {
  const defaultOptions = {
    baseURL: 'https://todo-hackathon.herokuapp.com/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const courier = axios.create(defaultOptions);

  courier.interceptors.request.use(config => {
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
