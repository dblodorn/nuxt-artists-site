<template>
  <portal
    v-if="menuState"
    to="modal"
  >
    <viewport-wrapper
      :zIndex="10000"
      class='popup-wrapper'
      v-scroll-lock="menuState"
    >
      <div class="main-menu">
        <div class="main-menu-inner flex-centered">
          <div class="close-wrapper x-pad-single flex-center-vert">
            <button class="h2 close-button-menu" @click="closeMenu">
              <span>CLOSE</span>
            </button>
          </div>
          <nav class="flex-column text-align-center big-size font-a uppercase line-height-med">
            <n-link 
              class="black link"
              :to="`/`"
              @click.native="closeMenu"
            >
              <span>Home</span>
            </n-link>
            <n-link 
              class="black link"
              v-for="item of navigation"
              :key="item.slug"
              :to="`/${item.slug}`"
              @click.native="closeMenu"
            >
              <span>{{item.name}}</span>
            </n-link>
          </nav>
        </div>
      </div>
    </viewport-wrapper>
  </portal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MainMenu',
  computed: {
    navigation() {
      let navItems = []
      this.$global.nav.forEach(item => {
        navItems.push({
          slug: this.$stringToSlug(item),
          name: item
        })
      });
      return navItems
    },
    ...mapState({
      menuState: 'menuState'
    })
  },
  methods: {
    ...mapMutations({
      closeMenu: 'setMenu'
    })
  }
}
</script>

<style scoped>
  .main-menu {
    display: block;
    width: 100vw;
    height: 100vh;
    background: var(--white);
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
  }
  .main-menu-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
