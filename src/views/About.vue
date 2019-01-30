<template>
  <div class="About">
    <div class="content_wrapper">
      <div class="content">
        <About></About>
      </div>
    </div>

  </div>
</template>

<script>
  import About from '@/components/About'
  export default {
    name: 'About-View',
    components: {
      About
    },
    data: () => {
      return {
      }
    }
  }
</script>
