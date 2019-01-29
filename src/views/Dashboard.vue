<template>
    <div class="Dashboard">
        <Dashboard></Dashboard>
    </div>
</template>

<script>
    import Dashboard from '@/components/Dashboard/Dashboard.vue'

    export default {
        name: 'Dashboard-View',
        components: {
            Dashboard,
            Statistics: Dashboard.components.Statistics,
            MyRooms: Dashboard.components.MyRooms,
        },
        data: () => {
            return {
            }
        }
    }
</script>
