<template>
  <v-layout row wrap>
    <v-flex xs12>
      <InfoRoom></InfoRoom>
    </v-flex>
  </v-layout>
</template>

<script>
import Room from '@/components/Room/Room.vue'
export default {
  name: 'Room-View',
  components: {
    'InfoRoom': Room,
  },
  data: () => {
    return {
    }
  }
}
</script>

<style scoped>

</style>
