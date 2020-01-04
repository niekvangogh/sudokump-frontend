import Vue from 'vue';
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('access_token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}