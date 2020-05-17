import axios from 'axios';
import courier from './stockeryClient';

const Dunzo = {
  loginUser: async userCredentials => {
    return axios({
      method: 'POST',
      url: 'https://todo-hackathon.herokuapp.com/auth/login',
      data: userCredentials,
    });
  },

  signUpUser: async userCredentials => {
    return axios({
      method: 'POST',
      url: 'https://todo-hackathon.herokuapp.com/api/v1/users',
      data: userCredentials,
    });
  },
};

export { Dunzo };
