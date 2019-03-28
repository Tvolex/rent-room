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
                timePeriod: "Month",
                groupBy: 'Day',
                timePeriods: ['Custom', 'Week', 'Month', 'Year'],
                listOfGroups: ['Day', 'Week', 'Month', 'Year'],
                customTimePeriod: { from: null, to: null },
                customTimePeriodMenu: null,
                options: {
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%e %b',
                            week: '%e %b',
                            month: '%b',
                            year: '%Y'
                        }
                    },
                    title: {
                        text: "Interests of your rooms"
                    },
                    series: [
                        {
                            data: [0],
                            pointInterval: 24 * 3600 * 1000, // one day
                            type: 'area',
                            name: 'Total views',
                            color: '#9dc8f1',
                            fillColor: {
                                linearGradient: [0, 300, 0, 0],
                                stops: [
                                    [0, 'white'],
                                    [1, '#9dc8f1']
                                ]
                            },
                        },
                        {
                            data: [0],
                            pointInterval: 24 * 3600 * 1000, // one day
                            type: 'line',
                            name: 'Unique views',
                            color: 'green',
                        }
                    ],
                }
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
                    const minDate = moment.min(res.data.map(days => moment(days.date)));

                    const TotalStat =  {
                        data: res.data.map(days => days.totalViews),
                        pointStart: minDate.valueOf(),
                    };

                    const UniqueStat = {
                        data: res.data.map(days => days.uniqueViews),
                        pointStart: minDate.valueOf(),
                    };
                    this.options.series[0] = Object.assign(this.options.series[0], TotalStat);
                    this.options.series[1] = Object.assign(this.options.series[1], UniqueStat);
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

                switch (group) {
                    case 'Year':
                        this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 100000);
                        break;
                    case 'Month':
                        this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 10000);
                        break;
                    case 'Week':
                        this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 5000);
                        break;
                    case 'Day':
                        this.options.series.forEach((el) => el.pointInterval = 24 * 3600 * 1000);
                        break;
                }
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
