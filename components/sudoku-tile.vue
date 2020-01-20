<template>
  <td class="tile" :style="tileStyle" @click="select">
    <div
      class="tile__value"
      v-if="!(tileData.solution == 0 && tileData.guess == 0)"
    >{{getTileDisplay(tileData)}}</div>
    <div class="tile__hint-container" v-else>
      <div
        class="tile__hint"
        v-for="(number, index) in tileData.potentialSolutions"
        :key="index"
      >{{number}}</div>
    </div>
  </td>
</template>

<script>
export default {
  props: ["tileData"],
  data() {
    return {};
  },
  methods: {
    select(event) {
      this.$emit("select", {
        x: this.tileData.xpos,
        y: this.tileData.ypos,
        element: this.$el
      });
    },
    getTileDisplay(tileData) {
      if (tileData.solution !== 0) {
        return tileData.solution;
      } else if (tileData.guess !== 0) {
        return tileData.guess;
      }
    }
  },
  mounted() {},
  computed: {
    tileStyle() {
      if (this.tileData.solution) {
        return {
          fontWeight: "bold",
          background: "lightgray"
        };
      }
    }
  }
};
</script>
<style lang="scss">
.tile {
  position: relative;
  border: solid thin black;
  height: 50px;
  width: 50px;
  padding: 0;
  text-align: center;

  &__hint-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    line-height: 0;

    .tile__hint {
      width: 33.3333%;
      height: 33.3333%;
      display: inline-block;
      color: #aaa;
      font-size: 10px;
      line-height: 15px;
    }
  }

  &__value {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 50px;
  }

  &.selected {
    background: green;
  }
}
</style>