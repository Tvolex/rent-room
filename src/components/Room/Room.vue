<template>
    <div class="content_inner">
        <v-layout row wrap justify-center class="ma-3 ">
            <v-flex xs10 md8>
                <div class="text-xs-justify button-back" @click="$router.back()">
                    <v-icon>arrow_back</v-icon>
                    <span style="font-size: larger">Back</span>
                </div>
            </v-flex>
            <v-flex xs12 md8 class="room_card">
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
                                    <div class="pa-3 rejected-block" v-if="isOwner && room.status === 'Rejected'">
                                        <span class="subheading">This ad has been rejected by admin</span> <br>
                                        <span class="subheading"> <b>The reason:</b> {{room.rejectionReason}}</span>
                                    </div>
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
                                <v-flex xs10 py-2 class="grey--text" >
                                    Address:
                                    <span class="grey--text text--darken-2">
                                        {{room.location && room.location.address ? room.location.address : 'no address'}}
                                    </span>
                                </v-flex>

                                <v-flex xs10 my-1>
                                    <v-divider></v-divider>
                                </v-flex>

                                <v-flex xs10 py-2>
                                    <span>{{room.description}}</span>
                                </v-flex>

                                <v-flex xs10 my-1>
                                    <v-divider></v-divider>
                                </v-flex>

                                <v-flex xs10 md4 my-3 class="text-xs-center">
                                    <v-avatar
                                            :size="100"
                                            color="grey lighten-4"
                                            v-if="room.createdBy && room.createdBy.avatar && room.createdBy.avatar.location && room.createdBy.avatar.location.thumb"
                                    >
                                        <img :src="room.createdBy.avatar.location.thumb" alt="avatar">
                                    </v-avatar>
                                    <v-avatar
                                            :size="100"
                                            color="grey lighten-4"
                                            v-else
                                    >
                                        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png" alt="avatar">
                                    </v-avatar>

                                    <div class="px-2 py-1">
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

                                <GmapMap
                                        :center="center"
                                        :zoom="zoom"
                                        map-type-id="terrain"
                                        style="width: 800px; height: 600px"
                                >
                                    <GmapMarker
                                            :position="room && room.location ? room.location.point : defaultLocation.point"
                                            :title="room && room.location ? room.location.address : defaultLocation.address"
                                            :clickable="true"
                                            draggable
                                            @click="() => {this.center= room && room.location ? room.location.point : defaultLocation.point; this.zoom=16}"
                                    />
                                </GmapMap>

                                <v-flex xs10 my-1>
                                    <v-divider></v-divider>
                                </v-flex>

                                <v-flex xs10 pa-3 class="grey--text">
                                    <h4>Total  <v-icon >visibility</v-icon> {{room.totalViews || 0}}</h4>
                                    <h4>Unique  <v-icon >visibility</v-icon> {{room.uniqueViews || 0}}</h4>

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
            <v-flex xs12 md8 >
                <div>
                    <v-card v-if="showStat" class="my-3 pa-3 text-xs-center" id="daily_statistics">
                        <div style="height: 70px">
                            <div class="headline" style="float: left">Daily views statistics</div>
                            <div style="float: right">
                                <v-btn flat @click="showDailyStatistics({ timePeriod: 'Year', groupBy: 'Month' })">Year</v-btn>
                                <v-btn flat @click="showDailyStatistics({ timePeriod: 'Month', groupBy: 'Day' })">Month</v-btn>
                                <v-btn flat @click="showDailyStatistics({ timePeriod: 'Week', groupBy: 'Day' })">Week</v-btn>
                            </div>
                        </div>
                        <line-chart :chartData="chartData" :chartOptions="chartOptions" :key="chartKey"></line-chart>
                    </v-card>
                </div>
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
    import { Line } from '../Charts'
    export default {
        name: 'InfoRoom',
        components: {
            VueContentLoading,
            'line-chart': Line,
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
                groupBy: 'Day',
                center: {lat: 48.621690, lng: 22.298125},
                zoom: 13,
                defaultLocation: {
                    point: {
                        lat: 48.636423, lng: 22.276994
                    },
                    address: 'Україна, Ужгород, Провулок Грибоєдова 2'
                },
                scrollOpts: {
                    container: 'body',
                    easing: 'ease-in',
                    offsetTop: -60,
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
                chartKey: 1,
                chartData: null,
                chartOptions: null,
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
            showDailyStatistics ({timePeriod, groupBy}) {
                this.showStat = true;

                // switch (groupBy) {
                //     default:
                //         timePeriod = 'Month';
                //         groupBy = 'Day';
                //         break;
                // }

                axios.get(`/api/statistics/room/${this.room._id}`, {
                    params: {
                        groupBy,
                        timePeriod,
                    }
                }).then(res => {
                    let totalViews = [], uniqueViews = [], labels = [];

                    res.data.forEach(data => {
                        totalViews.push(data.totalViews);

                        labels.push(
                            moment(data.label, 'YYYY-MM-DD').isValid() ?
                                moment(data.label).format('YYYY-MM-DD') : data.label
                        );

                        uniqueViews.push(data.uniqueViews);
                    });

                    const TotalStat =  {
                        label: 'Total views',
                        backgroundColor: 'rgba(150, 0, 150, 0.3)',
                        pointBackgroundColor: 'red',
                        borderWidth: 1,
                        pointBorderColor: 'grey',
                        data: totalViews,
                    };

                    const UniqueStat = {
                        label: 'Unique views',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        pointBackgroundColor: 'blue',
                        borderWidth: 1,
                        pointBorderColor: 'grey',
                        data: uniqueViews,
                    };


                    this.chartData = {
                        labels,
                        datasets: [TotalStat, UniqueStat]
                    }
                })
                    .catch(err => console.log(err))
                    .finally(() => {
                        this.chartKey++ ;
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
                    this.$nextTick(() => {
                        VueScrollTo.scrollTo('#daily_statistics', 500, this.scrollOpts);
                    });
                    return this.showDailyStatistics({ groupBy: 'Day', timePeriod: 'Month' });
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

    .rejected-block {
        background-color: #ff000096;
    }
</style>
