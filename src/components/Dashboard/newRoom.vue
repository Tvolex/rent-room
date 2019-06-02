<template>
    <v-dialog width="800" v-model="dialog.open">
        <v-card >
            <v-card-title
                    class="headline grey lighten-2 elevation-5"
                    primary-title
            >
                Publish new room
            </v-card-title>

            <v-card-text>
                <v-form v-model="isFormValid" name="publishRoom" ref="create_new_form">
                    <v-layout row wrap justify-center align-center >

                        <v-flex xs1></v-flex>
                        <v-flex xs12 md10>
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    action="/api/upload/photo"
                                    :on-preview="handlePreviewUpload"
                                    :on-success="handleSuccessUpload"
                                    :on-error="handleErrorUpload"
                                    :on-remove="handleRemoveUpload"
                                    list-type="picture"
                                    multiple>
                                <i class="el-icon-plus"></i>
                                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                            </el-upload>

                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3>
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Title:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-text-field
                                    label="Title of the room"
                                    append-icon="edit"
                                    v-model="RoomTitle"
                                    :rules="Rules.title"
                                    color="grey darken-1"
                                    placeholder="Please, write headline for the room"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3>
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Price:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-text-field
                                    append-icon="monetization_on"
                                    v-model="RoomPrice"
                                    :rules="Rules.price"
                                    color="grey darken-1"
                                    item-text="title"
                                    placeholder="Set a price">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3>
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Type:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-select
                                    append-icon="edit"
                                    :items="types"
                                    v-model="RoomType"
                                    :rules="Rules.type"
                                    color="grey darken-1"
                                    item-text="title"
                                    placeholder="Select type">
                            </v-select>
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3>
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Terms:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-select
                                    append-icon="edit"
                                    :items="terms"
                                    v-model="RoomTerm"
                                    :rules="Rules.term"
                                    color="grey darken-1"
                                    item-text="title"
                                    placeholder="Select terms">
                            </v-select>
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3>
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Rooms:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-select
                                    append-icon="edit"
                                    :items="numberOfRooms"
                                    v-model="RoomNumb"
                                    color="grey darken-1"
                                    :rules="Rules.rooms"
                                    item-text="title"
                                    placeholder="Choose number of rooms">
                            </v-select>
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs1></v-flex>
                        <v-flex md2 mt-3 >
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Description:</b>
                            </div>
                        </v-flex>
                        <v-flex  xs12 md8 >
                            <v-textarea
                                    label="Description of the room"
                                    append-icon="edit"
                                    v-model="RoomDescription"
                                    :rules="Rules.description"
                                    color="grey darken-1"
                                    placeholder="Please, write more info about the room"
                            ></v-textarea>
                        </v-flex>
                        <v-flex md2 mt-3 >
                            <div :class="[detectIsMobile ? 'text-xs-left' : 'text-xs-right', 'text-label-selects', 'mr-5']">
                                <b>Location:</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 md8>
                            <v-text-field
                                label="Location"
                                append-icon="location"
                                v-model="RoomLocation.address"
                                color="grey darken-1"
                                placeholder="location"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1></v-flex>
                        <v-flex xs12 md8>
                            <GmapMap
                                    ref="gmap"
                                    :center="center"
                                    :zoom="zoom"
                                    map-type-id="terrain"
                                    style="width: 600px; height: 400px"
                            >
                                <GmapMarker
                                        :position="point.position"
                                        :title="point.title"
                                        :clickable="true"
                                        :draggable="true"
                                        @dragend="updatePosition"
                                        @click="() => {this.center=point.position; this.zoom=16}"
                                />
                            </GmapMap>
                        </v-flex>

                    </v-layout>
                </v-form>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
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
                        :disabled="!isFormValid"
                        @click="publishRoom"
                >
                    Publish
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Geocoder from 'node-geocoder';
    const GeocoderOptions = {
        provider: 'google',
        httpAdapter: 'https', // Default
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
    };
    const geocoder = Geocoder(GeocoderOptions );
    export default {
        name: "newRoom",
        props: {
            dialog: Object,
        },
        mounted() {
            console.log(this);
        },
        data: function () {
            return {
                point: {
                    position: {
                        lat: 48.636423, lng: 22.276994
                    },
                    title: 'Україна, Ужгород'
                },
                zoom: 13,
                center: {lat: 48.621690, lng: 22.298125},
                RoomLocation: {
                    address: '',
                    point: {
                        lng: 0,
                        lat: 0,
                    }
                },
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
                ],

                RoomDescription: null,
                RoomTitle: null,
                RoomPhotos: [],
                RoomTerm: null,
                RoomType: null,
                RoomNumb: null,
                RoomPrice: 0,

                isFormValid: false,

                Rules: {
                    title: [
                        v => !!v || 'Please, enter title for you room'
                    ],
                    price: [
                        v => !!v || 'Please, enter the price'
                    ],
                    term: [
                        v => !!v || 'Please, select term'
                    ],
                    type: [
                        v => !!v || 'Please, select type'
                    ],
                    rooms: [
                        v => !!v || 'Please, select number of the rooms'
                    ],
                    description: [
                        v => !!v || 'Please, write more info about the room'
                    ]
                },

                over: false,
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            updatePosition(locationData) {
                this.point.position.lat = locationData.latLng.lat();
                this.point.position.lng = locationData.latLng.lng();

                const self = this;

                geocoder.reverse({lat:locationData.latLng.lat(), lon:locationData.latLng.lng()}, function (err, data) {
                    if (err)
                        console.error(err);
                    console.log(data[0]);
                    self.RoomLocation = {
                        address: data[0].formattedAddress,
                        point: {
                            lng: data[0].longitude,
                            lat: data[0].latitude,
                        }
                    };
                });
            },
            handleRemoveUpload(file, fileList) {
                const { _id: fileId = null } = file.response;
                this.$store.dispatch({ type: 'removeFile', fileId })
                    .catch(err => this.errorHandler(err, { notify: true }));
            },
            handlePreviewUpload(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccessUpload(response, file, fileList) {
                this.RoomPhotos.push(response._id)
            },
            handleErrorUpload(err, file, fileList) {
                this.$notify({ type: 'error', message: err.message });
            },
            publishRoom() {
                this.$store.dispatch({
                    type: 'publishRoom',
                    RoomDescription: this.RoomDescription,
                    RoomTitle: this.RoomTitle,
                    RoomLocation: this.RoomLocation,
                    RoomPhotos: this.RoomPhotos,
                    RoomTerm: this.RoomTerm,
                    RoomType: this.RoomType,
                    RoomNumb: this.RoomNumb,
                    RoomPrice: this.RoomPrice,
                }).then(data => {
                    console.log(data);
                })

                this.dialog.open = false

            },
        },
        watch: {
        }
    }
</script>

<style >
    .text-label-selects {
        vertical-align: top;
        color: rgb(167, 167, 167);
    }

    .addPhoto {
        cursor: pointer;
    }

    .drop.over {
        border-color: #aaa;
        background: #ccc;
    }

    .el-upload {
        display: flex !important;
    }

    .el-upload-dragger {
        width: 100% !important;
    }
</style>
