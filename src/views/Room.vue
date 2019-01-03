<template>
  <v-layout row wrap>
    <v-flex xs12>
      <Header></Header>
      <InfoRoom></InfoRoom>
      <Footer></Footer>
    </v-flex>
  </v-layout>
</template>

<script>
import Header from '@/components/Header.vue'
import Room from '@/components/Room/Room.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Room',
  components: {
    Header,
    'InfoRoom': Room,
    Footer
  },
  data: () => {
    return {
    }
  }
}
</script>

<style scoped>

</style>
