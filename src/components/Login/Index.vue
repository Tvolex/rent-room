<template>
    <v-layout row wrap>
        <v-flex xs12>
            <Header></Header>
            <Login v-if="route === ('/login')"></Login>
            <Register v-if="route === ('/register')"></Register>
            <Footer></Footer>
        </v-flex>
    </v-layout>
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

</style>
