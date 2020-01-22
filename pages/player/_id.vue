<template>
  <b-container v-if="player">
    <h1>{{player.username}}'s profile page</h1>
    {{player}}
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      id: this.$route.params.id
    };
  },
  async asyncData({ params, app }) {
    const { data } = await app.$api.get(`/user/player/${params.id}`);
    return { player: data };
  }
};
</script>

<style>
</style>