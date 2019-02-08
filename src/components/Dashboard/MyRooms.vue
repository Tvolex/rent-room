<template>
    <v-layout row wrap class="MyRooms">
        <v-flex xs12 sm6 md4
                v-for="(room, i) in rooms"
                :key="i"
        >
            <v-card hover class="elevation-5 card-room" height="250" width="300">
                <v-img
                        :src="room.photos && room.photos.length && room.photos[0].location ? room.photos[0].location.fit : '@/assets/no-photo.png'"
                        height="250"
                        width="300"
                >
                    <v-card-title>
                        <div class="grey white--text"> <h3>{{room.title}}</h3></div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="white" class="" @click="openRoom(room)">Open</v-btn>
                    </v-card-actions>
                </v-img>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
            <v-card  class="elevation-0 car-add-new-room" color="transparent" height="250" width="300">
                <v-card-title primary-title>
                    <span>Add new</span>
                    <div class="button-add-new">
                        <v-icon class="button-add-new-title">add</v-icon>
                    </div>
                </v-card-title>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "MyRooms",
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
            }
        },

        methods: {
            getMyRooms: function () {
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
            }
        },
    }
</script>

<style scoped>
    .card-room {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }

    .car-add-new-room {
        border: 1px dashed grey !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
    }

    .button-add-new {
        background: rgba(0,0,0, 0.5);
        height: 50px;
        width: 50px;
        margin-top: 100px;
        margin-right: 150px;
        cursor: pointer;
        border-radius: 50%;
        padding: 0 auto;
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
