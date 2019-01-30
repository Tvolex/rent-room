<template>
    <v-layout row wrap justify-center align-center class="Dashboard">
        <v-flex xs12>
            <div class="content_wrapper">
                <div class="content">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <div class="TabsPanel elevation-3">
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
                        <v-flex xs10>
                            <router-view/>
                        </v-flex>
                    </v-layout>
                </div>
            </div>
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
        async beforeMount() {
            if (!this.user && !await this.$store.dispatch({ type: 'Auth' }).catch(err => this.errorHandler(err, {notify: true}))) {
                this.redirect('/login');
            }
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
        background-color: #ffffff;
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
