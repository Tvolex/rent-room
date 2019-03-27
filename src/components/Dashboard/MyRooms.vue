<template>
    <v-layout row wrap>
        <NewRoom :dialog="dialogNewRoom"></NewRoom>
        <v-flex xs12 md3 class="px-5">
            <h1>My Rooms</h1>
        </v-flex>

        <v-flex
                xs12 md3 class="pa-3 additionalInfo"
                v-for="(info, i) in information"
                :key="i"
        >
            <div>
                <span class="title-info">{{info.title}}</span>
                <h3>{{info.value}} {{info.text}}</h3>
            </div>
        </v-flex>

        <v-flex xs12 md3 class="px-3 my-5">
            <div class="navbar">
                <div class="navbar_inner elevation-3">
                    <div class="navbar_title_wrapper">
                        <h3 class="navbar_title">
                            Term
                        </h3>
                        <div class="selectAllFilters">
                            <v-checkbox
                                    v-model.lazy="allTerms"
                                    color="grey"
                                    label="All"
                            ></v-checkbox>
                        </div>
                    </div>
                    <ul class="navbar_brands_list">
                        <li class="navbar_brands_item"
                            v-for="( term, i ) in terms"
                            :key="i"
                        >
                            <label :for="`term_${i}`" class="navbar_brands_label">
                                <input :id="`term_${i}`" class="navbar_checkbox" type="checkbox" :name="`term_${i}`">
                                <v-checkbox
                                        v-model.lazy="selectedTerms"
                                        class="navbar_checkbox"
                                        color="grey"
                                        :name="`term_${i}`"
                                        :value="term.title"
                                        :label="term.title"
                                ></v-checkbox>
                            </label>
                            <label class="v-label theme--light">{{term.count}}</label>
                        </li>
                    </ul>
                </div>
                <div class="navbar_inner elevation-3">
                    <div class="navbar_title_wrapper">
                        <h3 class="navbar_title">
                            Type
                        </h3>
                        <div class="selectAllFilters">
                            <v-checkbox
                                    v-model.lazy="allTypes"
                                    color="grey"
                                    label="All"
                            ></v-checkbox>
                        </div>
                    </div>
                    <ul class="navbar_brands_list">
                        <li class="navbar_brands_item"
                            v-for="( type, i ) in types"
                            :key="i"
                        >
                            <label :for="`type_${i}`" class="navbar_brands_label">
                                <v-checkbox
                                        v-model.lazy="selectedTypes"
                                        class="navbar_checkbox"
                                        color="grey"
                                        :name="`type_${i}`"
                                        :value="type.title"
                                        :label="type.title"
                                ></v-checkbox>
                            </label>
                            <label class="v-label theme--light">{{type.count}}</label>
                        </li>
                    </ul>
                </div>
                <div class="navbar_inner elevation-3">
                    <div class="navbar_title_wrapper">
                        <h3 class="navbar_title">
                            Rooms
                        </h3>
                        <div class="selectAllFilters">
                            <v-checkbox
                                    v-model.lazy="allRooms"
                                    color="grey"
                                    label="All"
                            ></v-checkbox>
                        </div>
                    </div>
                    <ul class="navbar_brands_list">
                        <li class="navbar_brands_item"
                            v-for="( numb, i ) in numberOfRooms"
                            :key="i"
                        >
                            <label :for="`number_${i}`" class="navbar_brands_label">
                                <input :id="`number_${i}`" class="navbar_checkbox" type="checkbox" :name="`number_${i}`">
                                <v-checkbox
                                        v-model.lazy="selectedRooms"
                                        class="navbar_checkbox"
                                        color="grey"
                                        :name="`number_${i}`"
                                        :value="numb.title"
                                        :label="`${numb.title}`"
                                ></v-checkbox>
                            </label>
                            <label class="v-label theme--light">{{numb.count}}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </v-flex>

        <v-flex xs12 md9 class="my-5">
            <ShadowCard v-if="loading" :count="5"></ShadowCard>
            <v-layout row wrap v-if="!loading && rooms" class=" px-3" align-start>
                <v-flex xs12 sm6 md4 lg3
                        v-if="!loading && rooms"
                        class=""
                        v-for="(room, i) in rooms"
                        :key="i"
                >
                    <v-card hover class="elevation-5 ma-1  card-room" height="250" @click="openRoom(room)">
                        <v-img
                                :src="room.photos && room.photos.length && room.photos[0].location ? room.photos[0].location.fit : '@/assets/no-photo.png'"
                                height="250"
                        >
                            <v-card-text>
                                <div class="text-xs-right white--text">
                                    <v-icon dark>visibility</v-icon>
                                    {{room.totalViews}}
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
                <v-flex xs12 sm6 md4 lg3>
                    <v-card class="card-add-new-room ma-1" color="transparent" height="250"
                            @click="dialogNewRoom.open = !dialogNewRoom.open">
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
        </v-flex>

    </v-layout>
