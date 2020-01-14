<template>
  <table class="sudoku" v-if="$sudokuManager.grid">
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <tbody class="sudoku__row" v-for="boxIndex in squirt" :key="boxIndex">
      <tr v-for="tileRowIndex in squirt" :key="tileRowIndex">
        <sudoku-tile
          @select="setSelected"
          v-for="x in $sudokuManager.grid.length"
          :key="x"
          :x="x - 1"
          :y="((boxIndex - 1) * squirt) + (tileRowIndex -1)"
          :value="$sudokuManager.grid[x - 1][((boxIndex - 1) * squirt) + (tileRowIndex -1)]"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import SudokuTile from "./sudoku-tile.vue";

export default {
  components: {
    SudokuTile
  },
  props: ["grid"],
  data() {
    return {
      selected: null,
      squirt: Math.sqrt(this.$sudokuManager.grid.length)
    };
  },
  computed: {},
  mounted() {
    this.$sudokuManager.grid = this.grid;
    this.$forceUpdate();

    document.addEventListener("keydown", event => {
      const key = event.key;
      if (parseInt(key) && this.selected) {
        this.$sudokuManager.grid[this.selected.x][this.selected.y] = key;
        this.$forceUpdate();

        this.selected.element.classList.remove("selected");
        this.selected = null;
      }
    });
  },
  methods: {
    setSelected(payload) {
      if (this.selected) {
        this.selected.element.classList.remove("selected");
      }
      this.selected = payload;
      this.selected.element.classList.add("selected");
    }
  }
};
</script>

<style lang="scss">
table {
  border-collapse: collapse;
  font-family: Calibri, sans-serif;
}
colgroup,
tbody {
  border: solid medium;
}
</style>