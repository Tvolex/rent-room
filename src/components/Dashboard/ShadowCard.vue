<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md4
                v-for="shadow in count"
                :key="shadow">
            <v-card hover class="card-shadow" >
                <vue-content-loading :width="300" :height="250">
                    <rect x="0" y="0" rx="10" ry="10" width="350" height="200" />
                    <rect x="10" y="220" rx="10" ry="10" width="250" height="20" />
                    <rect x="10" y="250" rx="10" ry="10" width="150" height="15" />

                    <rect x="10" y="300" rx="10" ry="10" width="80" height="35" />
                    <rect x="150" y="300" rx="10" ry="10" width="130" height="35" />
                </vue-content-loading>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    // TODO: format shadow card
    import VueContentLoading from 'vue-content-loading'
    export default {
        name: "ShadowCard",
        components: {
            VueContentLoading,
        },
        props: {
            count: {
                type: Number,
                default: 5,
            },
        },
    }
</script>

<style scoped>
    .card-shadow {
        margin: 0 0 20px 15px;
        border-radius: 10px;
    }
</style>
