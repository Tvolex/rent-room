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

    publishRoom: async function({commit}, {
        RoomDescription,
        RoomTitle,
        RoomPhotos,
        RoomTerm,
        RoomType,
        RoomNumb,
        RoomPrice
    }) {
        try {
            const { data } = await axios.post(`/api/room`, {
                description: RoomDescription,
                title: RoomTitle,
                photos: RoomPhotos,
                term: RoomTerm,
                type: RoomType,
                rooms: RoomNumb,
                price: RoomPrice
            });

            return data;
        } catch (err) {
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
