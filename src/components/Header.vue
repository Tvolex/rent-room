<template>
  <v-flex xs12>
    <v-toolbar >
      <v-layout row wrap>
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
        <v-btn flat @click="$router.push('/')">Home</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat @click="$router.push('/login')" class="hidden-xs-only">Login</v-btn>
        <v-btn flat @click="$router.push('/')" class="hidden-xs-only">Home</v-btn>
        <v-btn flat @click="$router.push('/test')" class="hidden-xs-only">Test</v-btn>
      </v-layout>
    </v-toolbar>
    <v-navigation-drawer
      v-model="sidebar"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
export default {
  name: 'Header',
  data: () => {
    return {
      sidebar: false
    }
  }
}
</script>

<style scoped>

</style>
