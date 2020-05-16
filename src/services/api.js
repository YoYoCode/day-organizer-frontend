import axios from 'axios';
import courier from './stockeryClient';

const Dunzo = {
  loginUser: async userCredentials => {
    return axios({
      method: 'POST',
      url: 'http://localhost:8080/auth/login',
      data: userCredentials,
    });
  },

  signUpUser: async userCredentials => {
    return axios({
      method: 'POST',
      url: 'http://localhost:8080/auth/signup',
      data: userCredentials,
    });
  },
};

export { Dunzo };
