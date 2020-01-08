const cookieparser = process.server ? require('cookieparser') : undefined

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
  nuxtServerInit({ commit }, { req }) {
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      console.log(parsed);
      try {
        auth = JSON.parse(parsed.auth);
      } catch (err) {

      }
    }
    commit('setAuth', auth)
  }
}

export const getters = {
  user: (state) => state.user
}
