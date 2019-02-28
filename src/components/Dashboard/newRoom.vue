<template>
    <v-dialog width="800" v-model="dialog.open">
        <v-card >
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                Publish new room
            </v-card-title>

            <v-card-text>
                <v-layout row wrap justify-center align-center >
                    <v-flex xs10>

                        <drag @dragover="dragover_handler" @drop="drop_handler">
                            <v-img
                                    @click="addPhoto"
                                    :src="require('@/assets/drop-files-here-extra.jpg')"
                                    class="addPhoto"
                                    id="no-photo"
                                    name="no-photo"
                            >
                            </v-img>
                        </drag>
                    </v-flex>

                    <v-flex xs7 offset-xs3>
                        <v-text-field
                                label="Title of the room"
                                append-outer-icon="edit"
                                color="grey darken-1"
                                placeholder="Please, write more info about the room"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2 md3>
                        <div class="text-xs-center text-label-selects">
                            <b>Type:</b>
                        </div>
                    </v-flex>
                    <v-flex xs10 md7>
                        <v-select
                                append-outer-icon="edit"
                                :items="types"
                                color="grey darken-1"
                                item-text="title"
                                placeholder="Select type">
                        </v-select>
                    </v-flex>

                    <v-flex xs2 md3>
                        <div class="text-xs-center text-label-selects">
                            <b>Terms:</b>
                        </div>
                    </v-flex>
                    <v-flex xs10 md7>
                        <v-select
                                append-outer-icon="edit"
                                :items="terms"
                                color="grey darken-1"
                                item-text="title"
                                multiple
                                placeholder="Select terms">
                        </v-select>
                    </v-flex>

                    <v-flex xs2 md3>
                        <div class="text-xs-center text-label-selects">
                            <b>Rooms:</b>
                        </div>
                    </v-flex>
                    <v-flex xs10 md7>
                        <v-select
                                append-outer-icon="edit"
                                :items="numberOfRooms"
                                color="grey darken-1"
                                item-text="title"
                                placeholder="Choose number of rooms">
                        </v-select>
                    </v-flex>

                </v-layout>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn
                        color="red"
                        flat
                        @click="dialog.open = false"
                >
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        flat
                        @click="dialog.open = false"
                >
                    Publish
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "newRoom",
        props: {
            dialog: Object,
        },
        beforeMount() {

        },
        data: function () {
            return {
                terms: [
                    { title: 'Short Term' },
                    { title: 'Long Term' },
                ],
                types: [
                    { title: 'Apartment' },
                    { title: 'Room' },
                    { title: 'Hotel' },
                    { title: 'Hostel' }
                ],
                numberOfRooms: [
                    { title: 1 },
                    { title: 2 },
                    { title: 3 },
                    { title: 4 }
                ]
            }
        },
        methods: {
            addPhoto: function () {

            },
            dragover_handler: function (event) {
                event.preventDefault();
                // Set the dropEffect to move
                event.dataTransfer.dropEffect = "move"
            },
            drop_handler: function (event) {
                event.preventDefault();
                // Get the id of the target and add the moved element to the target's DOM
                const data = event.dataTransfer.getData("text/plain");
                event.target.appendChild(document.getElementById(data));
            }
        },
        watch: {

        }
    }
</script>

<style scoped>
    .text-label-selects {
        color: rgb(167, 167, 167);
    }

    .addPhoto {
        cursor: pointer;
    }
</style>
