<template>
  <div>
    <div>{{gameId}}</div>
    <sudoku v-if="grid" :grid="grid" />
  </div>
</template>

<script>
import Sudoku from "../../../components/sudoku.vue";

export default {
  mixins: [socketMixin],
  components: {
    Sudoku
  },
  data() {
    return {
      gameId: this.$route.params.gameId,
      stomp: this.$route.params.stomp,
      grid: null
    };
  },
  mounted() {
    if (this.stomp && this.stomp.connected) {
      this.setReady();
    } else {
      this.connect();
    }
  },
  methods: {
    setReady() {
      this.stomp.subscribe("/user/game/sudoku/start", tick => {
        let response = JSON.parse(tick.body);
        if (response.ready) {
          this.$api
            .get("/game/sudoku", { params: { gameId: this.gameId } })
            .then(response => {
              this.grid = response.data;
            });
        }
      });
      setTimeout(() => {
        this.stomp.send("/app/game/sudoku/ready", {}, JSON.stringify({}));
      }, 500);
    }
  }
};
</script>
<style>
</style>