<template>
  <menu class="flex-row flex-centered">
    <a 
      v-for="social in socialLinks"
      :key="social.url"
      :href="social.url"
      class="social-link bezier-300"
      target="_blank"
    >
      <inline-svg :src="social.icon" :alt="social.channel"/>
    </a>
  </menu>
</template>

<script>
export default {
  name: "Socials",
  props: {
    socialLinks: {
      type: Array
    }
  }
}
</script>

<style lang="css">
  :root {
    --social-link-size: 2rem;
  }
  .social-link {
    width: calc(var(--social-link-size) * 1.55);
    height: var(--social-link-size);
    margin: 0 1.25rem;
    will-change: transform;
  }
  .social-link svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .social-link * {
    fill: var(--black);
  }
  @media (hover: hover) {
    .social-link {
      transform: scale(0.9);
    }
    .social-link:hover {
      transform: scale(1);
    }
    .social-link:hover * {
      fill: var(--hover-color);
    }
  }
  @media (--lg) {
    :root {
      --social-link-size: 2.5rem;
    }
  }
</style>