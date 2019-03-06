<template>
    <v-layout row wrap justify-center class="Statistics">
        <MostViewed></MostViewed>
        <v-flex xs6 class="px-2">
            <v-card class="my-3 pa-3 text-xs-center">
                <v-card-title >
                    <h3><b>Test</b></h3>
                </v-card-title>
                <highcharts class="chart" :options="AreaChartOptions"></highcharts>
            </v-card>
        </v-flex>

    </v-layout>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import Highcharts from 'highcharts';

    import MostViewed from './MostViewed';

    export default {
        name: "Statistics",
        beforeMount() {
            this.getMostViewed();
        },
        components: {
            MostViewed
        },
        data: () => {
            return {
                mostViewed: [],
                statistics: {
                    data: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]],
                },
                AreaChartOptions:  {
                    series: [
                        {
                            data: new Array(5).fill(1).map(el => el + Math.floor(Math.random() * 15) + 40),
                            type: 'area',
                            name: 'test',
                            color: 'orange',
                            fillColor: {
                                linearGradient: [0, 0, 600, 0],
                                stops: [
                                    [0, 'red'],
                                    [1, 'orange']
                                ]
                            },

                        },
                    ],
                },
            }
        },
        computed: {
            user : function () {
                return this.$store.getters.user;
            }
        },
        methods: {
            getStat() {
                console.log(this);
            },
            getMostViewed: function () {
                const user = this.$store.getters.user;
                axios.get(`/api/statistics/most-viewed/${user._id}`).then(res => {
                    this.mostViewed = res.data;
                })
            },
            openRoom: function (room) {
                this.$store.commit('room', { type: 'room', value: room });
                this.$router.push(`/room/${room._id}`)
            },
        },
        filters: {

        }
    }
</script>

<style scoped>
    .info-about-room {
        width: 100%;
        background-color: rgba(0,0,0, 0.2);
    }

    .views-room {
        margin-top: 60px;
    }

    .title-room {
        margin-top: 120px;
    }
</style>
