<template>
    <div class="login">
        <Header></Header>
        <Register></Register>
        <Footer></Footer>
    </div>
</template>

<script>
    import Register from '@/components/Login/Register.vue'
    export default {
        name: "Register-View",
        components: {
            Register,
        }
    }
</script>

<style scoped>

</style>
