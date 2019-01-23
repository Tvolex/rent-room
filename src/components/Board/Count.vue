<template>
    <div class="filters_count">
        <label class="filters_label">Count:</label>
        <v-select
                :items="counting"
                v-model="count"
                height="15"
                label="Select"
                class="count_input"
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
            }
        },

        computed: {
            count: {
                get: function () {
                    return this.$store.getters.count;
                },

                set: function (count) {
                    this.$store.commit('count', { type: 'count', value: count });
                    this.$emit('countChanged', count);
                }
            }
        },

        methods: {
            changeSort(sortTitle) {
                this.sortDropDown = false;
                this.sortTitle = sortTitle;
                this.$refs.filters_by_checkbox.checked = false;
            }
        },
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

    .count_input {
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        background-color: #f0f2f7;
        border: 1px solid #e3e8f0;
        border-radius: 20px;
        padding: 10px 15px;
        width: 100px;
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
