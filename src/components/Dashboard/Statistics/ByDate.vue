<template>
    <v-flex xs12 class="px-2">
        <v-card class="my-3 pa-3 text-xs-center">
           <v-layout  row wrap  justify-center>
               <v-flex xs12 sm6 md2 class="text-xs-center">
                   <v-subheader class="text-xs-center">Time period</v-subheader>
               </v-flex>
               <v-flex xs12 sm6 md2>
                   <v-select v-model="timePeriod" :items="timePeriods" label="for"></v-select>
                   <v-menu
                           v-if="timePeriod === 'Custom'"
                           ref="menu"
                           :close-on-content-click="false"
                           v-model="customTimePeriodMenu"
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
                timePeriods: ['Custom', 'Week', 'Month'],
                customTimePeriod: { from: null, to: null },
                customTimePeriodMenu: null,
                options: {
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },

                    title: {
                        text: "Interests of your rooms"
                    },
                    series: [

                    ],
                }
            }
        },
        methods: {
            getRangeDates:  function(startDate, endDate) {
                var dates = [],
                    currentDate = startDate,
                    addDays = function(days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    };
                while (currentDate <= endDate) {
                    dates.push(moment(currentDate).format("YYYY-MM-DD"));
                    currentDate = addDays.call(currentDate, 1);
                }
                return dates;
            },
            getStatByDate: function () {
                const user = this.$store.getters.user;
                axios.get(`/api/statistics/by-date/${user._id}`, {
                    params: {
                        timePeriod: this.timePeriod,
                        customTimePeriod: this.customTimePeriod.from && this.customTimePeriod.to ?
                            this.customTimePeriod : null
                    }
                }).then(res => {
                    const TotalStat =  {
                        data: res.data.map(data => { return { y: data.totalViews } }),
                        // pointStart: res.data && res.data.length ? new Date(res.data[0]._id) : 0,
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
                    };

                    const UniqueStat =  {
                        data:  res.data.map(data => { return { y: data.uniqueViews } }),
                        type: 'line',
                        name: 'Unique views',
                        color: 'green',
                    };

                    this.options.xAxis.categories = this.getRangeDates(new Date(res.data[0]._id), new Date(res.data[res.data.length -1 ]._id));
                    this.options.series[0] = TotalStat;
                    this.options.series[1] = UniqueStat;
                });
            }
        },
        watch: {
            timePeriod: function (period, oldPeriod) {
                if (period !== 'Custom')
                    this.getStatByDate();
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

</style>
