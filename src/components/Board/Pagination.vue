<template>
    <div class="pagination">
        <v-layout align-center justify-center row fill-height>
            <v-flex xs6>
                <v-pagination
                        v-model="page"
                        :length="Math.ceil(total/count)"
                        :total-visible="7"
                ></v-pagination>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        data: () => {
            return {

            }
        },
        computed: {
            count: function () {
                return this.$store.getters.count
            },

            page: {
                get: function () {
                    return this.$store.getters.page
                },
                set: function (page) {
                    this.$store.commit('page', { type: 'page', value: page });
                    this.$emit('pageChanged', page);
                }
            },

            total: function () {
                return this.$store.getters.total
            },
        },

    }
</script>

<style scoped>

</style>
