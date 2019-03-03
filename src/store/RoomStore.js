import axios from 'axios'

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
    removeFile: async function({ commit }, { fileId }) {
        try {
            const { data } = await axios.delete(`/api/upload/${fileId}`);

            return data;
        } catch (err) {
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
