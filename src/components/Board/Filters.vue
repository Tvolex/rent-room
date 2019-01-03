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
    </div>
    <Sort></Sort>
  </div>
</template>

<script>
  import Sort from './Sort'
  export default {
    name: "Filters",
    components: {
      Sort,
    },
    data: () => {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
