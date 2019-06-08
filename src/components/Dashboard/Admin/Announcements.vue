<template>
    <v-layout row wrap justify-center>
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Reject this announcement?</v-card-title>

                <v-text-field v-model="rejectionReason" class="pa-3" placeholder="Write a rejection reason">
                </v-text-field>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="black darken-1"
                            flat="flat"
                            @click="dialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                            color="red darken-1"
                            flat="flat"
                            @click="rejectAnnouncement()"
                    >
                        REJECT
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="detailsDialog"
                max-width="590"
        >
            <v-card>

                <div class="text-xs-center">
                    <v-card-title class="subheading text-xs-center grey--text">
                        <span>Details</span>
                    </v-card-title>
                </div>

                <v-list-tile-content v-if="currentAnnouncement">
                    <span class="px-3 subheading">
                        <b>Title: {{currentAnnouncement.title}}</b>
                    </span>

                    <v-card-text class="pa-3 grey--text text--darken-2">
                        <b>Description: </b> <br>
                        {{currentAnnouncement.description}}
                    </v-card-text>

                    <v-list-tile-sub-title class="pa-3 grey--text text--darken-2">


                        <!--<v-textarea readonly flat rows="2" :value="currentAnnouncement.description"></v-textarea>-->

                        <v-icon>date_range</v-icon> <b class="px-1">Date:</b> {{currentAnnouncement.createdAt | formatingDate}} <br>

                        <v-icon>person</v-icon> <b class="px-1">Author:</b> {{currentAnnouncement.createdBy | showAuthor}} <br>

                        <v-icon>home</v-icon> <b class="px-1">Type:</b> {{currentAnnouncement.type}} <br>

                        <v-icon>access_time</v-icon> <b class="px-1">Term:</b> {{currentAnnouncement.term}} <br>

                        <v-icon>weekend</v-icon> <b class="px-1">Rooms:</b> {{currentAnnouncement.rooms}} <br>

                        <v-icon>attach_money</v-icon> <b class="px-1">Price:</b> {{currentAnnouncement.price}} <br>

                        <v-icon>location_on</v-icon> <b class="px-1">Location:</b>
                        {{currentAnnouncement.location && currentAnnouncement.location.address ? currentAnnouncement.location.address : 'no address'}} <br>


                    </v-list-tile-sub-title>
                    <v-card-text class="pa-3 grey--text text--darken-2">
                        <v-icon>block</v-icon>
                        <span :class="verifyingClass(currentAnnouncement.status)">
                            <b class="px-1">Status:</b> {{currentAnnouncement.status}}
                        </span> <br>

                        <div v-if="currentAnnouncement.rejectionReason">
                            <v-icon>short_text</v-icon> <b class="px-1">Reason:</b>
                            {{currentAnnouncement.rejectionReason}}
                        </div>
                    </v-card-text>

                </v-list-tile-content>

                <v-card-actions>
                    <v-list-tile-sub-title>
                        <span class="verifyAnnouncement">Verify</span> <br>
                        <span class="rejectAnnouncement">Reject</span>
                    </v-list-tile-sub-title>


                    <v-btn color="green darken-1" flat @click="changeStatus(currentAnnouncement._id, 'Verified')">
                        Verify
                    </v-btn>

                    <v-btn color="yellow darken-1" flat @click="changeStatus(currentAnnouncement._id, 'Verifying')">
                        Still verifying
                    </v-btn>

                    <v-btn color="red darken-1" flat @click="rejectionAnnouncement(currentAnnouncement._id)">
                        Reject
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="black darken-1" flat @click="detailsDialog = false">
                        Cancel
                    </v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-flex xs12 md8 lg6>
            <v-layout row wrap justify-center>
                <v-flex xs12>
                    <v-text-field v-model="search" placeholder="Search by title/description/location"></v-text-field>
                </v-flex>
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
                        <span class="subheading hidden-sm-and-down">{{ item._id }}</span>
                        <v-spacer></v-spacer>
                        <span class="subheading">{{ item.title | formatTitle }}</span>
                        <v-spacer></v-spacer>
                        {{ item.createdAt | formatingDate }}
                    </v-subheader>
                    <v-list-tile
                            :key="item.title"
                            avatar
                            @click="showDetailsAnnouncement(item)"
                    >
                        <v-list-tile-avatar>
                            <img :src="item.photos[0].location.thumb">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-container>
                                <v-layout row  align-center>
                                    <v-flex xs6>
                                        <v-list-tile-sub-title>
                                            <b>Type:</b> {{item.type}} <br>
                                            <b>Term:</b> {{item.term}} <br>
                                            <b>Price:</b> {{item.price}} <br>
                                            <b>Author:</b> {{item.createdBy | showAuthor}}
                                        </v-list-tile-sub-title>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-list-tile-sub-title>
                                            <b>Status: </b>
                                            <span v-bind:class="verifyingClass(item.status)">{{item.status}}</span> <br>
                                        </v-list-tile-sub-title>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-btn flat
                                               @mousedown.middle="openRoom({ room: item, newTab: true })"
                                               @click="openRoom({ room: item })"
                                               style="color: grey">
                                            Show
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
            this.getAnnouncements();
        },
        data: () => {
            return {
                search: null,
                announcements: [],
                status: ["Verifying"],
                announcementId: null,
                confirmReject: false,
                rejectionReason: null,
                dialog: false,
                detailsDialog: false,
                currentAnnouncement: null,
            }
        },
        methods: {
            getAnnouncements: function (status = this.status) {
                this.$store.dispatch({
                    type: 'getAnnouncements',
                    search: this.search,
                    filter: { status },
                })
                    .then(data => {
                        this.announcements = data;
                    })
                    .catch(err => this.errorHandler(err, { notify: true }))
            },

            openRoom: function ({ room, newTab = false }) {
                this.$store.commit('room', { type: 'room', value: room });

                if (newTab)
                    return window.open(window.location.origin + `/room/${room._id}`);

                this.$router.push(`/room/${room._id}`)
            },
            rejectionAnnouncement: function (_id) {
                this.confirmReject = false;
                this.rejectionReason = null;
                this.announcementId = _id;

                this.dialog = true;
            },
            rejectAnnouncement: function () {
                this.dialog = false;
                this.changeStatus(this.announcementId, STATUS.REJECTED, this.rejectionReason);
            },
            changeStatus: function (_id, status, rejectionReason) {
                this.$store.dispatch({ type: 'changeStatus' , _id, status, rejectionReason})
                    .then((data) => {
                        console.log(data);
                        this.currentAnnouncement = data;
                        this.getAnnouncements();
                        this.$notificator('success', `Announcement was ${status}`)
                    })
                    .catch(err => {
                        console.log(err);
                        this.$notificator('error', err.message);
                    });
            },
            showDetailsAnnouncement: function (announcement) {
                this.currentAnnouncement = announcement;
                this.detailsDialog = true;
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
            },

            showAuthor(createdBy) {
                return createdBy ? `${createdBy.name} ${createdBy.surname || ''}` : 'guest'
            },

            formatTitle(title) {
                if (title && title.length > 20)
                    return title.substr(0, 30);
                return title;
            }
        },
        watch: {
            status: function () {
                this.getAnnouncements();
            },
            search: function () {
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
        cursor: pointer;
    }

    .verifyAnnouncement {
        color: rgba(0, 200, 0, 0.3);
        cursor: pointer;
    }

    .verifyAnnouncement:hover {
        color: rgba(0, 200, 0, 0.7);
        cursor: pointer;
    }
</style>
