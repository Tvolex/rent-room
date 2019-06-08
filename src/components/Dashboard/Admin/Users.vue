<template>
    <v-layout row justify-center>
        <v-flex xs12 md6>
            <v-list three-line>
                <template v-for="user in users">
                    <v-subheader>
                        <span class="subheading">{{ user.title }}</span>
                        <v-spacer></v-spacer>
                        <span class="subheading hidden-sm-and-down">{{ user._id }}</span>
                    </v-subheader>
                    <v-list-tile
                            :key="user._id"
                            avatar
                            @click=""
                    >
                        <v-list-tile-avatar  class="elevation-3">
                            <v-avatar
                                    :size="100"
                                    color="grey lighten-4"
                                    v-if="user && user.avatar && user.avatar.location && user.avatar.location.thumb"
                            >
                                <img :src="user.avatar.location.thumb" alt="avatar">
                            </v-avatar>
                            <v-avatar
                                    :size="100"
                                    color="grey lighten-4"
                                    v-else
                            >
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png" alt="avatar">
                            </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-card-text class="grey--text">
                                <div class="headline">
                                    {{user.name}} {{user.surname}}
                                </div>
                                {{user.admin ? 'admin' : 'user'}}
                            </v-card-text>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Users",
        beforeMount () {
            this.getUsers();
        },
        data: () => {
            return {

            }
        },
        computed: {
            users: function () {
                return this.$store.getters.users;
            }
        },
        methods: {
            getUsers: function () {
                this.$store.dispatch({type: 'getUsers'});
            }
        }
    }
</script>

<style scoped>

</style>
