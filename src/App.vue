<template>
  <main id="app" class="app">
    <div class="app__inner">
      <h1 class="heading-01">
        <span class="heading-01__inner">Youtube Caption Downloader</span>
      </h1><!-- /.heading-01 -->

      <router-view></router-view>
    </div><!-- /.app__inner -->
  </main><!-- /.app -->
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import 'normalize.css';
@import './sass/app.scss';
</style>
