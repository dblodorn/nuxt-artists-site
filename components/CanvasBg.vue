<template>
  <viewport-wrapper 
    class="canvas-wrapper"
    :zIndex="0"
  >
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <v-layer ref="layer">
        <v-star
          v-for="item in list"
          :key="item.id"
          :config="{
            x: item.x,
            y: item.y,
            rotation: item.rotation,
            id: item.id,
            numPoints: 10,
            innerRadius: 10,
            outerRadius: 150, fill: '#ff616b',
            opacity: 0.9,
            draggable: true,
            scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            shadowColor: '#33ff7d',
            shadowBlur: 120,
            shadowOffsetX: dragItemId === item.id ? 15 : 5,
            shadowOffsetY: dragItemId === item.id ? 15 : 5,
            shadowOpacity: 0.6
          }"
        ></v-star>
      </v-layer>
    </v-stage>
  </viewport-wrapper>
</template>

<script>
export default {
  name: "CanvasBg",
  data() {
    return {
      list: [],
      dragItemId: null
    };
  },
  computed: {
    configKonva() {
      return {
        width: this.$store.state.screen.width,
        height: this.$store.state.screen.height
      }
    }
  },
  methods: {
    handleDragstart(e) {
      // save drag element:
      this.dragItemId = e.target.id();
      // move current element to the top:
      const item = this.list.find(i => i.id === this.dragItemId);
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
      this.list.push(item);
    },
    handleDragend(e) {
      this.dragItemId = null;
    }
  },
  mounted() {
    this.$nextTick(() => {
      for (let n = 0; n < 30; n++) {
        this.list.push({
          id: Math.round(Math.random() * 10000).toString(),
          x: Math.random() * this.$store.state.screen.width,
          y: Math.random() * this.$store.state.screen.height,
          rotation: Math.random() * 180,
          scale: Math.random()
        });
      }
    })
  },
}
</script>

<style lang="css">
  .canvas-wrapper {
    background: #ebd999;
  }
</style>