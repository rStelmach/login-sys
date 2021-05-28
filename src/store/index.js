import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async logIn({ commit }, { username, password }) {
      const params = new URLSearchParams();
      params.append('grant_type', password);
      params.append('username', username);
      params.append('password', password);
      const response = await axios.post('http://localhost:3000/oauth/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
        },
      });
      console.log(response.data.user);
      commit('SET_TOKEN', response.data.accessToken);
      commit('SET_USER', response.data.user.username);

      localStorage.setItem('token', response.data.accessToken);
    },
  },
  modules: {},
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
});
