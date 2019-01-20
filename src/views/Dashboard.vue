<template>
    <div class="Dashboard">
        <Header></Header>
        <div>Dashboard</div>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'Dashboard',
        components: {
            Header,
            Footer
        },
        data: () => {
            return {
            }
        }
    }
</script>
