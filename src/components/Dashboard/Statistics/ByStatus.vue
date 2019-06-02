<template>
    <v-flex xs6 >
        <v-card class="my-3">
            <v-card-title>Status</v-card-title>
            <doughnut-chart :key="chartKey" :chartData="chartData" :chartOptions="chartOptions"></doughnut-chart>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios'
    import { Doughnut } from '../../Charts'

    export default {
        name: "ByStatus",
        components: {
            'doughnut-chart': Doughnut,
        },
        beforeMount () {
            this.getByStats();
        },
        data: () => {
            return {
                chartKey: 1,
                chartData: {
                    labels : [],
                    datasets: []
                },
                chartOptions: null,
                columnChart: {
                    title: {
                        text: 'Count for each of statuses'
                    },
                    series: [
                        {
                            name: 'In use',
                            type: 'column',
                            color: '#D0F0C0',
                            data: [{ name: 'Number rooms which in use',y: 72-13 }]
                        },
                        {
                            name: 'Free',
                            type: 'column',
                            color: '#FEC5E5',
                            data: [{ name: 'Number rooms which are free',y: 13 }]
                        },
                        {
                            name: 'Total',
                            type: 'column',
                            title: 'asd',
                            color: '#D1C4E9',
                            data: [{ name: 'Your total rooms', y: 72 }]
                        },
                    ],
                },
            }
        },
        methods: {
            getByStats: async function () {

                const user = this.$store.getters.user;

                axios.get(`/api/statistics/by-status/${user._id}`, {})
                    .then(res => {
                        const labels = [], stat = [];

                        if (res.data) {
                            res.data.forEach(data => {
                                labels.push(data.status);
                                stat.push(data.value);
                            });
                        }
                        this.chartData = {
                            labels,
                            datasets: [
                                {
                                    backgroundColor: ['pink', 'yellow'],
                                    data: stat,
                                },
                            ]
                        };
                    })
                    .catch(err => console.error(err))
                    .finally(() => {
                        this.chartKey++;
                    })
            },
        },
    }
</script>

<style scoped>

</style>
