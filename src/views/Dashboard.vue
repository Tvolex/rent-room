<template>
    <div class="Dashboard" v-if="user">
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
            Admin: Dashboard.components.Admin,
        },

        data: () => {
            return {
            }
        },
        computed: {
            user: function () {
                return this.$store.getters.user;
            }
        }
    }
</script>
