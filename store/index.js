const cookieparser = process.server ? require('cookieparser') : undefined
import Vue from 'vue';
import axios from 'axios';


export const state = () => {
  return {
    user: {},
    accessToken: ''
  }
}

export const mutations = {
  setAuth(state, auth) {
    state.accessToken = auth.accessToken;
    state.user = auth.user;
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = {};
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth);
        dispatch('setAuth', auth);
      } catch (err) {

      }
    }
  }, setAuth({ commit, state }, auth) {
    this.$api.defaults.headers.common["Authorization"] = `Bearer ${auth.accessToken}`;
    commit('setAuth', auth)

  }
}

export const getters = {
  user: (state) => state.user,
  accessToken: (state) => state.accessToken
}
