<template>
  <div class="filters elevation-3">
    <div class="filters_main">
      <div class="filters_main_keywords">
        <label class="filters_label">Search</label>
        <input type="text" class="filters_input" v-model.lazy="search" name="Search" placeholder="Search">
      </div>
      <div class="filters_main_price">
        <label class="price_label">Price</label>
        <input type="text" class="filters_input" v-model.lazy="minPrice" name="price-from" placeholder="500">
        <span class="filters_main_price_separation">-</span>
        <input type="text" class="filters_input" v-model.lazy="maxPrice" name="price-from" placeholder="50000">
      </div>
      <Count @countChanged="getRooms"></Count>
      <Sort @sortChanged="getRooms"></Sort>
    </div>
  </div>
</template>

<script>
    import Sort from './Sort'
    import Count from './Count'
    export default {
        name: "AdditionalFilters",
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
            },

            search: {
                get: function () {
                    return this.$store.getters.search;
                },
                set: function (search) {
                    this.$store.commit('search', { type: 'search', value: search });
                    this.getRooms();
                }
            },

            minPrice: {
                get: function () {
                    const filter = this.$store.getters.filter;
                    const { price = {min: 0, max: null  }} = filter;

                    return price.min;
                },
                set: function (minPrice) {
                    const filter = this.$store.getters.filter;
                    const { price = {min: parseInt(minPrice), max: undefined  }} = filter;
                    filter.price = price;

                    this.$store.commit('filter', { type: 'filter', value: filter });
                    this.getRooms();
                }
            },

            maxPrice: {
                get: function () {
                    const filter = this.$store.getters.filter;
                    const { price = {min: 0, max: null  }} = filter;

                    return price.max;
                },
                set: function (maxPrice) {
                    const filter = this.$store.getters.filter;
                    const { price = {min: 0, max: parseInt(maxPrice) }} = filter;
                    filter.price = price;

                    this.$store.commit('filter', { type: 'filter', value: filter });
                    this.getRooms();
                }
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
  .price_label {
    margin-right: 20px;
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    text-transform: uppercase;
    color: #a1a8bd;
  }
</style>
