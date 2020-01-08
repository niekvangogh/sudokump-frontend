<template>
  <div class="sudoku">
    <div class="sudoku__row" v-for="rowIndex in squirt" :key="rowIndex">
      <sudoku-box
        v-for="boxIndex in squirt"
        :key="boxIndex"
        :size="size"
        :box-x="rowIndex"
        :box-y="boxIndex"
      />
    </div>
  </div>
</template>

<script>
import SudokuBox from "./sudoku-box.vue";

export default {
  components: {
    SudokuBox
  },
  data() {
    return {
      size: 9
    };
  },
  computed: {
    squirt() {
      return Math.sqrt(this.size);
    }
  },
  mounted() {
    window.addEventListener("keydown", function(e) {
      console.log(e.keyCode);
    });

    this.$sudokuManager.$on("activate", payload => {
      let x = payload.x;
      let y = payload.y;
    });
  }
};
</script>

<style lang="scss">
.sudoku {
  &__row {
    clear: both;
    float: left;
  }
}
</style>