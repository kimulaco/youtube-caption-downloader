<template>
  <section class="section">
    <b-field label="Video URL">
      <b-input
        v-model="videoUrl"
        placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
        type="url"
      />
    </b-field>

    <template v-if="enabledCaption">
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

      <a
        class="button is-primary is-medium"
        @click="downloadCaption"
      >Download</a>
    </template>
  </section>
</template>

<script>
import youtubeCaption from '@/plugins/youtube-caption'

export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {
      videoUrl: '',
      languages: [],
      selectedLanguageCode: '',
      caption: ''
    }
  },
  computed: {
    videoId() {
      return youtubeCaption.getVideoIdByUrl(this.videoUrl)
    },
    enabledLanguages() {
      return this.languages.length > 0
    },
    enabledCaption() {
      return !!this.caption
    }
  },
  watch: {
    videoUrl(url) {
      youtubeCaption.getLanguagesByUrl(url).then((languages) => {
        this.languages = languages
      }).catch((error) => {
        this.languages = []
        this.selectedLanguageCode = ''

        console.error(error)
      })
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
  methods: {
    getLangudegeNamebyCode(languageCode) {
      let languageName = ''

      this.languages.forEach((language) => {
        if (language.code === languageCode) {
          languageName = language.name
        }
      })

      return languageName
    },
    downloadCaption() {
      console.log(this.caption)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
