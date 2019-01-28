<template>
    <div class="Dashboard">
        <Header></Header>
        <Dashboard></Dashboard>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/Header.vue'
    import Dashboard from '@/components/Dashboard/Dashboard.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'Dashboard-View',
        components: {
            Header,
            Dashboard,
            Footer
        },
        data: () => {
            return {
            }
        }
    }
</script>
