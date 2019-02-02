<template>
    <div class="content_inner">
        <v-layout row wrap >
            <v-flex xs12 class="space-for-login">
                <Login v-if="route === ('/login')"></Login>
                <Register v-if="route === ('/register')"></Register>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Login from './Login'
    import Register from './Register'
    export default {
        name: "Login-Index",
        components: {
            Login,
            Register
        },
        computed: {
            route: function () {
                return this.$route.fullPath;
            }
        },
    }
</script>

<style scoped>
    .space-for-login {
        min-height: 100vh;
    }
</style>
