<template>
    <div class="login">
        <Header></Header>
        <Login></Login>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Login from '@/components/Login/Index.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: "Login-View",
        components: {
            Header,
            Login,
            Footer,
        }
    }
</script>

<style scoped>

</style>
