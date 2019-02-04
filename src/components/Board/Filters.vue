<template>
    <div class="navbar">
        <div class="navbar_inner elevation-3">
            <div class="navbar_title_wrapper">
                <h3 class="navbar_title">
                    Term
                    <v-icon>refresh</v-icon>
                </h3>
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
                                :name="`term_${i}`"
                                :value="term.title"
                                :label="term.title"
                        ></v-checkbox>
                    </label>
                </li>
            </ul>
        </div>
        <div class="navbar_inner elevation-3">
            <div class="navbar_title_wrapper">
                <h3 class="navbar_title">
                    Type
                    <v-icon>refresh</v-icon>
                </h3>
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
                                :name="`type_${i}`"
                                :value="type.title"
                                :label="type.title"
                        ></v-checkbox>
                    </label>
                </li>
            </ul>
        </div>
        <div class="navbar_inner elevation-3">
            <div class="navbar_title_wrapper">
                <h3 class="navbar_title">
                    Number of rooms
                    <v-icon>refresh</v-icon>
                </h3>
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
                                :name="`number_${i}`"
                                :value="numb.title"
                                :label="`${numb.title}`"
                        ></v-checkbox>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Filters',
        beforeMount() {

        },
        data () {
            return {
                checkbox: false,
                selectedTerms: [],
                selectedTypes: [],
                selectedRooms: [],

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
        computed: {

        },

      methods: {
          updateFilter: function ({term, type, rooms}) {
            const filter = this.$store.getters.filter;

            if (term)
              filter.term = term;
            if (type)
              filter.type = type;
            if (rooms)
              filter.rooms = rooms;

            this.$store.commit('filter', { type: 'filter', value: filter });
            this.$parent.getRooms();
          }
      },

        watch: {
            selectedTerms: function (term, oldTerm) {
                this.updateFilter({term});
            },

            selectedTypes: function (type, oldType) {
              this.updateFilter({type});
            },

            selectedRooms: function (rooms, oldRooms) {
              this.updateFilter({rooms});
            },


        }
    }
</script>

<style scoped>

</style>
