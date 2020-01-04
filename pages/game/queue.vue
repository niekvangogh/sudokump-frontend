<template>
  <div>
    <div v-if="!connected">
      <span>Connecting to game servers</span>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  data() {
    return {
      connected: false,
      queueType: this.$route.params.type
    };
  },
  methods: {
    queue(gameType) {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { gameType };
        this.stompClient.send("/app/game/queue/start", {}, JSON.stringify(msg));
      }
    }
  },
  mounted() {
    this.socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      frame => {
        this.connected = true;

        this.stompClient.subscribe("/user/game/queue/status", tick => {
          console.log(tick);
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