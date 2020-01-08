<template>
  <div class="sudoku" v-if="$sudokuManager.grid">
    <div class="sudoku__row" v-for="x in $sudokuManager.grid.length" :key="x">
      <div v-for="y in $sudokuManager.grid.length" :key="y">
        <sudoku-tile
          :x="x -1"
          :y="y -1"
          :value="$sudokuManager.grid[x - 1][y - 1]"
          @select="setSelected"
        />
      </div>
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
      selected: null
    };
  },
  computed: {},
  mounted() {
    document.addEventListener("keydown", event => {
      const key = event.key;
      if (parseInt(key)) {
        this.$sudokuManager.grid[this.selected.x][this.selected.y] = key;
        console.log("changing at", this.selected.x, this.selected.y)
        this.$forceUpdate();
      }
    });
  },
  methods: {
    setSelected(position) {
      this.selected = position;
      console.log(this.$sudokuManager);
    }
  }
};
</script>

<style lang="scss">
.sudoku {
  &__row {
    float: left;
  }
}
</style>