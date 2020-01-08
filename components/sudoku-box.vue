<template>
  <div class="sudoku__box" v-if="squirt">
    <div class="sudoku__row" v-for="rowIndex in squirt" :key="rowIndex">
      <sudoku-tile
        v-for="tileIndex in squirt"
        :key="tileIndex"
        :x="boxX + tileIndex"
        :y="boxY + rowIndex"
      />
    </div>
  </div>
</template>

<script>
import SudokuTile from "./sudoku-tile.vue";

export default {
  components: {
    SudokuTile
  },
  data() {
    return {
      squirt: Math.sqrt(this.size)
    };
  },
  props: ["size", "boxX", "boxY"]
};
</script>

<style lang="scss">
.sudoku__box {
  float: left;
}
</style>