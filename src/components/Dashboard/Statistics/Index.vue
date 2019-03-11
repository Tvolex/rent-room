<template>
    <v-layout row wrap justify-center class="Statistics">
        <ByDate></ByDate>
        <MostViewed></MostViewed>
        <ByStatus></ByStatus>
    </v-layout>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import ByStatus from './ByStatus'
    import ByDate from './ByDate';
    import MostViewed from './MostViewed';

    export default {
        name: "Statistics",
        beforeMount() {

        },
        components: {
            MostViewed,
            ByStatus,
            ByDate
        },
        data: () => {
            return {
                statByDate: [],
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
