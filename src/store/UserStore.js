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

    Register: async function({ dispatch, commit }, { name, surname, email, password, confirmPassword, contact, avatar }) {
        try {
            const { data } = await axios.post(`/api/user/register`, {
                name, surname, email, password, confirmPassword, contact, avatar
            });

            console.log(data);

            return dispatch({ type: 'Login' , email, password })
                .then((data) => data)
                .catch(err => err);
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

    Logout: async function({ commit }) {
        try {
            await axios.get(`/api/auth/logout`);
        } catch (err) {
            throw err;
        }

        commit('user', { type: 'user', value: null });
    },

};

export default {
    state,
    getters,
    mutations,
    actions,
}
