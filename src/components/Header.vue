<template>
    <v-layout row wrap class="Header">
        <v-flex xs12>
            <v-toolbar >
                <v-layout row wrap>
                    <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
                    <v-btn flat to="/" active-class="default-btn-background">Home</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat to="/about" active-class="default-btn-background" class="hidden-xs-only">About</v-btn>
                    <v-btn depressed flat to="/" active-class="default-btn-background" class="hidden-xs-only">Home</v-btn>
                    <v-btn flat :to="user ? '/dashboard' : '/login'" active-class="default-btn-background" class="hidden-xs-only">{{user ? 'Dashboard' : 'Login'}}</v-btn>
                    <v-btn flat v-if="user" to="/" active-class="default-btn-background" @click="Logout">Exit <v-icon>exit_to_app</v-icon></v-btn>
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
                            <v-list-tile-title v-if="user">{{user.name}} </v-list-tile-title>
                            <v-list-tile-title v-else>
                                Unauthorized
                                <router-link to="/login">Login</router-link>
                            </v-list-tile-title>

                        </v-list-tile-content>
                        <v-list-tile-action  v-if="user" class="Logout" @click="Logout">
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile
                            v-for="(item, i) in items"
                            :key="i"
                            @click="redirect(item.route)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
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
                sidebar: false,
                items: [
                    {
                        title: 'Home',
                        icon: 'home',
                        route: '/'
                    },
                    {
                        title: 'Dashboard',
                        icon: 'home',
                        route: '/dashboard'
                    }
                ]
            }
        },
        methods: {
            Logout: function () {
                this.$store.dispatch({ type: 'Logout' })
                    .catch(this.errorHandler);

                this.redirect('/');
            },

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

    .default-btn-background {
        background-color: transparent !important;
    }

    .Logout {
        cursor: pointer;
    }
</style>
