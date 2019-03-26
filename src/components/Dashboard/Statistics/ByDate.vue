<template>
    <v-flex xs12 class="px-2">
        <v-card class="my-3 pa-3 text-xs-center">
           <v-layout  row wrap  justify-center>
               <v-flex xs12 sm6 md2 class="text-xs-center">
                   <v-subheader class="text-xs-center">Time period</v-subheader>
               </v-flex>
               <v-flex xs12 sm6 md2>
                   <v-select v-model="timePeriod" :items="['Today', 'Week', 'Month']" label="for"></v-select>
               </v-flex>
               <v-flex xs12>
                   <charts class="chart" :options="options"></charts>
               </v-flex>
           </v-layout>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: "ByDate",
        beforeMount() {
            this.getStatByDate();
        },
        data: () => {
            return {
                timePeriod: null,
                options: {
                    title: {
                        text: "Statistics By Date"
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
        methods: {
            getStatByDate: function () {
                const user = this.$store.getters.user;
                axios.get(`/api/statistics/by-date/${user._id}`, {
                    params: {
                        timePeriod: this.timePeriod
                    }
                }).then(res => {
                    this.options.series[0].data = res.data.map(views => {
                        return {
                            name: moment(views._id).format('LLLL'),
                            y: views.total
                        }
                    })
                });
            }
        },
        watch: {
            timePeriod: function (period, oldPeriod) {
                this.getStatByDate();
            }
        }
    }
</script>

<style scoped>

</style>
