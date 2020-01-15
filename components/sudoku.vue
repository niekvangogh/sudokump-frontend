<template>
  <table class="sudoku" v-if="grid">
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
    <tbody class="sudoku__row" v-for="(boxRow, boxIndex) in squirt" :key="boxIndex">
      <tr v-for="(tileRow, tileRowIndex) in squirt" :key="tileRowIndex">
        <sudoku-tile
          @select="setSelected"
          v-for="(x, xIndex) in grid.length"
          :key="xIndex + ',' + (boxIndex * squirt) + tileRowIndex"
          :tileData="grid[xIndex][(boxIndex * squirt) + tileRowIndex]"
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
      selected: null
    };
  },
  computed: {},
  mounted() {
    document.addEventListener("keydown", event => {
      const key = event.key;
      if (parseInt(key) && this.selected) {
        this.grid[this.selected.x][this.selected.y].guess = key;

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
  },
  computed: {
    squirt() {
      return Math.sqrt(this.grid.length);
    }
  },
  watch: {
    grid: function(newValue) {
      console.log(newValue);

      this.$forceUpdate();
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