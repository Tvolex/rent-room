<template>
    <div class="content_wrapper">
        <div class="content">
            <v-layout row wrap justify-center align-center>
                <v-flex xs12>
                    <div class="TabsPanel">
                        <v-tabs
                                slot="extension"
                                v-model="currentTab"
                                class="TabsPanelMain"
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
                    </div>
                </v-flex>
                <v-flex xs12>
                    <router-view/>
                </v-flex>
            </v-layout>
        </div>
    </div>


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
        },
        methods: {

        },
        computed: {
            user: function () {
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>

    .TabsPanel {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px;
        margin-bottom: 30px;
        padding: 0 50px;
    }

    .TabsPanelMain {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        /*border-left: lightgray 1px solid;*/
        /*border-right: lightgray 1px solid;*/
        padding: 15px 30px;
    }

    .tab {
        width: 100%;
        display: grid
    }
</style>
