<template>
  <div class="home">
    <Header></Header>
    <Board/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Board from '@/components/Board/Board.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home-View',
  components: {
    Header,
    Board,
    Footer
  },
  mounted () {
    console.log(process.env.BASE_URL)
  },
  data: () => {
    return {
    }
  }
}
</script>
