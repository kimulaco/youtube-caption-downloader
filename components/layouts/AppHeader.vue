<template>
  <header class="app-header">
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="inner container">
        <h1 class="navbar-brand">
          <router-link
            class="navbar-item"
            to="/"
          >YouTube Caption Downloader</router-link>
        </h1>
      </div>
    </nav>
  </header><!-- /.app-header -->
</template>

<script>
export default {
  name: 'AppHeader',
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
