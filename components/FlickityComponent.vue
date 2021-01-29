<template>
  <div class="project-insert-wrapper photo-slider">
    <client-only>
      <flickity
        ref="flickity" 
        :options="flickityOptions" 
      >
        <div 
          v-for="item in images" 
          :key="item.id"
          class="slider-image"
        >
          <div class="slider-image-sizer">
            <img class="fit-contain bezier-300" :src="item">
          </div>
        </div>
      </flickity>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "FlickityComponent",
  props: {
    images: {
      type: Array
    }
  },
  data () {
    return {
      flickityOptions: {
        initialIndex: 3,
        draggable: false,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true
      }
    }
  }
}
</script>

<style lang="css">
  .slider-image {
    width: 100vw;
    height: calc(100vh - (var(--header-height) + var(--footer-height)) - 3rem);
    overflow: hidden;
    position: relative;
    padding-bottom: 3rem;
  }
  .slider-image-sizer {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .flickity-prev-next-button {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    text-decoration: none;
    text-align: center;
    top: 50%!important;
    background: transparent;
  }
  .flickity-prev-next-button.previous {
    left: var(--pad-single);
  }
  .flickity-prev-next-button.next {
    right: var(--pad-single);
  }
  @media (hover: hover) {
    .flickity-prev-next-button:hover {
      background-color: transparent;
      color: red;
    }
  }
</style>