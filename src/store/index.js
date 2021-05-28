import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
  },
  mutations: {},
  actions: {
    async logIn() {
      const params = new URLSearchParams();

      params.append('grant_type', 'password');
      params.append('username', 'pedroetb');
      params.append('password', 'password');

      const response = await axios.post(
        'http://localhost:3000/oauth/token',

        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
          },
        },
      );
      console.log(response);
    },
  },
  modules: {},
  getters: {},
});
