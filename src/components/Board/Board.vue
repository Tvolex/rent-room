<template>
    <v-layout class="Board" row wrap>
        <v-flex xs12>
            <div class="content_wrapper">
                <div class="content">
                    <Filters></Filters>
                    <div class="content_inner">
                        <v-layout row wrap>
                            <v-flex xs12 sm2>
                                <Navbar typeChanged="typeChanged" numberOfRoomsChanged="numberOfRoomsChanged" ></Navbar>
                            </v-flex>
                            <v-flex xs12 sm10 name="rooms" ref="rooms">
                                <div v-if="loading">
                                    <Shadows></Shadows>
                                </div>
                                <Rooms v-if="!loading && rooms && rooms.length" :rooms="rooms"></Rooms>
                                <v-layout v-else row wrap>
                                    <v-flex xs12 v-if="rooms && !rooms.length && !loading">
                                        <v-hover>
                                            <v-card class="card-empty" slot-scope="{ hover }" >
                                                <v-card-title primary-title>
                                                    <div>
                                                        <div class="headline">No items</div>
                                                        <span class="grey--text">Empty</span>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat @click="refresh">Refresh</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <Pagination @pageChanged="getRooms"></Pagination>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios'

    import Rooms from './Rooms'
    import Navbar from './Navbar'
    import Pagination from './Pagination'
    import Shadows from './ShadowCard'
    import Filters from './Filters'


    export default {
        name: 'Board',
        components: {
            Rooms,
            Navbar,
            Shadows,
            Pagination,
            Filters
        },
        async beforeMount () {
            this.getRooms();
        },
        data () {
            return {
                loading: false,
            }
        },
        methods: {
            refresh: function () {
                this.$store.commit('page', { type: 'page', value: 1 });
                this.getRooms();
            },
            getRooms: function () {
                this.loading = true;
                this.$store.dispatch({type: 'getRooms'}).then()
                    .catch(this.errorHandler)
                    .finally(() => {
                    this.loading = false;
                })
            },

            typeChanged: function (type) {

            }
        },

        computed: {
            rooms: function () {
                return this.$store.getters.rooms;
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .card-empty {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }
</style>
