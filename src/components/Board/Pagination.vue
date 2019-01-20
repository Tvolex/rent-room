<template>
    <div class="pagination">
        <v-layout align-center justify-center row fill-height>
            <v-flex xs6>
                <v-pagination
                        v-model="currentPage"
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
        props: {
            total: { type: Number, default: 1 },
        },
        data: () => {
            return {
                currentPage: 1
            }
        },
        computed: {
            count: function () {
                return this.$store.getters.count
            },
        },
        watch: {
            currentPage (page, prevPage) {
                this.$store.commit('page', {type: 'page', value: page});
                this.$emit('paginationChange', page);
            }
        }

    }
</script>

<style scoped>

</style>
