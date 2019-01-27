<template>
    <div class="elevation-3 pagination">
        <v-layout align-center justify-center row fill-height class="elevation-5">
            <v-flex xs6>
                <plainPagination
                        v-model="page"
                        :classes="pagination_classes"
                        :labels="detectIsMobile ? paginationLabelsMobile : paginationLabelsDesktop"
                        :page-count="Math.ceil(total/count)"

                ></plainPagination>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import plainPagination from 'vue-plain-pagination'

    export default {
        name: 'Pagination',
        components: { plainPagination },
        data: () => {
            return {
                pagination_classes: {
                    ul: 'pagination_list',
                    li: 'pagination_item',
                    liActive: 'pagination_link_active',
                    liDisable: 'pagination_link_disable',
                    button: 'pagination_link'
                },
                paginationLabelsDesktop: {
                    first: 'First',
                    prev: 'Previous',
                    next: 'Next',
                    last: 'Last'
                },
                paginationLabelsMobile: {
                    first: '&laquo;',
                    prev: '&lsaquo;',
                    next: '&rsaquo;',
                    last: '&raquo;'
                }
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

<style >
    .pagination_list {
        padding: 15px 30px ;
    }


</style>
