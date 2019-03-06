<template>
    <v-layout row wrap justify-center class="Statistics">
        <v-flex xs12 class="px-2">
            <v-card class="my-3 pa-3 text-xs-center">
                <v-card-title >
                    <h3><b>Test</b></h3>
                </v-card-title>
                <charts class="chart" :options="AreaChartOptions"></charts>
            </v-card>
        </v-flex>
        <MostViewed></MostViewed>
        <ByStatus></ByStatus>

    </v-layout>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import ByStatus from './ByStatus'
    import MostViewed from './MostViewed';

    export default {
        name: "Statistics",
        beforeMount() {

        },
        components: {
            MostViewed,
            ByStatus,
        },
        data: () => {
            return {
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

        },
        filters: {

        }
    }
</script>

<style scoped>
</style>
