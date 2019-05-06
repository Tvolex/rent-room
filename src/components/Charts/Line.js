import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    name: 'line-chart',
    props: {
        chartData: { type: Object },
        optionsData: { type: Object },
    },
    data () {
        return {
            datacollection: {
                //Data to be represented on x-axis
                labels: [],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#249EBF',
                        //Data to be represented on y-axis
                        data: [0]
                    }
                ]
            },
            //Chart.js options that controls the appearance of the chart
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted () {
        this.renderChart(this.chartData || this.datacollection, this.optionsData || this.options);
        console.log('Line chart rendered.')
    }
}