</template>

<script>
    import moment from 'moment'
    import ShadowCard from './ShadowCard';
    import NewRoom from './newRoom';

    export default {
        name: "MyRooms",
        components: {
            ShadowCard,
            NewRoom,
        },
        mounted() {
            this.getMyRooms();
            this.getCountRoomsByUser();
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
                information: [
                    { name: 'count', title: 'Total count of my rooms', value: 0, text: 'rooms.' },
                    { name: 'use' ,title: 'Now in use', value: 0, text: 'in use.'},
                    { name: 'free', title: 'Now free', value: 0, text: 'is free.'}
                ],
                dialogNewRoom: { open: false },
                checkbox: false,
                selectedTerms: [],
                selectedTypes: [],
                selectedRooms: [],
                allTypes: false,
                allTerms: false,
                allRooms: false,

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
                    this.information = this.information.map(info => {
                        if (_.isEqual(info.name, 'count')) {
                            info.value = data.total;
                        }

                        return info;
                    });
                })
                    .catch(err => this.errorHandler(err, { notify: true }))
                    .finally(() => {
                        this.loading = false;
                    })
            },

            getCountRoomsByUser: function () {
                const self = this;

                this.$store.dispatch({type: 'getCountRoomsByUser'}).then(data => {
                    console.log(data);
                    self.numberOfRooms = self.numberOfRooms.map(numb => {
                        const index = _.findIndex(data.rooms, { name: numb.title });
                        return {
                            title: numb.title,
                            count: data.rooms[index] ? data.rooms[index].count : 0
                        }
                    });
                    self.terms = self.terms.map(term => {
                        const index = _.findIndex(data.terms, { name: term.title });
                        return {
                            title: term.title,
                            count: data.terms[index] ? data.terms[index].count : 0
                        }
                    });
                    self.types = self.types.map(type => {
                        const index = _.findIndex(data.types, { name: type.title });
                        return {
                            title: type.title,
                            count: data.types[index] ? data.types[index].count : 0
                        }
                    });
                })
                    .catch(err => this.errorHandler(err, { notify: true }))
            },

            openRoom: function (room) {
                this.$store.commit('room', { type: 'room', value: room });
                this.$router.push(`/room/${room._id}`);
            },
        },

        computed: {
            user : function () {
                return this.$store.getters.user;
            }
        },

        filters: {
            parseDate: function (value) {
                console.log(moment().locale());
                const date = new moment(value);
                date.locale('uk');
                return date.format('LLLL');
            },
        },
        watch: {
            selectedTerms: function (term, oldTerm) {
                this.filter.term = term;
                this.getMyRooms();
            },

            selectedTypes: function (type, oldType) {
                this.filter.type = type;
                this.getMyRooms();
            },

            selectedRooms: function (rooms, oldRooms) {
                this.filter.rooms = rooms;
                this.getMyRooms();
            },

            allTerms: function (all, oldAll) {
                all ? this.selectedTerms = this.terms.map(term => term.title) :
                    this.selectedTerms = [];
            },

            allTypes: function (all, oldAll) {
                all ? this.selectedTypes = this.types.map(type => type.title) :
                    this.selectedTypes = [];
            },

            allRooms: function (all, oldAll) {
                all ? this.selectedRooms = this.numberOfRooms.map(room => room.title) :
                    this.selectedRooms = [];
            },
        }
    }
</script>

<style scoped>
    .MyRooms {
        min-height: 100vh;
    }

    .additionalInfo {
        border-left: grey 2px dashed;
    }

    .title-info {
        color: grey;
    }

    .card-room {
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
