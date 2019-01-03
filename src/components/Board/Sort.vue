<template>
    <div class="filters_by">
        <label class="filters_label">Sort by:</label>
        <div class="filters_by_selection">
            <!--<label for="filters_by_checkbox" class="filters_by_label icon-arrow-down">-->
                <!--{{sortTitle}}-->
            <!--</label>-->
            <!--<input id="filters_by_checkbox" v-model="sortDropDown" ref="filters_by_checkbox" class="filters_by_checkbox" type="checkbox" name="filters_by_checkbox">-->
            <!--<ul class="filters_by_list elevation-3" v-show="sortDropDown">-->
                <!--<li class="filters_by_item" v-for="sort in sorting" :key="sort.title">-->
                    <!--<div class="filters_by_link" @click="changeSort(sort.title)">{{sort.title}}</div>-->
                <!--</li>-->
            <!--</ul>-->


            <v-select
                    :items="sorting"
                    v-model="sort"
                    item-text="title"
                    item-value="value"
                    height="15"
                    label="Select"
                    hide-details
                    single-line
            ></v-select>

        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: "Sort",
        data: () => {
            return {
                sort: { price: 1 },
                sorting: [
                    { title: 'Low price', value: { price: 1 } },
                    { title: 'High price', value: { price: -1 } },
                ],
            }
        },

        methods: {
            changeSort(sortTitle) {
                this.sortDropDown = false;
                this.sortTitle = sortTitle;
                this.$refs.filters_by_checkbox.checked = false;
            }
        },

        watch: {
            sort: function (sort, oldSort) {
                this.$store.commit('sort', { type: 'sort', value: sort });
            }
        }
    }
</script>

<style scoped>
    .primary--text {
         color:  #a1a8bd !important;
         caret-color: #a1a8bd !important;
    }

    .v-text-field>.v-input__control>.v-input__slot:after, .v-text-field>.v-input__control>.v-input__slot:before {
        width: 0px !important;
    }
</style>
