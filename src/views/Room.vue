<template>
  <div class="content_wrapper">
    <div class="content">
      <InfoRoom></InfoRoom>
    </div>
  </div>
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
