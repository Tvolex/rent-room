<template>
    <v-flex xs12 class="px-2">
        <v-card class="my-3 pa-3 text-xs-center">
           <v-layout  row wrap  justify-center>
               <v-flex xs12 sm2>
                   <v-select v-model="timePeriod" :items="timePeriods" label="Time period"></v-select>
               </v-flex>
               <v-flex xs1></v-flex>
               <v-flex xs12 sm2>
                   <v-select v-model="groupBy" :items="listOfGroups" label="Group by"></v-select>
               </v-flex>


               <v-flex xs12 sm8 v-if="timePeriod === 'Custom'" class="px-0">
                   <v-menu
                           ref="menu"
                           :close-on-content-click="false"
                           v-model="customTimePeriodMenu"
                           class="menu_time_period text-xs-center"
                           :nudge-right="40"
                           lazy
                           transition="scale-transition"
                           offset-y
                           full-width
                           min-width="290px"
                   >
                       <v-text-field
                               slot="activator"
                               v-model="customTimePeriod.from"
                               class="mr-3"
                               height="20px"
                               label="Date from"
                               readonly
                       ></v-text-field>
                       <v-date-picker
                               v-model="customTimePeriod.from"
                               :max="new Date().toISOString().substr(0, 10)"
                               min="1900-01-01"
                       ></v-date-picker>
                       <v-text-field
                               slot="activator"
                               v-model="customTimePeriod.to"
                               height="20px"
                               label="Date to"
                               readonly
                       ></v-text-field>
                       <v-date-picker
                               v-model="customTimePeriod.to"
                               :max="new Date().toISOString().substr(0, 10)"
                               min="1900-01-01"
                       ></v-date-picker>
                   </v-menu>
               </v-flex>

               <v-flex xs12>
                   <line-chart :key="chartKey" :chartData="chartData" :chartOptions="chartOptions"></line-chart>
               </v-flex>
           </v-layout>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    import { Line } from '../../Charts'

    export default {
        name: "ByDate",
        components: {
            'line-chart': Line,
        },
        beforeMount() {
            this.getStatByDate();

        },
        data: () => {
            return {
                timePeriod: "Year",
                groupBy: 'Month',
                timePeriods: ['Custom', 'Week', 'Month', 'Year'],
                listOfGroups: ['Day', 'Week', 'Month', 'Year'],
                customTimePeriod: { from: null, to: null },
                customTimePeriodMenu: null,
                chartKey: 1,
                chartData: null,
                chartOptions: null,
            }
        },
        methods: {
            getStatByDate: function () {
                const user = this.$store.getters.user;

                axios.get(`/api/statistics/by-date/${user._id}`, {
                    params: {
                        groupBy: this.groupBy,
                        timePeriod: this.timePeriod,
                        customTimePeriod: this.customTimePeriod.from && this.customTimePeriod.to ?
                            this.customTimePeriod : null
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
                        pointBackgroundColor: 'rgba(150, 0, 150, 0.3)',
                        borderWidth: 1,
                        pointBorderColor: 'grey',
                        data: totalViews,
                    };

                    const UniqueStat = {
                        label: 'Unique views',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderWidth: 1,
                        pointBorderColor: 'grey',
                        data: uniqueViews,
                    };


                    this.chartData = {
                        labels,
                        datasets: [TotalStat, UniqueStat]
                    }
                })
                    .catch(err => console.error(err))
                    .finally(() => {
                        this.chartKey++;
                    });
            }
        },
        watch: {
            timePeriod: function (period, oldPeriod) {
                if (period !== 'Custom') {
                    this.getStatByDate();
                }
            },
            groupBy: function (group) {
                this.getStatByDate();

                // switch (group) {
                //     case 'Year':
                //         this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 1000 * 30 * 12);
                //         break;
                //     case 'Month':
                //         this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 1000 * 30);
                //         break;
                //     case 'Week':
                //         this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 1000 * 7);
                //         break;
                //     case 'Day':
                //         this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 1000);
                //         break;
                // }
            },
            customTimePeriod: {
                handler: function ({from, to}) {
                    if (!!from && !!to)
                        this.getStatByDate();
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .menu_time_period {
        max-width: 600px;
    }
</style>
