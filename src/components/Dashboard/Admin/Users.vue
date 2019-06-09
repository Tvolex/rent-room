<template>
    <v-layout row justify-center>
        <v-dialog
                v-model="userDetails"
                max-width="590"
        >
            <v-card>

                <div class="text-xs-center">
                    <v-card-title class="subheading text-xs-center grey--text">
                        <span>User details</span>
                    </v-card-title>
                </div>

                <v-list-tile-content v-if="currentUser">
                    <span class="px-3 subheading">
                        <b>Full name: {{currentUser | showFullName}}</b>
                    </span>


                    <v-list-tile-sub-title class="pa-3 grey--text text--darken-2">
                        <v-icon>email</v-icon> <b class="px-1">Email:</b> {{currentUser.email}} <br>
                        <v-icon>phone</v-icon> <b class="px-1">Email:</b> {{currentUser.contact}} <br>
                        <v-icon>perm_identity</v-icon> <b class="px-1">Role:</b> {{currentUser.admin ? 'Admin' : 'User'}} <br>
                        <v-icon>date_range</v-icon> <b class="px-1">Date:</b> {{currentUser.createdAt | formatingDate}} <br>
                    </v-list-tile-sub-title>
                    <v-card-text class="pa-3 grey--text text--darken-2">
                        <v-icon>block</v-icon>
                        <span :class="setClassByStatus(currentUser.status)">
                            <b class="px-1">Status:</b> {{currentUser.status}}
                        </span> <br>
                    </v-card-text>

                </v-list-tile-content>

                <v-card-actions>
                    <v-btn color="green darken-1" flat @click="changeStatus(currentUser._id, 'Active')">
                        Activate
                    </v-btn>

                    <v-btn color="red darken-1" flat @click="changeStatus(currentUser._id, 'Banned')">
                        Ban
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="black darken-1" flat @click="userDetails = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-flex xs12 md6>
            <v-list three-line class="elevation-3">
                <template v-for="user in users">
                    <v-subheader>
                        <div class="headline">
                            {{user.name}} {{user.surname}}
                        </div>
                        <v-spacer></v-spacer>
                        <span class="subheading hidden-sm-and-down">{{ user._id }}</span>
                    </v-subheader>
                    <v-list-tile
                            :key="user._id"
                            avatar
                            class="px-3"
                            @click="showUserDetails(user)"
                    >
                        <v-list-tile-avatar  class="">
                            <v-avatar
                                    :size="70"
                                    class="mt-3"
                                    color="grey lighten-4"
                                    v-if="user && user.avatar && user.avatar.location && user.avatar.location.thumb"
                            >
                                <img :src="user.avatar.location.thumb" alt="avatar">
                            </v-avatar>
                            <v-avatar
                                    :size="70"
                                    class="mt-3"
                                    color="grey lighten-4"
                                    v-else
                            >
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png" alt="avatar">
                            </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content class="grey--text">
                            <v-container>
                                <v-layout row wrap justify-space-between>
                                    <v-flex xs4>
                                        Role: {{user.admin ? 'admin' : 'user'}}
                                    </v-flex>
                                    <v-flex xs4 :class="setClassByStatus(user.status)">
                                        Status: {{user.status}}
                                    </v-flex>
                                    <v-flex xs4>
                                        {{user.createdAt | formatingDate}}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
    import moment from 'moment'
    import axios from 'axios'

    export default {
        name: "Users",
        beforeMount () {
            this.getUsers();
        },
        data: () => {
            return {
                currentUser: null,
                userDetails: false,
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
            },
            setClassByStatus: (status) => {
                if (status  === 'Active')
                    return 'activeStatus';
                return 'bannedStatus';
            },

            showUserDetails: function (item) {
                this.userDetails = true;
                this.currentUser = item;
            },

            changeStatus: function (_id, status) {
                this.$store.dispatch({
                    type: 'banUser',
                    _id,
                    status,
                })
                    .then(data => {
                        console.log(data);
                        this.currentUser = data;
                    })
                    .catch(err => console.error(err))
                    .finally(this.getUsers())
            }
        },
        filters: {
            formatingDate: function (value) {
                const date = new moment(value);
                date.locale('uk');
                return date.format('LL');
            },
            showFullName(user) {
                return user ? `${user.name} ${user.surname || ''}` : 'guest'
            },
        }
    }
</script>

<style scoped>
    .activeStatus {
        color: #2d2e33;
    }
    .bannedStatus {
        color: red;
    }
</style>
