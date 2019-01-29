<template>
    <v-layout row wrap justify-center class="Dashboard">
        <v-flex xs12 md10 lg6>

            <v-tabs
                    slot="extension"
                    v-model="currentTab"
                    fixed-tabs
                    color="transparent"
            >
                <v-tabs-slider color="rgb(184,184,184)"></v-tabs-slider>

                <v-tab v-for="(tab, i) in tabs" :key="i" :to="tab.route">
                    <div class="tab" >
                        <v-icon>{{tab.icon}}</v-icon>
                        {{tab.title}}
                    </div>
                </v-tab>

            </v-tabs>
        </v-flex>
        <v-flex xs10>
            <router-view/>
        </v-flex>
    </v-layout>
</template>

<script>
    import MyRooms from './MyRooms'
    import Statistics from './Statistics'
    export default {
        name: "Dashboard",
        components: {
            Statistics,
            MyRooms
        },
        data: () => {
            return {
                currentTab: null,
                tabs: [
                    {
                        title: 'Statistics',
                        icon: 'show_chart',
                        route: '/dashboard/statistics',
                    },
                    {
                        title: 'My rooms',
                        icon: 'home',
                        route: '/dashboard/rooms',
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .Dashboard {
        padding: 30px 0;
    }

    .tab {
        width: 100%;
        display: grid
    }
</style>
