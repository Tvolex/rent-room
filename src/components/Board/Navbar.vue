<template>
  <div class="navbar">
    <div class="navbar_inner elevation-3">
      <div class="navbar_title_wrapper">
        <h3 class="navbar_title">Тип</h3>
      </div>
      <ul class="navbar_brands_list">
        <li class="navbar_brands_item"
            v-for="type in types"
            :key="type._id"
        >
          <label :for="`type_${type._id}`" class="navbar_brands_label">
            <v-checkbox
              v-model="type.selected"
              class="navbar_checkbox"
              :name="`type_${type._id}`"
              :label="type.title"
            ></v-checkbox>
          </label>
          <span class="navbar_number">{{type.count}}</span>
        </li>
      </ul>
    </div><div class="navbar_inner elevation-3">
    <div class="navbar_title_wrapper">
      <h3 class="navbar_title">Кількість</h3>
    </div>
    <ul class="navbar_brands_list">
      <li class="navbar_brands_item"
          v-for="numb in numberOfRooms"
          :key="numb._id"
      >
        <label :for="`number_${numb._id}`" class="navbar_brands_label">
          <input :id="`number_${numb._id}`" class="navbar_checkbox" type="checkbox" :name="`number_${numb._id}`">
          <v-checkbox
            v-model="numb.selected"
            class="navbar_checkbox"
            :name="`number_${numb._id}`"
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
  data () {
    return {
      checkbox: false,
      types: [
        { _id: 1, title: 'Квартира', selected: false, count: 240 },
        { _id: 2, title: 'Кімната', selected: false, count: 124 },
        { _id: 3, title: 'Міні-готель', selected: false, count: 49 },
        { _id: 4, title: 'Хостел', selected: false, count: 25 }
      ],
      numberOfRooms: [
        { _id: 1, title: '1', selected: false, count: 143 },
        { _id: 2, title: '2', selected: false, count: 257 },
        { _id: 3, title: '3', selected: false, count: 28 },
        { _id: 4, title: '4+', selected: false, count: 10 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
