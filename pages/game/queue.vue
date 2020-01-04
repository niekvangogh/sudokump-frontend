<template>
  <div>You are currently in a queue for {{ queueType }}</div>
</template>

<script>
export default {
  data() {
    return {
      queueType: this.$route.params.type
    };
  }
};
</script>

<style>
</style>