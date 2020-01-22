<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h2>You are currently playing against 1 opponent</h2>
        <div class="d-flex justify-content-center mt-5">
          <sudoku v-if="grid" :grid="grid" @updateTile="updateTile" />
        </div>
      </b-col>
      <b-col cols="3">
        <h5>Players in the game:</h5>
        <b-list-group>
          <b-list-group-item
            v-for="player in players"
            :key="player.id"
            :to="{ name: 'player-id', params: {id: player.id }}"
          >{{player.username}} - {{player.rating}}</b-list-group-item>
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
    updateTile(payload) {
      this.$socketManager.stompClient.send(
        "/app/game/sudoku/updateTile",
        JSON.stringify({
          x: payload.x,
          y: payload.y,
          number: payload.newValue,
          method: payload.method
        }),
        {}
      );
    },
    setReady() {
      this.$socketManager.stompClient.subscribe(
        "/user/game/sudoku/start",
        tick => {
          let response = JSON.parse(tick.body);
          if (response.ready) {
            this.players = response.players;
            setTimeout(() => {
              this.requestSudoku();
            }, 1000);
          }
        }
      );

      this.$socketManager.stompClient.subscribe(
        "/user/game/sudoku/update",
        tick => {
          let response = JSON.parse(tick.body);
          switch (response.event) {
            case "playerwin":
              alert(`${response.winner.username} has won the game!`)
              break;
            case "playerdisconnect":
              alert(`${response.disconnectedUser.username} has disconnected`)
              break;
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