<template>
    <v-layout row wrap justify-center class="Statistics">
        <v-flex xs12>
            <v-card style="background: rgba(255,255,255,0.4)" class="my-3 pa-3 text-xs-center">
                <v-card-title >
                    <h3><b>Test</b></h3>
                </v-card-title>
                <highcharts class="chart" :options="AreaChartOptions"></highcharts>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import Highcharts from 'highcharts';
    export default {
        name: "Statistics",
        mounted: () => {

        },
        data: () => {
            return {
                statistics: {
                    data: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]]
                },
                AreaChartOptions:  {
                    series: [
                        {
                            data: new Array(20).fill(1).map(el => el + Math.random() * 50),
                            type: 'area',
                            color: 'black',
                            fillColor: {
                                linearGradient: [0, 0, 600, 0],
                                stops: [
                                    [0, 'black'],
                                    [1, 'grey']
                                ]
                            },

                        },
                    ],
                },
            }
        },

        methods: {
            getStat() {
                console.log(this);
            }
        }
    }
</script>

<style scoped>

</style>
