import { createStore } from 'vuex';
import axios from 'axios';

let timer;
export default createStore({
  state: {
    token: null,
    user: null,
    timer: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    // eslint-disable-next-line no-shadow
    SET_TIMER(state, timer) {
      state.timer = timer;
    },
  },
  actions: {
    async auth({ commit, context }, { username, password }) {
      const params = new URLSearchParams();
      params.append('grant_type', password);
      params.append('username', username);
      params.append('password', password);
      const response = await axios
        .post('http://localhost:3000/oauth/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
          },
        })
        // eslint-disable-next-line arrow-parens
        .catch(error => {
          if (error.response) {
            console.log('Enter correct Username or Password');
          }
        });
      console.log(response.data.user);
      commit('SET_TOKEN', response.data.accessToken);
      commit('SET_USER', response.data.user.username);

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', response.data.user.username);
      localStorage.setItem('tokenExpiration', response.data.accessTokenExpiresAt);

      // const expiresIn = 3600000;
      const expiresIn = 2000;

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);
      commit('SET_TIMER', timer);
    },

    autoLogIn(context) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);
      // timer = setTimeout(() => {
      //   context.dispatch('logout');
      // }, expiresIn);

      if (token && user) {
        context.commit('SET_TOKEN', {
          token,
          user,
        });
      }
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
    isAuthenticated(state) {
      return !!state.token;
    },
    getTimer(state) {
      return state.timer;
    },
  },
});
