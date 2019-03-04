<template>
    <div class="content_inner">
        <v-layout row wrap justify-center>
            <v-flex xs12 md8 class="ma-3 room_card">
                <div v-if="loading">
                    <v-card>
                        <vue-content-loading :width="350" :height="350">
                            <rect x="0" y="0" rx="10" ry="10" width="350" height="200" />
                            <rect x="10" y="210" rx="5" ry="5" width="100" height="8" />
                            <rect x="10" y="225" rx="5" ry="5" width="225" height="15" />

                            <rect x="10" y="250" rx="5" ry="5" width="150" height="8" />
                            <rect x="10" y="265" rx="5" ry="5" width="170" height="8" />
                            <rect x="10" y="280" rx="5" ry="5" width="160" height="8" />

                            <rect x="10" y="310" rx="5" ry="5" width="40" height="10" />
                            <rect x="70" y="310" rx="5" ry="5" width="60" height="10" />
                        </vue-content-loading>
                    </v-card>
                </div>
                <div v-else-if="room">
                    <v-card>
                        <v-carousel>
                            <v-carousel-item
                                    v-if="item && item.location && item.location.original"
                                    v-for="(item, i) in room.photos" :key="i"
                                    :src="item.location.original"
                            ></v-carousel-item>
                            <img
                                    v-else
                                    src="@/assets/no-photo.png"
                                    alt="Photo"
                            />
                        </v-carousel>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <v-flex xs12 md8 >
                                    <span class="grey--text">{{room.createdBy.date | parseDate}}</span><br>
                                    <span class="headline">{{room.title}}</span><br>
                                    <span>{{room.description}}</span>
                                </v-flex>
                                <v-flex xs12 md2 class="text-xs-center">
                                    <span class="headline">₴{{room.price || 'No price'}}</span>
                                </v-flex>
                                <v-flex xs10 class="mx-2">
                                    <span>
                                        <v-icon>visibility</v-icon> {{room.views || 0}}
                                    </span>
                                </v-flex>
                            </v-layout>
                            <div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat color="orange">Share</v-btn>
                            <v-btn flat color="orange">Explore</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
                <div v-else>not found</div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import VueContentLoading from 'vue-content-loading'

    export default {
        name: 'InfoRoom',
        components: {
            VueContentLoading,
        },
        mounted () {
            const roomId = this.$route.params ? this.$route.params.id : null

            if (roomId) {
                this.getRoomById(roomId).then(room => {
                    this.room = room
                }).catch(err => { console.log(err) })
            }
        },
        data: () => {
            return {
                room: null,
                currentImageSize: 500,
                loading: false,
            }
        },
        methods: {
            async getRoomById (id) {
                this.loading = true;
                try {
                    const res = await axios.get(`/api/room/${id}`);
                    return res.data
                } catch (err) {
                    this.errorHandler(err);
                } finally {
                    this.loading = false;
                }
            },
        },
        filters: {
            parseDate: function (value) {
                console.log(moment().locale());
                const date = new moment(value);
                date.locale('uk');
                return date.format('LLLL');
            },
        }
    }
</script>

<style scoped>
    .views-number {
        margin-bottom: 2px;
    }

    .room_card {
        max-width: 1600px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .photos_card {
        max-height: 470px;
        min-height: 200px;
    }



    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
