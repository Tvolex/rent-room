<template>
    <div class="filters_by">
        <label class="filters_label">Count:</label>
        <div class="filters_by_selection">
            <v-select
                    :items="counting"
                    v-model="currentCount"
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
        name: "Count",
        data: () => {
            return {
                counting: [10, 20, 50, 100],
                currentCount: 10,
            }
        },

        computed: {
            count: function () {
                return this.$store.getters.count;
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
            currentCount: function (count, oldCount) {
                this.$store.commit('count', { type: 'count', value: count });
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
