<template>
  <div class="home">
    <Board/>
  </div>
</template>

<script>
import Board from '@/components/Board/Board.vue'

export default {
  name: 'Home-View',
  components: {
    Board,
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
