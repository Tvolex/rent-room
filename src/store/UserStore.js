import axios from 'axios'

const state = {
    user: null,
};

const getters = {
    user (state) {
        return state.page
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

            commit('user', {type: 'user', value: data});
        } catch (err) {
            err.message = err.response && err.response.data && err.response.data.message ?
                err.response.data.message : "Something went wrong :(";
            throw err;
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}
