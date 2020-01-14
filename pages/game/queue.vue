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
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { mapGetters } from "vuex";

export default {
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
    queue(gameType) {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { gameType };
        this.stompClient.send("/app/game/queue/start", {}, JSON.stringify(msg));
      }
    }
  },
  mounted() {
    const accessToken = this.$store.getters.accessToken;

    XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      this.origOpen.apply(this, arguments);
      this.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    };

    this.socket = new SockJS("http://localhost:8080/ws");

    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {
        Authorization: `Bearer ${accessToken}`
      },
      frame => {
        this.connected = true;

        this.stompClient.subscribe("/user/game/queue/status", tick => {
          this.gameDetails = JSON.parse(tick.body);

          setTimeout(() => {
            this.$router.push({
              name: "game-play-gameId",
              params: {
                gameId: this.gameDetails.gameId,
                stomp: this.stompClient
              }
            });
          }, 5000);
        });

        setTimeout(() => {
          this.queue("test");
        }, 1500);
      },
      error => {
        this.connected = false;
      }
    );
  }
};
</script>

<style>
</style>