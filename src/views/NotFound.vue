<template>
  <div class="notFound">
    <Header></Header>
    <div>Not found</div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'NotFound',
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
