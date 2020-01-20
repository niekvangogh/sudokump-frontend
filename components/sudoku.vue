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
    var onkeydown = ev => {
      var key;
      var isShift;
      if (window.event) {
        key = window.event.keyCode;
        isShift = !!window.event.shiftKey;
      } else {
        key = ev.which;
        isShift = !!ev.shiftKey;
      }

      let keyChar = String.fromCharCode(key);

      if (this.selected && (parseInt(keyChar) || keyChar == 0)) {
        keyChar = parseInt(keyChar);

        const point = this.grid[this.selected.x][this.selected.y];

        const payload = {
          x: this.selected.x,
          y: this.selected.y,
          newValue: keyChar
        };

        if (isShift) {
          switch (key) {
            case 16: // ignore shift key
              break;
            default:
              var solutions = point.potentialSolutions;
              if (!solutions.includes(keyChar)) {
                solutions.push(keyChar);
                this.$emit("addPotentialTile", payload);
              } else {
                solutions.splice(solutions.indexOf(keyChar), 1);
                this.$emit("removePotentialTile", payload);
              }
          }
        } else {
          point.guess = keyChar;
          point.solutions = [];
          this.$emit("updateGuess", payload);

          this.selected.element.classList.remove("selected");
          this.selected = null;
        }
      }
    };
      document.addEventListener("keydown", onkeydown);
    
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