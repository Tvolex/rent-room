<template>
    <v-flex xs6 >
        <v-card class="my-3">
            <v-card-title>Status</v-card-title>
            <charts :options="columnChart"></charts>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: "ByStatus",
        data: () => {
            return {
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
        }
    }
</script>

<style scoped>

</style>
