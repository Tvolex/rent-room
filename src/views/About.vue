<template>
  <div class="About">
    <Header></Header>
    <div>About page</div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
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
