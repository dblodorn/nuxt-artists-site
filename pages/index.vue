<template>
  <section class="pad-single y-pad-top inner-page">
    <raw-displayer :value="data"></raw-displayer>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData () {
    return axios.get(`${process.env.CMS_URL}`)
      .then((res) => {
        return { data: res.data.options.landing_page }
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

<style lang="css">
  .main-menu {
    z-index: 10;
    position: relative;
  }
</style>
