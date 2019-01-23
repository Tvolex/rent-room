<template>
    <div class="filters_sort">
        <label class="sort_label">Sort by:</label>
        <v-select
                :items="sorting"
                v-model="sort"
                item-text="title"
                item-value="value"
                height="15"
                class="filters_input"
                label="Select"
                hide-details
                single-line
        ></v-select>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: "Sort",
        data: () => {
            return {
                sort: { by: "price", order: -1 },
                sorting: [
                    { title: 'Low price', value: { by: "price", order: 1 } },
                    { title: 'High price', value: { by: "price", order: -1 } },
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

    .filters_sort {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .v-text-field>.v-input__control>.v-input__slot:after, .v-text-field>.v-input__control>.v-input__slot:before {
        width: 0px !important;
    }

    .sort_label{
        margin-right: 20px;
        width: 115px;
        font-size: 14px;
        line-height: 1;
        font-weight: 400;
        text-transform: uppercase;
        color: #a1a8bd;
    }
</style>
