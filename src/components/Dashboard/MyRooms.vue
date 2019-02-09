<template>
    <v-layout row wrap class="MyRooms">
        <v-flex xs12 sm6 md4 lg3
                v-if="rooms"
                v-for="(room, i) in rooms"
                :key="i"
        >
            <v-card hover class="elevation-5 card-room" height="250" @click="openRoom(room)">
                <v-img
                        :src="room.photos && room.photos.length && room.photos[0].location ? room.photos[0].location.fit : '@/assets/no-photo.png'"
                        height="250"
                >
                    <v-card-text>
                        <div class="text-xs-right white--text">
                            <v-icon dark>visibility</v-icon>
                            {{room.views}}
                        </div>
                    </v-card-text>
                   <div class="info-about-room">
                       <v-card-text class="title-room">
                           <div class="headline white--text"> {{room.title}}</div>
                           <div class="white--text">{{room.createdBy.date | parseDate}}</div>
                       </v-card-text>
                   </div>
                </v-img>
            </v-card>
        </v-flex>
        <ShadowCard v-if="loading" :count="5"></ShadowCard>
        <v-flex xs12 sm6 md4 lg3>
            <v-card class="card-add-new-room" color="transparent" height="250">
                <v-card-text>
                    <div class="button-add-new ">
                        <v-icon class="icon-add-new">add</v-icon>
                    </div>
                </v-card-text>
                <v-card-text class="text-xs-center title-new-ad " align="center">
                    <p>Here you can create a new ad.</p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import moment from 'moment'
    import ShadowCard from './ShadowCard';
    export default {
        name: "MyRooms",
        components: {
            ShadowCard,
        },
        beforeMount() {
            this.getMyRooms();
        },
        data: () => {
            return {
                page: 1,
                count: 5,
                room: null,
                rooms: [],
                total: 1,
                search: null,
                sort: { by: "price", order: -1 },
                filter: {},
                loading: false,
            }
        },

        methods: {
            getMyRooms: function () {
                this.loading = true;
                this.$store.dispatch({type: 'getMyRooms',
                    filter: this.filter,
                    search: this.search,
                    page: this.page,
                    count: this.count,
                    sort: this.sort,
                }).then(data => {
                    this.rooms = data.items;
                    this.total = data.total;
                })
                    .catch(err => this.errorHandler(err, { notify: true }))
                    .finally(() => {
                        this.loading = false;
                    })
            },

            openRoom: function (room) {
                this.$store.commit('room', { type: 'room', value: room });
                this.$router.push(`/room/${room._id}`);
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
    .MyRooms {
        min-height: 100vh;
    }

    .card-room {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }

    .info-about-room {
        width: 100%;
        background-color: rgba(0,0,0, 0.2);
    }

     .title-room {
         margin-top: 120px;
     }

    .icon-add-new {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .card-add-new-room {
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        border: 2px dashed #b3b3b3  !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        margin: 0 0 20px 15px;
    }

    .card-add-new-room:hover {
        border: 2px dashed grey !important;
    }

    .title-new-ad {
        color: grey;
        height: 50px !important;
    }

    .button-add-new {
        position: relative;
        background: rgba(0,0,0, 0.25);
        height: 50px;
        width: 50px;
        cursor: pointer;
        border-radius: 50%;
        margin: 0 auto;
    }

    .button-add-new-title {

    }

    .action_button_room {
        margin-top: 200px;
    }

    .name_title {
        margin-top: 200px;
        color: white
    }
</style>
