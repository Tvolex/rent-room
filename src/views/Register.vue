<template>
    <div class="login">
        <Header></Header>
        <Register></Register>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Register from '@/components/Login/Register.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: "Register-View",
        components: {
            Header,
            Register,
            Footer,
        }
    }
</script>

<style scoped>

</style>
