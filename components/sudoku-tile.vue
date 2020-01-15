<template>
  <td class="sudoku__tile" :style="tileStyle" @click="select">{{getTileDisplay(tileData)}}</td>
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
td.sudoku__tile {
  border: solid thin black;
  height: 50px;
  width: 50px;
  text-align: center;
  padding: 0;

  .value {
    margin: auto;
    display: block;
  }

  &.selected {
    background: green;
  }
}
</style>