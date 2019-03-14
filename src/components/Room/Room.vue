<template>
    <div class="content_inner">
        <v-layout row wrap justify-center>
            <v-flex xs10 md8>
                <div class="text-xs-justify button-back" @click="$router.back()">
                    <v-icon>arrow_back</v-icon>
                    <span style="font-size: larger">Back</span>
                </div>
            </v-flex>
            <v-flex xs12 md8 class="ma-3 room_card">
                <div v-if="loading">
                    <v-card>
                        <vue-content-loading :width="350" :height="350">
                            <rect x="0" y="0" rx="10" ry="10" width="350" height="200" />
                            <rect x="10" y="210" rx="5" ry="5" width="100" height="8" />
                            <rect x="10" y="225" rx="5" ry="5" width="225" height="15" />

                            <rect x="10" y="250" rx="5" ry="5" width="150" height="8" />
                            <rect x="10" y="265" rx="5" ry="5" width="170" height="8" />
                            <rect x="10" y="280" rx="5" ry="5" width="160" height="8" />

                            <rect x="10" y="310" rx="5" ry="5" width="40" height="10" />
                            <rect x="70" y="310" rx="5" ry="5" width="60" height="10" />
                        </vue-content-loading>
                    </v-card>
                </div>
                <div v-else-if="room">
                    <v-card>
                        <v-carousel>
                            <v-carousel-item
                                    v-if="item && item.location && item.location.original"
                                    v-for="(item, i) in room.photos" :key="i"
                                    :src="item.location.original"
                            ></v-carousel-item>
                            <img
                                    v-else
                                    src="@/assets/no-photo.png"
                                    alt="Photo"
                            />
                        </v-carousel>
                        <v-card-title class="pa-2">
                            <v-layout row wrap justify-center>
                                <v-flex xs12 md10 pr-5>
                                    <span class="grey--text">{{room.createdAt | parseDate}}</span>
                                    <div
                                         v-if="isOwner"
                                         class="show_daily_stat"
                                         @click="showStat = !showStat"
                                    >
                                        <span v-if="!showStat">Show daily statistics</span>
                                        <span v-else>Close daily statistics</span>
                                    </div>
                                    <br>
                                    <div style="float: left">

                                        <span class="headline">{{room.title}}</span><br>
                                    </div>
                                    <div style="float: right">
                                        <span class="headline">₴{{room.price || 'No price'}}</span>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text class="pa-2">
                            <v-layout row wrap justify-center>
                                <v-flex xs10 class="pt-0 pr-5 pb-2">
                                    <div class="grey--text" style="float: left">
                                        Price: <span class="grey--text text--darken-2">₴{{room.price}}</span>
                                        <v-spacer></v-spacer>
                                        Rooms: <span class="grey--text text--darken-2">{{room.rooms}}</span>
                                    </div>

                                    <div class="grey--text" style="float: right">
                                        Type: <span class="grey--text text--darken-2">{{room.type}}</span>
                                        <v-spacer></v-spacer>
                                        Term: <span class="grey--text text--darken-2">{{room.term}}</span>
                                    </div>
                                </v-flex>
                                <v-flex xs10 py-2>
                                    <span>{{room.description}}</span>
                                </v-flex>

                                <v-flex xs10 my-1>
                                    <v-divider></v-divider>
                                </v-flex>

                                <v-flex xs10 my-3>
                                      <span class="grey--text">
                                        <h3>Contacts:</h3>
                                    </span>

                                    <div>
                                        <v-avatar
                                                :size="100"
                                                color="grey lighten-4"
                                                v-if="room.createdBy && room.createdBy.avatar && room.createdBy.avatar.thumb"
                                        >
                                            <img :src="room.createdBy.avatar.thumb" alt="avatar">
                                        </v-avatar>
                                        <v-avatar
                                                :size="100"
                                                color="grey lighten-4"
                                                v-else
                                        >
                                            <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png" alt="avatar">
                                        </v-avatar>
                                    </div>

                                    <div class="px-2 py-1">
                                        <span class="grey--text">
                                            Name:
                                        </span>
                                        <span class="grey--text text--darken-2">
                                            {{room.createdBy.name}}
                                        </span>
                                    </div>
                                    <div class="px-2 py-1">
                                        <span class="grey--text">
                                            E-mail:
                                        </span>
                                        <span class="grey--text text--darken-2">
                                           {{room.createdBy.email}}
                                        </span>
                                    </div>
                                    <div class="px-2 py-1">
                                        <span class="grey--text">
                                            Phone:
                                        </span>
                                        <span class="grey--text text--darken-2">
                                            {{room.createdBy.contact}}
                                        </span>
                                    </div>
                                </v-flex>

                                <v-flex xs10 my-1>
                                    <v-divider></v-divider>
                                </v-flex>

                                <v-flex xs10 pa-3>
                                    <span>
                                        <v-icon >visibility</v-icon> {{room.views || 0}}
                                    </span>
                                </v-flex>

                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat color="orange">Share</v-btn>
                            <v-btn flat color="orange">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
                <div v-else>not found</div>
            </v-flex>
            <v-flex v-if="showStat" xs12 md10 lg8 class="px-2">
                <v-card class="my-3 pa-3 text-xs-center" id="daily_statistics">
                    <charts class="chart" :options="options"></charts>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import _ from 'lodash';
    import VueContentLoading from 'vue-content-loading'
    import VueScrollTo from 'vue-scrollto';

    export default {
        name: 'InfoRoom',
        components: {
            VueContentLoading,
        },
        mounted () {
            const roomId = this.$route.params ? this.$route.params.id : null

            if (roomId) {
                this.getRoomById(roomId).then(room => {
                    this.room = room
                }).catch(err => { console.log(err) })
            }
        },
        data: () => {
            return {
                room: null,
                currentImageSize: 500,
                loading: false,
                showStat: false,
                scrollOpts: {
                    container: '#container',
                    easing: 'ease-in',
                    offset: -60,
                    force: true,
                    cancelable: true,
                    onStart: function(element) {
                        // scrolling started
                    },
                    onDone: function(element) {
                        // scrolling is done
                    },
                    onCancel: function() {
                        // scrolling has been interrupted
                    },
                    x: false,
                    y: true
                },
                options: {
                    title: {
                        text: "Daily views statistics"
                    },
                    series: [
                        {
                            data: [],
                            type: 'area',
                            name: 'Statistics By Date',
                            color: '#9dc8f1',
                            fillColor: {
                                linearGradient: [0, 300, 0, 0],
                                stops: [
                                    [0, 'white'],
                                    [1, '#9dc8f1']
                                ]
                            },
                        },
                    ],
                }
            }
        },
        computed: {
            isOwner: function () {
                const user = this.$store.getters.user || {};

                if (!user) {
                    return false
                }

                if (_.isEmpty(this.room)) {
                    return false
                }

                return _.isEqual(user._id, this.room.createdBy._id)
            }
        },
        methods: {
            async getRoomById (id) {
                this.loading = true;
                try {
                    const res = await axios.get(`/api/room/${id}`);
                    return res.data
                } catch (err) {
                    this.errorHandler(err);
                } finally {
                    this.loading = false;
                }
            },
            showDailyStatistics () {
                this.showStat = true;
                axios.get(`/api/statistics/room/${this.room._id}`).then(res => {
                    this.options.series[0].data = res.data.map(views => {
                        return {
                            name: moment(views._id).format('LLLL'),
                            y: views.total
                        }
                    })
                }).catch(err => console.log(err))
                    .finally(() => {
                    });
            },
        },
        filters: {
            parseDate: function (value) {
                console.log(moment().locale());
                const date = new moment(value);
                date.locale('uk');
                return date.format('LLLL');
            },
        },
        watch: {
            showStat: function (val, oldVal) {
                if (val) {
                    var cancelScroll = VueScrollTo.scrollTo('#daily_statistics', 500, this.scrollOpts);
                    return this.showDailyStatistics();
                }
                this.showStat = false;
            }
        }
    }
</script>

<style scoped>
    .views-number {
        margin-bottom: 2px;
    }

    .room_card {
        max-width: 1600px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .photos_card {
        max-height: 470px;
        min-height: 200px;
    }

    .button-back {
        width: 25%;
        cursor: pointer;
        color: #9e9e9e !important;
    }

    .button-back:hover {
        color: #2d2e33 !important;
    }

    .show_daily_stat {
        color: #9e9e9e !important;
        cursor: pointer;
        float: right
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
