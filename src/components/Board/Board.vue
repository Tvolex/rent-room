<template>
    <v-layout class="Board" row wrap>
        <v-flex xs12>
            <div class="content_wrapper">
                <div class="content">
                    <Filters></Filters>

                    <div class="content_inner">
                        <v-layout row wrap>
                            <v-flex xs12 sm2>
                                <Navbar></Navbar>
                            </v-flex>
                            <v-flex xs12 sm10 name="rooms" ref="rooms">
                                <v-layout row wrap v-if="loading">
                                    <v-flex xs12 sm6 md4
                                            v-for="shadow in 6"
                                            :key="shadow">
                                        <v-hover>
                                            <v-card class="card-shadow" slot-scope="{ hover }" >
                                                <vue-content-loading :width="350" :height="350">
                                                    <rect x="0" y="0" rx="10" ry="10" width="350" height="200" />
                                                    <rect x="10" y="220" rx="10" ry="10" width="250" height="20" />
                                                    <rect x="10" y="250" rx="10" ry="10" width="150" height="15" />

                                                    <rect x="10" y="300" rx="10" ry="10" width="80" height="35" />
                                                    <rect x="150" y="300" rx="10" ry="10" width="130" height="35" />
                                                </vue-content-loading>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                                <Rooms  v-if="items && items.length" :rooms="items" :total="total"></Rooms>
                                <v-layout v-else row wrap>
                                    <v-flex xs12 v-if="items && !items.length && !loading">
                                        <v-hover>
                                            <v-card class="card-empty" slot-scope="{ hover }" >
                                                <v-card-title primary-title>
                                                    <div>
                                                        <div class="headline">No items</div>
                                                        <span class="grey--text">Empty</span>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat @click="getRooms">Refresh</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <Pagination :rooms="items"></Pagination>
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
    import Filters from './Filters'
    import VueContentLoading from 'vue-content-loading'

    export default {
        name: 'Board',
        components: {
            VueContentLoading,
            Rooms,
            Navbar,
            Pagination,
            Filters
        },
        async beforeMount () {
            this.getRooms();
        },
        data () {
            return {
                loading: false,
                total: 1,
                items: []
            }
        },
        methods: {
            getRooms: function () {
                this.loading = true;
                this.$store.dispatch({type: 'getRooms'}).then((result) => {
                    this.total = result && result.total ? result.total : 1;
                    this.items = result && !_.isEmpty(result.rooms) ? result.rooms.map(el => {
                        el.expandDescription = false;
                        return el
                    }) : [];
                }).catch((err) => {
                    console.log(err);
                    this.$notificator(err.type, err.message)
                }).finally(() => {
                    this.loading = false;
                })
            },
        },
        computed: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .card-shadow {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }

    .card-empty {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }
</style>
