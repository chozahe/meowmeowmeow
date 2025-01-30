//понимаю, что в больших проектах лучше использовать распределенную архитектуру,
// но у меня два состояние только, поэтому все в одном файле

import { createStore } from 'vuex';

import api, { setAuthToken } from '@/api';

export default createStore({
    state: {
        token: null,

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },

    },
    actions: {
        saveToken({ commit }, token) {
            commit('SET_TOKEN', token);
            localStorage.setItem('token', token); // Сохраняем токен в localStorage
            setAuthToken(token); // Устанавливаем токен в заголовках Axios
        },
        loadToken({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                commit('SET_TOKEN', token);
                setAuthToken(token); // Устанавливаем токен в заголовках Axios
            }
        },
        logout({ commit }) {
            commit('SET_TOKEN', null);
            localStorage.removeItem('token');
            setAuthToken(null); // Очищаем заголовок Authorization
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});