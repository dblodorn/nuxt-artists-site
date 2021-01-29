<template>
  <section class="inner-page">
    <flickity-component
      :images="data.image_gallery"
    />
  </section>
</template>

<script>
import axios from 'axios'
import FlickityComponent from '@/components/FlickityComponent'

export default {
  asyncData () {
    return axios.get(`${process.env.CMS_URL}`)
      .then((res) => {
        return { data: res.data.options.photos_page }
      })
  },
  components: {
    FlickityComponent
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
