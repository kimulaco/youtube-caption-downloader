<template>
  <div>
    <app-header />

    <section class="main-content columns">
      <aside class="column is-2 section">
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
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
