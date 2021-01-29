<template>
  <portal
    v-if="introPopup"
    to="intro"
  >
    <viewport-wrapper
      :zIndex="10000"
      class='popup-wrapper'
      v-scroll-lock="introPopup"
    >
      <div v-if="content" class="intro-popup absolute-centered">
        <div class="intro-text-wrapper flex-centered">
          <div class="intro-inner pad-double">
            <button class="close-button" @click="closePopup">
              <close-icon/>
            </button>
            <div 
              v-if="content.intro_popup.popup_asset === 'image'" 
              class="intro-image-wrapper"
            >
              <load-image
                :src="content.intro_popup.popup_image"
                :fixedHeight="false"
              />
            </div>
            <div class="intro-text pad-single">
              <h1 class="h5 text-align-center">
                <span v-html="content.intro_popup.popup_headline"/>
              </h1>
              <menu class="cta-links">
                <a 
                  v-for="link of content.intro_popup.cta_links"
                  :key="link.link"
                  class="h6 cta-link font-b pad-single mw-full text-align-center y-pad-top" 
                  :href="link.link"
                  target="_blank"
                >
                  <span>{{link.cta}}</span>
                </a>
              </menu>
            </div>
          </div>
        </div>
      </div>
    </viewport-wrapper>
  </portal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'IntroPopup',
  computed: {
    ...mapState({
      content: 'api',
      introPopup: 'introPopup'
    })
  },
  methods: {
    ...mapMutations({
      closePopup: 'setIntroPopup'
    })
  }
}
</script>

<style>
.popup-wrapper {
  background-color: rgba(255,255,255,.85);
}
.intro-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 96rem;
}
.intro-text-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.intro-inner {
  width: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.intro-image-wrapper {
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 0;
}
.intro-image-wrapper img {
  width: 100%;
  height: auto;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>