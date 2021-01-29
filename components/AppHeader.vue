<template>
  <header class="x-pad-single">
    <transition name="fade">
      <div v-if="!enewsState" class="header-inner flex-center-vert">
        <n-link to="/" class="h2">
          <span>{{title}}</span>
        </n-link>
        <button class="h2" @click="openMenu">
          <span>MENU</span>
        </button>
      </div>
    </transition>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      title: process.env.APP_TITLE
    }
  },
  computed: {
    ...mapState({
      enewsState: 'enewsState'
    })
  },
  methods: {
    ...mapMutations({
      openMenu: 'setMenu'
    })
  }
}
</script>

<style>
  header {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    height: var(--header-height);
  }
  .header-inner {
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }
</style>
