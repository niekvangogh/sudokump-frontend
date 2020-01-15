<template>
  <div>
    <div v-if="!connected">
      <span>Connecting to game servers</span>
    </div>
    <div v-else>
      <h3>You are currently in queue for a sudoku game</h3>
      <span v-if="!gameDetails">Finding game</span>
      <span v-else>GAME FOUND, WARPING IN 5 seconds</span>
    </div>
  </div>
</template>

<script>
import socketMixin from "../../components/mixins/socket.mixin";

export default {
  mixins: [socketMixin],
  data() {
    return {
      connected: false,
      queueType: this.$route.params.type,
      gameDetails: null,
      stompClient: null
    };
  },
  components: {},
  methods: {
    // queue(gameType) {
    //   if (this.stompClient && this.stompClient.connected) {
    //     const msg = { gameType };
    //     this.stompClient.send("/app/game/queue/start", {}, JSON.stringify(msg));
    //   }
    // }
  },
  mounted() {
    this.connect(stompClient => {
      this.connected = true;

      stompClient.subscribe("/user/game/queue/status", tick => {
        const gameDetails = JSON.parse(tick.body);
        this.gameDetails = gameDetails;
        setTimeout(() => {
          this.$router.push({
            name: "game-play-gameId",
            params: {
              gameId: this.gameDetails.gameId,
              stomp: stompClient
            }
          });
        }, 5000);
      });

      setTimeout(() => {
        var gameType = "quickplay";
        const msg = { gameType };
        this.stompClient.send("/app/game/queue/start", {}, JSON.stringify(msg));
      }, 1500);
    });
  }
};
</script>

<style>
</style>