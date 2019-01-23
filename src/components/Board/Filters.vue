<template>
  <div class="filters elevation-3">
    <div class="filters_main">
      <div class="filters_main_keywords">
        <label class="filters_label">Keywords</label>
        <input type="text" class="filters_input" name="keywords" placeholder="Tablet">
      </div>
      <div class="filters_main_price">
        <label class="filters_label">Price</label>
        <input type="text" class="filters_input" name="price-from" value="10">
        <span class="filters_main_price_separation">-</span>
        <input type="text" class="filters_input" name="price-from" value="1000">
      </div>
      <Count @countChanged="getRooms"></Count>
      <Sort></Sort>
    </div>
  </div>
</template>

<script>
  import Sort from './Sort'
  import Count from './Count'
  export default {
    name: "Filters",
    components: {
      Sort,
        Count
    },
    data: () => {
      return {
      }
    },
    computed: {
      sort: function () {
        return this.$store.getters.sort
      }
    },
    methods: {
      getRooms() {
        this.$store.commit('page', { type: 'page', value: 1 });
        this.$emit('pageChanged', 1);

        this.$parent.getRooms();
      }
    }
  }
</script>

<style scoped>

</style>
