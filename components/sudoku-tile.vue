<template>
  <td class="sudoku__tile" :style="tileStyle" @click="select">{{value == 0 ? '' : value}}</td>
</template>

<script>
export default {
  props: ["x", "y", "value", "solution"],
  data() {
    return {
      
    };
  },
  methods: {
    select(event) {
      this.$emit("select", { x: this.x, y: this.y, element: this.$el });
    }
  },
  mounted() {
    if (this.value != 0) {
      this.solution = value;
    }
  },
  computed: {
    tileStyle() {
      if (this.solution) {
        return {
          fontWeight: "bold"
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