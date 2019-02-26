const domParser = new DOMParser()

/**
 * getElementsByXml
 * @param {string} xml
 * @param {string} tagNeme
 * @return {HTMLAllCollection}
 */
function getElementsByXml(xml, tagNeme) {
  const xmlDoc = domParser.parseFromString(xml, 'application/xml')

  return xmlDoc.getElementsByTagName(tagNeme)
}

/**
 * getLangByTrack
 * @param {HTMLAllCollection} track
 * @return {array}
 */
function getLangByTrack(track) {
  const languages = []

  if (track.length <= 0) {
    return languages
  }

  for (let idx = 0; idx < track.length; idx++) {
    const selfLang = track[idx]
    const isDefault = selfLang.getAttribute('lang_default') === 'true'
    const selfLangData = {
      name: selfLang.getAttribute('name') || '',
      label: selfLang.getAttribute('lang_original') || '',
      code: selfLang.getAttribute('lang_code') || '',
      default: isDefault
    }

    languages.push(selfLangData)
  }

  return languages
}

/**
 * YoutubeCaption
 * @constructor
 */
class YoutubeCaption {
  constructor() {
    this.baseUrl = 'https://video.google.com/timedtext?'
  }

  /**
   * getLanguagesByUrl
   * @param {string} url
   * @return {Promise}
   */
  getLanguagesByUrl(url) {
    const videoId = this.getVideoIdByUrl(url)
    const endpointUrl = `${this.baseUrl}type=list&v=${videoId}`

    return fetch(endpointUrl).then((response) => {
      return response.text()
    }).then((xml) => {
      const track = getElementsByXml(xml, 'track')

      this.languages = getLangByTrack(track)

      return this.languages
    }).catch((error) => {
      this.languages = []

      return error
    })
  }

  /**
   * getVideoIdByUrl
   * @param {string} url
   * @return {string}
   */
  getVideoIdByUrl(url) {
    const videoIdMatch = url.match(/v=(.*?)(&|$)/)

    if (
      !videoIdMatch ||
      videoIdMatch.length <= 0 ||
      !url.includes('https://www.youtube.com')
    ) {
      return ''
    }

    return videoIdMatch[1]
  }

  /**
   * getCaption
   * @param {string} videoId
   * @param {string} languageName
   * @param {string} languageCode
   * @return {Promise}
   */
  getCaption(videoId, languageName, languageCode) {
    const endpointCaption = `${this.baseUrl || ''}name=${languageName || ''}` +
      `&hl=${languageName || ''}` +
      `&lang=${languageCode || ''}` +
      `&v=${videoId || ''}`

    return fetch(endpointCaption).then((response) => {
      return response.text()
    }).then((xml) => {
      const text = getElementsByXml(xml, 'text')
      let caption = ''

      for (let idx = 0; idx < text.length; idx++) {
        caption += text[idx].textContent + '\n'
      }

      return caption
    })
  }
}

export default new YoutubeCaption()
