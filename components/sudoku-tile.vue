<template>
  <td class="sudoku__tile" @click="select">{{value == 0 ? '' : value}}</td>
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
td.sudoku__tile {
  border: solid thin;
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