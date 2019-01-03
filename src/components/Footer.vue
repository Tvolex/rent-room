<template>
  <div class="footer_wrapper">
    <div class="footer">
      <div class="logo">
        <a href="#" title="" class="logo_link">
          <img :src="`${base_url}image/logo-white.png`" alt="" class="logo_img">
        </a>
      </div>
      <ul class="footer_nav_list">
        <li class="footer_nav_item">
          <a href="#" title="" class="footer_nav_link">Home</a>
        </li>
        <li class="footer_nav_item">
          <a href="#" title="" class="footer_nav_link">Shop</a>
        </li>
        <li class="footer_nav_item">
          <a href="#" title="" class="footer_nav_link">Team</a>
        </li>
        <li class="footer_nav_item">
          <a href="#" title="" class="footer_nav_link">About ua</a>
        </li>
        <li class="footer_nav_item">
          <a href="#" title="" class="footer_nav_link">Contacts</a>
        </li>
      </ul>
      <ul class="social_list">
        <li class="social_item">
          <a href="#" title="" class="social_link icon-twitter"></a>
        </li>
        <li class="social_item">
          <a href="#" title="" class="social_link icon-facebook"></a>
        </li>
        <li class="social_item">
          <a href="#" title="" class="social_link icon-google"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer",
      data: () => {
          return {
            base_url: process.env.BASE_URL
          }
      }
    }
</script>

<style scoped>

</style>
