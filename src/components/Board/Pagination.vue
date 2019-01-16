<template>
  <div class="pagination">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs6>
        <v-pagination
          v-model="currentPage"
          :length="total/count > 1 ? total/count : 1"
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
    rooms: Array,
      total: Number
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
  },
    watch: {
        count (count, prevCount) {
            this.$store.commit('count', {type: 'count', value: count});
        },

        currentPage (page, prevPage) {
            this.$store.commit('page', {type: 'page', value: page});
        }
    }

}
</script>

<style scoped>

</style>
