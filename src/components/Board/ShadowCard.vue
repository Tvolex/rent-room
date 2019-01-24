<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md4
                v-for="shadow in count"
                :key="shadow">
            <v-hover>
                <v-card class="card-shadow" slot-scope="{ hover }" >
                    <vue-content-loading :width="350" :height="350">
                        <rect x="0" y="0" rx="10" ry="10" width="350" height="200" />
                        <rect x="10" y="220" rx="10" ry="10" width="250" height="20" />
                        <rect x="10" y="250" rx="10" ry="10" width="150" height="15" />

                        <rect x="10" y="300" rx="10" ry="10" width="80" height="35" />
                        <rect x="150" y="300" rx="10" ry="10" width="130" height="35" />
                    </vue-content-loading>
                </v-card>
            </v-hover>
        </v-flex>
    </v-layout>
</template>

<script>
    import VueContentLoading from 'vue-content-loading'
    export default {
        name: "ShadowCard",
        components: {
            VueContentLoading,
        },
        computed: {
            count: function () {
                return this.$store.getters.count > 9 ? 9 : this.$store.getters.count;
            }
        }
    }
</script>

<style scoped>
    .card-shadow {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }
</style>
