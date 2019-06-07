<template>
    <v-layout row wrap justify-center>
        <v-flex xs12 md8 lg6>
            <v-layout row wrap justify-center>
                <v-flex xs12 md4 class="text-xs-center">
                    <v-checkbox v-model="status" label="Verified" value="Verified"></v-checkbox>
                </v-flex>
                <v-flex xs12 md4>
                    <v-checkbox v-model="status" label="Verifying" value="Verifying"></v-checkbox>
                </v-flex>
                 <v-flex xs12 md4>
                    <v-checkbox v-model="status" label="Rejected" value="Rejected"></v-checkbox>
                </v-flex>
            </v-layout>
            <v-list three-line>
                <template v-for="(item, i) in announcements">
                    <v-subheader>
                        {{ item.title }}
                        <v-spacer></v-spacer>
                        {{ item.createdAt | formatingDate }}
                    </v-subheader>
                    <v-list-tile
                            :key="item.title"
                            avatar
                    >
                        <v-list-tile-avatar>
                            <img :src="item.photos[0].location.thumb">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-container>
                                <v-layout row >
                                    <v-flex xs6>
                                        <v-list-tile-sub-title>
                                            <b>Type:</b> {{item.type}} <br>
                                            <b>Term:</b> {{item.term}} <br>
                                            <b>Price:</b> {{item.price}} <br>
                                            <b>Author:</b> {{item && item.createdBy ?
                                            `${item.createdBy.name || 'name'} ${item.createdBy.surname || 'surname'}`
                                            : 'guest'}}
                                        </v-list-tile-sub-title>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-list-tile-sub-title>
                                            <b>Status: </b>
                                            <span v-bind:class="verifyingClass(item.status)">{{item.status}}</span> <br>
                                            <span class="verifyAnnouncement" @click="changeStatus(item._id, 'Verified')">Verify</span> <br>
                                            <span class="rejectAnnouncement" @click="changeStatus(item._id, 'Rejected')">Reject</span>
                                        </v-list-tile-sub-title>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-btn flat @click="openRoom(item)" style="color: grey">
                                            Open
                                        </v-btn>
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
    import moment from 'moment';
    import { STATUS } from '../../../const/index'
    export default {
        name: "Announcements",
        mounted () {
            this.getAnnouncements(Object.values(STATUS));
        },
        data: () => {
            return {
                announcements: [],
                status: [],
            }
        },
        methods: {
            getAnnouncements: function (status = this.status) {
                this.$store.dispatch({
                    type: 'getAnnouncements',
                    filter: { status },
                })
                    .then(data => {
                        this.announcements = data;
                    })
                    .catch(err => this.errorHandler(err, { notify: true }))
            },

            openRoom: function (room) {
                this.$store.commit('room', { type: 'room', value: room });
                this.$router.push(`/room/${room._id}`)
            },
            changeStatus: function (_id, status) {
                this.$store.dispatch({ type: 'changeStatus' , _id, status})
                    .then((data) => {
                        console.log(data);
                        this.getAnnouncements();
                        this.$notificator('success', `Announcement was ${status}`)
                    })
                    .catch(err => {
                        console.log(err);
                        this.$notificator('error', err.message);
                    });
            },
            verifyingClass: (status) => {
                if (status === STATUS.VERIFYING)
                    return 'VerifyingStatus';
                else if (status === STATUS.REJECTED)
                    return 'RejectedStatus';
                return 'VerifiedStatus'
            },
        },
        filters: {
            formatingDate(date) {
                return moment(date).format("LLLL");
            }
        },
        watch: {
            status: function () {
                this.getAnnouncements();
            }
        }
    }
</script>

<style scoped>
    .RejectedStatus {
        color: red;
    }

    .VerifyingStatus {
        color: orange;
    }

    .VerifiedStatus {
        color: green;
    }

    .rejectAnnouncement {
        color: rgba(200, 0, 0, 0.3);
        cursor: pointer;
    }

    .rejectAnnouncement:hover {
        color: rgba(200, 0, 0, 0.7);
    }

    .verifyAnnouncement {
        color: rgba(0, 200, 0, 0.3);
        cursor: pointer;
    }

    .verifyAnnouncement:hover {
        color: rgba(0, 200, 0, 0.7);
    }
</style>
