<template>
  <section class="pad-single y-pad-top inner-page">
    <div v-if="data.use_playlist" class="spotify-player mw-med center z-100">
      <iframe :src="data.spotify_playlist" frameborder="0" allowtransparency="true"></iframe>
    </div>
    <div v-if="data.use_music_link" class="stream-wrapper mw-sm center">
      <a
        :href="data.music_link_smart_url"
        target="_blank"
        class="lozenge-button"
      >
        <span v-html="data.music_link_cta"/>
      </a>
    </div>
    <raw-displayer :value="data"></raw-displayer>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData () {
    return axios.get(`${process.env.CMS_URL}`)
      .then((res) => {
        return { data: res.data.options.music_page }
      })
  },
  head () {
    return {
      title: `${this.data.page_title} | ${process.env.APP_TITLE}`,
      meta: [
        { hid: 'description', name: 'description', content: this.data.page_description },
        { hid: 'image', name: 'image', content: this.data.social_image },
      ]
    }
  }
}
</script>
