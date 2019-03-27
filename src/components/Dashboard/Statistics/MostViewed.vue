<template>
    <v-flex xs12 md10 lg6 class="px-2">
        <v-card class="my-3 pa-3 text-xs-center">
            <v-layout row wrap justify-center>
                <v-flex xs12 pb-3>
                        <span class="headline">
                            Most viewed rooms
                        </span>
                </v-flex>
                <v-flex
                        v-for="room of mostViewed"
                        :key="room._id"
                        xs6 md4
                        pa-1
                        class="elevation-5"
                >
                    <v-card flat tile class="d-flex card-viewed-room" @click="openRoom(room)">
                        <v-img
                                :src="room.photos[0].location.fit"
                                :lazy-src="room.photos[0].location.thumb"
                                heigth="250"
                                class="grey lighten-2"
                        >
                            <div class="info-about-room">
                                <v-card-text class="headline white--text title-room">
                                    <v-icon dark>visibility</v-icon>
                                    {{room.totalViews}}
                                    <div class="text-xs-center"> {{room.title | limitTitle}}</div>
                                </v-card-text>
                            </div>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "MostViewed",
        data: () => {
            return {
                mostViewed: [],
            }
        },
        beforeMount() {
            this.getMostViewed();
        },
        methods: {
            getMostViewed: function () {
                const user = this.$store.getters.user;
                axios.get(`/api/statistics/most-viewed/${user._id}`).then(res => {
                    this.mostViewed = res.data;
                })
            },
            openRoom: function (room) {
                this.$store.commit('room', { type: 'room', value: room });
                this.$router.push(`/room/${room._id}`)
            },
        },
        filters: {
            limitTitle: function (value) {
                if (value && value.length > 20) {
                    return value.slice(0, 17) + '...';
                }
                return value;
            },
        }
    }
</script>

<style scoped>
    .info-about-room {
        width: 100%;
        background-color: rgba(0,0,0, 0.2);
    }
    .title-room {
        margin-top: 120px;
    }

    .card-viewed-room {
        cursor: pointer;
    }
</style>
