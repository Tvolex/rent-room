<template>
    <div class="filters_count">
        <label class="filters_label">Count:</label>
        <v-select
                :items="counting"
                v-model="currentCount"
                height="15"
                label="Select"
                class="filters_input"
                hide-details
                single-line
        ></v-select>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: "Count",
        data: () => {
            return {
                counting: [3, 6, 12, 24, 50, 100],
                currentCount: 6,
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
                this.$emit('countChanged', count);
            }
        }
    }
</script>

<style scoped>
    .primary--text {
         color:  #a1a8bd !important;
         caret-color: #a1a8bd !important;
    }

    .filters_count {
        display: flex;
        align-items: center;
        margin-right: 30px;
        justify-content: flex-start;
    }


    /*  Additional replacement style  */

    .theme--light.v-text-field>.v-input__control>.v-input__slot:before {
        border-color: transparent !important;
    }

    .v-text-field>.v-input__control>.v-input__slot:after, .v-text-field>.v-input__control>.v-input__slot:before {
        width: 0px !important;
    }

    .v-text-field>.v-input__control>.v-input__slot:after, .v-text-field>.v-input__control>.v-input__slot:before {
        width: 0px !important;
    }
</style>
