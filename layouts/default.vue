<template>
  <fragment>
    <client-only>
      <portal-target 
        name="intro"
        transition="fade"
      />
      <portal-target
        name="modal"
        transition="fade"
      />
      <intro-popup/>
      <main-menu/>
      <mc-subscribe/>
    </client-only>
    <app-header/>
    <main class="page-wrapper">
      <nuxt />
    </main>
    <app-footer />
    <canvas-bg/>
  </fragment>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import MainMenu from '@/components/MainMenu'
import CanvasBg from '@/components/CanvasBg'
import IntroPopup from '@/components/IntroPopup'
import McSubscribe from '@/components/McSubscribe'

export default {
  components: {
    AppHeader,
    AppFooter,
    MainMenu,
    CanvasBg,
    IntroPopup,
    McSubscribe
  },
  computed: {
    ...mapGetters({
      breakpoint: 'screen/breakpoint'
    })
  },
  created () {
    if(process.env.TARGET === 'server') { this.getData() }
    this.debouncedResize = debounce(this.resize, 50)
  },
  mounted () {
    this.setTouch()
    this.setScreenSize()
    window.addEventListener('resize', this.debouncedResize, { passive: true })
    window.addEventListener('scroll', this.scroll, { passive: true })
    window.addEventListener('mousemove', this.mouseMove, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debouncedResize, { passive: true })
    window.removeEventListener('mousemove', this.mouseMove, { passive: true })
    window.removeEventListener('mousemove', this.mouseMove, { passive: true })
  },
  methods: {
    /*
    async lambdaTest() {
      try {
        const res = await this.$axios.$get('/.netlify/functions/hello')
        console.log('NETLIFY FUNCTION::', res)
      } catch (e) {
        console.log('NETLIFY FUNCTION::', e.response)
      }
    },
    */
    async resize() {
      const size = await this.setScreenSize()
      this.$nextTick(() => this.$bus.$emit('resize', size))
    },
    async mouseMove({ clientX = 0, clientY = 0 }) {
      await this.setMousePos({ x: clientX, y: clientY })
      this.$bus.$emit('mousemove', { x: clientX, y: clientY })
    },
    scroll() {
      const pos = window.scrollY || document.documentElement.scrollTop
      this.setScroll(pos)
      this.$bus.$emit('scroll', pos)
    },
    ...mapActions({
      getData: 'getData',
      setTouch: 'screen/setTouch',
      setScreenSize: 'screen/setScreenSize'
    }),
    ...mapMutations({
      setScroll: 'screen/setScroll',
      setMousePos: 'screen/setMousePos'
    })
  }
}
</script>

<style lang="css">
  main {
    position: relative;
    z-index: 10;
  }
</style>