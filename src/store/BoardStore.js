import axios from 'axios'
import { STATUS } from '../const'
import _ from 'lodash'

const state = {
    page: 1,
    count: 6,
    room: null,
    rooms: [],
    announcements: [],
    total: 1,
    search: null,
    sort: { by: "price", order: -1 },
    filter: {},
};

const getters = {
    page (state) {
        return state.page
    },
    count (state) {
        return state.count
    },
    room (state) {
        return state.room
    },
    rooms (state) {
        return state.rooms
    },
    announcements (state) {
        return state.announcements
    },
    total (state) {
        return state.total
    },
    search (state) {
        return state.search
    },
    sort (state) {
        return state.sort
    },
    filter (state) {
        return state.filter
    }
};

const mutations = {
    page (state, { type, value }) {
        state[type] = value
    },

    count (state, { type, value }) {
        state[type] = value
    },

    room (state, { type, value }) {
        state[type] = value
    },

    rooms (state, { type, value }) {
        state[type] = value
    },

    announcements (state, { type, value }) {
        state[type] = value
    },

    total (state, { type, value }) {
        state[type] = value
    },

    search (state, { type, value }) {
        state[type] = value
    },

    sort (state, { type, value }) {
        state[type] = value
    },

    filter (state, { type, value }) {
        state[type] = value
    }
};

const actions = {
    async getRooms({commit, state}) {
        const { filter, search, page, count, sort  } = state;

        filter.status = STATUS.VERIFIED;

        try {
            const { data } = await axios.get('/api/room/list', {
                params: {
                    filter,
                    search,
                    page,
                    count,
                    sort,
                }
            });

            commit('total', { type: 'total', value: data && data.total ? data.total : 0 } );
            commit('rooms', { type: 'rooms', value: data && data.items ? data.items : [] });

        } catch (err) {
            throw err;
        }
    },

    async getAnnouncements({commit, state}, { filter, search, page, count, sort }) {
        try {
            const { data }= await axios.get('/api/room/list', {
                params: {
                    filter,
                    search,
                    page,
                    count,
                    sort,
                }
            });

            commit('announcements', { type: 'announcements', value: data && data.items ? data.items : [] } );

            return data && data.items ? data.items : [];
        } catch (err) {
            throw err;
        }
    },

    async getMyRooms({commit, state}, { filter, search, page, count, sort }) {
        try {
            const { data } = await axios.get(`/api/room/list/${state.user._id}`, {
                params: {
                    filter,
                    search,
                    page,
                    count,
                    sort,
                }
            });

            return data;
        } catch (err) {
            throw err;
        }
    },

    async getCountRoomsByUser({commit, state}, { id = null }) {
        const { user } = state;

        if (!id && user)
            id = user._id;

        try {
            const { data } = await axios.get(`/api/room/list/count/${id}`);
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
