<template>
  <footer class="x-pad-single">
    <div class="inner-footer mw-full flex-space-between">
      <socials
        v-if="data"
        :socialLinks="data.socials"
      />
      <button 
        class="h6" 
        @click="openEnews"
      >
        <span>Subscribe</span>
      </button>
    </div>
  </footer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Socials from './Socials'
export default {
  name: "Footer",
  components: {
    Socials
  },
  computed: {
    ...mapState({
      data: 'api'
    })
  },
  methods: {
    ...mapMutations({
      openEnews: 'setEnews'
    })
  }
}
</script>

<style>
  footer {
    width: 100%;
    position: relative;
    z-index: 1000;
    height: var(--footer-height);
  }
  @media(--lg) {
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>