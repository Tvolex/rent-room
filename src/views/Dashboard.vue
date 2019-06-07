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
            Announcements: Dashboard.components.Announcements,
            Users: Dashboard.components.Users,
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
