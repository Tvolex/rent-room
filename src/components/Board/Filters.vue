<template>
  <div class="filters">
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
    <div class="filters_by">
      <label class="filters_label">Sort by:</label>
      <div class="filters_by_selection">
        <label for="filters_by_checkbox" class="filters_by_label icon-arrow-down">
          Best match
        </label>
        <input id="filters_by_checkbox" class="filters_by_checkbox" type="checkbox" name="filters_by_checkbox">
        <ul class="filters_by_list">
          <li class="filters_by_item">
            <a href="" class="filters_by_link">Best sellers</a>
          </li>
          <li class="filters_by_item">
            <a href="" class="filters_by_link">Best match</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Filters"
    }
</script>

<style scoped>

</style>
