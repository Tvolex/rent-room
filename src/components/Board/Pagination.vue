<template>
  <div class="pagination">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs6>
        <v-pagination
          v-model="currentPage"
          :length="rooms.length / count"
          :total-visible="7"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    rooms: Array
  },
  data: () => {
    return {
      currentPage: 1
    }
  },
  computed: {
    count: function () {
      return this.$store.getters.count
    },
    page: function () {
      return this.$store.getters.page
    }
  }

}
</script>

<style scoped>

</style>
