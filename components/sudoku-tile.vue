<template>
  <div class="sudoku__tile" @click="select">{{value}}</div>
</template>

<script>
export default {
  props: ["solution", "x", "y", "value"],
  data() {
    return {};
  },
  methods: {
    select(event) {
      this.$emit("select", { x: this.x, y: this.y, element: this.$el });
    }
  }
};
</script>
<style lang="scss">
div.sudoku__tile {
  height: 50px;
  width: 50px;
  border: 1px solid black;
  border-collapse: collapse;

  display: flex;
  justify-content: center;
  align-items: center;

  .value {
    margin: auto;
    display: block;
  }

  &.selected {
    background: green;
  }
}
</style>