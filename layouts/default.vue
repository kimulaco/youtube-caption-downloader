<template>
  <div>
    <app-header />

    <main class="container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader'

export default {
  name: 'Layout',
  components: {
    AppHeader
  },
  data() {
    return {
      items: [
        {
          title: 'Downloader',
          icon: 'home',
          to: '/'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
