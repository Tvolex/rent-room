<template>
    <v-layout row wrap justify-center class="MyRooms">
        <v-flex xs12 sm6 md3 lg2
                v-for="(room, i) in rooms"
                :key="i"
        >
            <v-card class="ma-2 pa-2 text-xs-center">
                <v-img
                        :src="room.photos && room.photos.length && room.photos[0].location ? room.photos[0].location.fit : '@/assets/no-photo.png'"
                        height="200px"
                >
                    <v-expand-transition>
                        <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal display-3 white--text"
                                style="height: 100%;"
                        >
                            ₴{{room.price}}
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-title >
                    <h3><b>My Rooms</b></h3>
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
                rooms: [],
                total: 0,
            }
        },

        methods: {
            getMyRooms: function () {
                this.$store.dispatch({type: 'getMyRooms'}).then(data => {
                    this.rooms = data.rooms;
                    this.total = data.total;
                })
                    .catch(err => this.errorHandler(err, { notify: true }))
            }
        },
    }
</script>

<style scoped>

</style>
