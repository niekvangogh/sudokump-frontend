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
                this.grid = response.data;
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