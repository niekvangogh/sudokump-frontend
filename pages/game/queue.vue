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
      queueType: this.$route.params.type
    };
  },
  methods: {},
  mounted() {
    this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      frame => {
        this.connected = true;
        console.log(frame);
        this.stompClient.subscribe("/topic/greetings", tick => {
          console.log(tick);
          this.received_messages.push(JSON.parse(tick.body).content);
        });
      },
      error => {
        console.log(error);
        this.connected = false;
      }
    );
  }
};
</script>

<style>
</style>