<template>
  <div class="sudoku__tile">
    <span class="value" @click="setActive">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: ["solution", "x", "y"],
  data() {
    return {
      value: 0,
      edit: false
    };
  },
  methods: {
    setActive(event) {
      this.$sudokuManager.$emit("activate", { x: this.x, y: this.y });
    }
  }
};
</script>
<style lang="scss">
div.sudoku__tile {
  float: left;

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
}
</style>