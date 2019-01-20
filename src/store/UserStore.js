import axios from 'axios'

const state = {
    user: null,
};

const getters = {
    user (state) {
        return state.user
    },
};

const mutations = {
    user (state, { type, value }) {
        state[type] = value
    },
};

const actions = {
    Login: async function({ commit }, { email, password }) {
        try {
            const { data } = await axios.post(`/api/auth/login`, {
                email,
                password,
            });

            commit('user', { type: 'user', value: data });

            return data;
        } catch (err) {
            err.message = err.response && err.response.data && err.response.data.message ?
                err.response.data.message : "Something went wrong :(";
            throw err;
        }
    },

    Auth: async function({ commit }) {
        try {
            const { data } = await axios.get(`/api/auth/check`);

            commit('user', { type: 'user', value: data });

            return data;
        } catch (err) {
            commit('user', { type: 'user', value: null });
            throw err;
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}
