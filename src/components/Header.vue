<template>
    <v-layout row wrap class="Header">
        <v-flex xs12>
            <v-toolbar >
                <v-layout row wrap>
                    <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
                    <v-btn flat to="/">Home</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat to="/about" class="hidden-xs-only">About</v-btn>
                    <v-btn flat to="/" class="hidden-xs-only">Home</v-btn>
                    <v-btn flat to="/login" class="hidden-xs-only">{{user ? 'Dashboard' : 'Login'}}</v-btn>
                </v-layout>
            </v-toolbar>
            <v-navigation-drawer
                    v-model="sidebar"
                    absolute
                    temporary
            >
                <v-list class="pa-1">
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <img v-if="user  && user.avatar && user.avatar.location" :src="user.avatar.location.thumb" height="100">
                            <img v-else src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-if="user">{{user.name}}</v-list-tile-title>
                            <v-list-tile-title v-else>
                                Unauthorized
                                <router-link to="/login">Login</router-link>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Header',
        data: () => {
            return {
                sidebar: false
            }
        },
        computed: {
            user () {
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>
    .Header {
        max-height: 64px;
    }
</style>
