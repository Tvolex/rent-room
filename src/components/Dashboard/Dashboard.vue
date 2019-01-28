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
                <v-tab v-for="(tab, i) in tabs" :key="i">
                    <div class="tab">
                        <v-icon>{{tab.icon}}</v-icon>
                        {{tab.title}}
                    </div>
                </v-tab>
            </v-tabs>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Dashboard",
        data: () => {
            return {
                currentTab: null,
                tabs: [
                    {
                        title: 'Statistics',
                        icon: 'show_chart',
                        route: 'statistics',
                    },
                    {
                        title: 'My rooms',
                        icon: 'home',
                        route: 'rooms',
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
