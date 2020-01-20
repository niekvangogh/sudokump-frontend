<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h2>You are currently playing against 3 opponents</h2>
        <div class="d-flex justify-content-center mt-5">
          <sudoku
            v-if="grid"
            :grid="grid"
            @updateGuess="updateGuess"
            @addPotentialTile="addPotentialTile"
            @removePotentialTile="removePotentialTile"
          />
        </div>
      </b-col>
      <b-col cols="3">
        <h5>Other players in the game:</h5>
        <b-list-group>
          <b-list-group-item
            v-for="player in players"
            :key="player.id"
            :to="{ name: 'player-id', params: {id: player.id }}"
          >{{player.username}} - {{player.ranking}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
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
      grid: null,
      players: []
    };
  },
  mounted() {
    if (
      this.$socketManager.stompClient &&
      this.$socketManager.stompClient.connected
    ) {
      this.setReady();
    } else {
      this.$socketManager.connect(stompClient => {
        this.setReady();
        this.requestSudoku();
      });
    }
  },
  methods: {
    updateGuess(payload) {
      this.$socketManager.stompClient.send(
        "/app/game/sudoku/setGuess",
        JSON.stringify({
          x: payload.x,
          y: payload.y,
          guess: payload.newValue
        }),
        {}
      );
    },
    addPotentialTile(payload) {
      this.$socketManager.stompClient.send(
        "/app/game/sudoku/addPotentialTile",
        JSON.stringify({
          x: payload.x,
          y: payload.y,
          guess: payload.newValue
        }),
        {}
      );
    },
    removePotentialTile(payload) {
      this.$socketManager.stompClient.send(
        "/app/game/sudoku/removePotentialTile",
        JSON.stringify({
          x: payload.x,
          y: payload.y,
          guess: payload.newValue
        }),
        {}
      );
    },
    setReady() {
      this.$socketManager.stompClient.subscribe(
        "/user/game/sudoku/start",
        tick => {
          let response = JSON.parse(tick.body);
          console.log(tick.body);
          if (response.ready) {
            this.requestSudoku();
            this.players = response.players;
          }
        }
      );
      setTimeout(() => {
        this.$socketManager.stompClient.send(
          "/app/game/sudoku/ready",
          {},
          JSON.stringify({})
        );
      }, 1000);
    },
    requestSudoku() {
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
};
</script>
<style>
</style>