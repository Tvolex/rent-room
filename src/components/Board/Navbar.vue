<template>
  <div class="navbar">
    <div class="navbar_inner elevation-3">
      <div class="navbar_title_wrapper">
        <h3 class="navbar_title">Type</h3>
      </div>
      <ul class="navbar_brands_list">
        <li class="navbar_brands_item"
            v-for="( type, i ) in types"
            :key="i"
        >
          <label :for="`type_${type._id}`" class="navbar_brands_label">
            <v-checkbox
                    v-model="selectedType"
                    class="navbar_checkbox"
                    :name="`type_${type._id}`"
                    :value="type.title"
                    :label="type.title"
            ></v-checkbox>
          </label>
          <span class="navbar_number">{{type.count}}</span>
        </li>
      </ul>
    </div><div class="navbar_inner elevation-3">
    <div class="navbar_title_wrapper">
      <h3 class="navbar_title">Number of rooms</h3>
    </div>
    <ul class="navbar_brands_list">
      <li class="navbar_brands_item"
          v-for="( numb, i ) in numberOfRooms"
          :key="i"
      >
        <label :for="`number_${numb._id}`" class="navbar_brands_label">
          <input :id="`number_${numb._id}`" class="navbar_checkbox" type="checkbox" :name="`number_${numb._id}`">
          <v-checkbox
                  v-model="selectedRooms"
                  class="navbar_checkbox"
                  :name="`number_${numb._id}`"
                  :value="numb.title"
                  :label="numb.title"
          ></v-checkbox>
        </label>
        <span class="navbar_number">{{numb.count}}</span>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    beforeMount() {

    },
    data () {
      return {
        checkbox: false,
        localFilter: {},
        selectedType: [],
        selectedRooms: [],

        types: [
          { title: 'Apartment', count: 0 },
          { title: 'Room', count: 0 },
          { title: 'Hotel', count: 0 },
          { title: 'Hostel', count:  0}
        ],
        numberOfRooms: [
          { title: '1', count: 0 },
          { title: '2', count: 0 },
          { title: '3', count: 0 },
          { title: '4+', count: 0 }
        ]
      }
    },
    computed: {

    },

    watch: {
      selectedType: function (type, oldType) {
        this.localFilter.type = type;
        this.$store.commit('filter', { type: 'filter', value: this.localFilter });
      },

      selectedRooms: function (rooms, oldRooms) {
        this.localFilter.rooms = rooms;
        this.$store.commit('filter', { type: 'filter', value: this.localFilter });
      },
    }
  }
</script>

<style scoped>

</style>
