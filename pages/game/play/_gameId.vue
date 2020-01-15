<template>
  <div class="d-flex justify-content-center mt-5">
    <sudoku v-if="grid" :grid="grid" />
  </div>
</template>

<script>
import Sudoku from "../../../components/sudoku.vue";

export default {
  components: {
    Sudoku
  },
  data() {
    return {
      gameId: this.$route.params.gameId,
      grid: null
    };
  },
  mounted() {
    // if (
    //   this.$socketManager.stompClient &&
    //   this.$socketManager.stompClient.connected
    // ) {
    this.setReady();
    // } else {
    //   this.$socketManager.connect(stompClient => {
    //     this.setReady();
    //   });
    // }
  },
  methods: {
    setReady() {
      this.$socketManager.stompClient.subscribe(
        "/user/game/sudoku/start",
        tick => {
          let response = JSON.parse(tick.body);
          if (response.ready) {
            this.$api
              .get("/game/sudoku", { params: { gameId: this.gameId } })
              .then(response => {
                const data = response.data;
                
                var grid = [];
                data.forEach((rowData, rowIndex) => {
                  grid.push([]);

                  rowData.forEach((tileData, colIndex) => {
                    grid[tileData.xpos][tileData.ypos] = {
                      solution: tileData.solution,
                      guess: tileData.guess,
                      potentialSolutions: tileData.potentialSolutions,
                      xpos: tileData.xpos,
                      ypos: tileData.ypos
                    };
                  });
                });

                this.grid = grid;
              });
          }
        }
      );
      setTimeout(() => {
        this.$socketManager.stompClient.send(
          "/app/game/sudoku/ready",
          {},
          JSON.stringify({})
        );
      }, 500);
    }
  }
};
</script>
<style>
</style>