<template>
  <div class="downloader">
    <section class="downloader__section">
      <h2 class="downloader__heading">
        <label class="downloader__heading-inner" for="form-url">URL</label>
      </h2><!-- /.downloader__heading -->

      <input
        type="text"
        id="form-url"
        class="downloader__input"
        placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
        v-model="url"
      >
    </section><!-- /.downloader__section -->

    <transition name="downloader__animation--slide">
      <section class="downloader__section" v-if="hasCapture">
        <h2 class="downloader__heading">
          <label class="downloader__heading-inner" for="form-lang">Language</label>
        </h2><!-- /.downloader__heading -->

        <div class="downloader__lang">
          <select
            id="form-lang"
            class="downloader__lang-select"
            v-model="selectedLangCode"
          >
            <option
              v-for="lang in langs"
              :key="lang.code"
              v-bind:value="lang.code"
            >{{lang.label}}</option>
          </select>
        </div><!-- /.form-select -->

        <textarea
          class="downloader__textarea"
          v-html="caption"
        ></textarea>

        <p class="downloader__button">
          <a class="downloader__button-anchor" v-bind:href="downloadUrl" v-bind:download="videoId + '.txt'">Download</a>
        </p><!-- /.downloader__button -->
      </section><!-- /.downloader__section -->
    </transition>

    <transition name="downloader__animation--slide">
      <section class="downloader__section" v-if="noCapture">
        <p><small>No caption.</small></p>
      </section><!-- /.downloader__section -->
    </transition>
  </div>
</template>

<script>
const domParser = new DOMParser();

export default {
  name: 'Downloader',
  data () {
    return {
      apiUrl: 'https://video.google.com/timedtext?',
      url: '',
      videoId: '',
      langs: [],
      selectedLang: {},
      selectedLangCode: '',
      caption: ''
    };
  },
  computed: {
    'noCapture': function () {
      if (
        this.url &&
        this.langs.length <= 0
      ) {
        return true;
      }

      return false;
    },
    'hasCapture': function () {
      return this.langs.length > 0;
    },
    'endpointLang': function () {
      return `${this.apiUrl}type=list&v=${this.videoId}`;
    },
    'endpointCaption': function () {
      return `${this.apiUrl}name=${this.selectedLang.name}&hl=${this.selectedLang.code}&lang=${this.selectedLang.code}&v=${this.videoId}`;
    },
    'downloadUrl': function () {
      return `data:application/octet-stream,${encodeURIComponent(this.caption)}`;
    }
  },
  watch: {
    'url': function () {
      this.getCaptionByUrl(this.url);
    },
    'selectedLangCode': function () {
      let idx = 0;
      let leng = this.langs.length;
      let lang = {};

      for (idx; idx < leng; idx++) {
        lang = this.langs[idx];

        if (lang.code === this.selectedLangCode) {
          this.selectedLang = lang;

          this.updateCaption();

          return;
        }
      }
    }
  },
  methods: {
    getCaptionByUrl: function (url) {
      this.videoId = this.getVideoIdByUrl(this.url);

      if (!this.videoId) {
        this.clearCaption();

        return;
      }

      localStorage.setItem('url', this.url);

      fetch(this.endpointLang).then((response) => {
        return response.text();
      }).then((xmlSource) => {
        let xmlDoc = domParser.parseFromString(xmlSource, 'application/xml');
        let track = xmlDoc.getElementsByTagName('track');

        if (track.length <= 0) {
          throw new Error('NO track');
        }

        this.langs = this.getLangByTrack(track);
      }).catch((error) => {
        this.clearCaption();
      });
    },
    clearCaption: function () {
      this.videoId = '';
      this.langs = [];
    },
    getVideoIdByUrl: function (url) {
      let videoIdMatch = url.match(/v=(.*?)(&|$)/);

      if (
        !videoIdMatch ||
        videoIdMatch.length <= 0 ||
        url.indexOf('https://www.youtube.com') < 0
      ) {
        return '';
      }

      return videoIdMatch[1];
    },
    getLangByTrack: function (track) {
      let idx = 0;
      let leng = track.length;
      let langs = [];

      for (idx; idx < leng; idx++) {
        let selfLang = track[idx];
        let isDefault = selfLang.getAttribute('lang_default') === 'true';
        let selfLangData = {
          name: selfLang.getAttribute('name') || '',
          label: selfLang.getAttribute('lang_original') || '',
          code: selfLang.getAttribute('lang_code') || '',
          default: isDefault
        };

        if (isDefault) {
          this.selectedLangCode = selfLangData.code;
          this.selectedLang = selfLangData;
        }

        langs.push(selfLangData);
      }

      this.updateCaption();

      return langs;
    },
    updateCaption: function () {
      fetch(this.endpointCaption).then((response) => {
        return response.text();
      }).then((xmlSource) => {
        let xmlDoc = domParser.parseFromString(xmlSource, 'application/xml');
        let text = xmlDoc.getElementsByTagName('text');
        let idx = 0;
        let leng = text.length;
        let caption = '';

        for (idx; idx < leng; idx++) {
          caption += text[idx].textContent + '\n';
        }

        this.caption = caption;
      }).catch(function (error) {
        this.caption = '';
      });
    }
  },
  created: function () {
    this.url = localStorage.getItem('url');
  }
};
</script>

<style scoped lang="scss">
@import "../sass/define/_mixin.scss";
@import "../sass/components/_downloader.scss";
</style>
