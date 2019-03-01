<template>
  <section class="section">
    <b-field label="Video URL">
      <b-input
        v-model="videoUrl"
        placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
        type="url"
        autofocus
      />
    </b-field>

    <template v-if="enabledCaption">
      <youtube-player
        :src="`http://www.youtube.com/embed/${videoId}`"
      />

      <b-field label="Language">
        <b-select
          v-model="selectedLanguageCode"
          placeholder="Select a language"
        >
          <option
            v-for="language in languages"
            :key="language.code"
            :value="language.code"
          >{{ language.label }}</option>
        </b-select>
      </b-field>

      <b-field label="Caption">
        <b-input
          v-model="caption"
          type="textarea"
        />
      </b-field>

      <button
        class="button is-primary is-medium"
        @click="copyCaption"
      >Copy to clipboard</button>

      <b-notification
        :active="notification.success"
        type="is-success"
      >Copied to clipboard.</b-notification>

      <b-notification
        :active="notification.failed"
        type="is-danger"
      >Copy failed.</b-notification>
    </template>
  </section>
</template>

<script>
import youtubeCaption from '@/plugins/youtube-caption'
import copyText from '@/plugins/copyText'
import YoutubePlayer from '@/components/modules/YoutubePlayer'

export default {
  name: 'PageIndex',
  components: {
    YoutubePlayer
  },
  data() {
    return {
      languages: [],
      selectedLanguageCode: '',
      caption: '',
      notification: {
        success: false,
        failed: false
      }
    }
  },
  computed: {
    videoUrl: {
      get() { return this.$store.state.videoUrl },
      set(url) { this.$store.commit('setVideoUrl', url) }
    },
    videoId() { return youtubeCaption.getVideoIdByUrl(this.videoUrl) },
    enabledLanguages() { return this.languages.length > 0 },
    enabledCaption() { return !!this.caption }
  },
  watch: {
    videoUrl(url) {
      this.updateVideoUrl(url)
    },
    selectedLanguageCode(languageCode) {
      const languageName = this.getLangudegeNamebyCode(languageCode)

      youtubeCaption.getCaption(
        this.videoId,
        languageName,
        languageCode
      ).then((caption) => {
        this.caption = caption
      }).catch((error) => {
        this.caption = ''

        console.error(error)
      })
    },
    languages: {
      deep: true,
      handler(languages) {
        this.selectedLanguageCode = ''

        languages.forEach((language) => {
          if (language.default) {
            this.selectedLanguageCode = language.code
          }
        })
      }
    }
  },
  created() {
    this.updateVideoUrl(this.videoUrl)
  },
  methods: {
    updateVideoUrl(url) {
      youtubeCaption.getLanguagesByUrl(url).then((languages) => {
        this.languages = languages
      }).catch((error) => {
        this.languages = []
        this.selectedLanguageCode = ''

        console.error(error)
      })
    },
    getLangudegeNamebyCode(languageCode) {
      let languageName = ''

      this.languages.forEach((language) => {
        if (language.code === languageCode) {
          languageName = language.name
        }
      })

      return languageName
    },
    showNotification(key, time) {
      this.notification[key] = true

      setTimeout(() => {
        this.notification[key] = false
      }, time || 3000)
    },
    copyCaption() {
      if (copyText(this.caption)) {
        this.showNotification('success')
      } else {
        this.showNotification('failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button,
.youtube {
  margin-bottom: 1.5rem;
}
</style>
