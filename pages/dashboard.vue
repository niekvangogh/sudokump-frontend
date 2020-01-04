<template>
  <b-container class="my-4">
    <b-row>
      <b-col>
        <h2>
          Dashboard
          <small class="text-muted">Hey {{'Niek'}}</small>
        </h2>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="6">
        <b-jumbotron>
          <h5>Your latest played games</h5>
          <b-list-group>
            <b-list-group-item class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>
              <p class="mb-1"></p>
              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>
          </b-list-group>
        </b-jumbotron>
      </b-col>
      <b-col cols="6">
        <h5>Play a new game</h5>
        <div>
          <b-button variant="success" :to="{name: 'game-queue', params: { type: 'quickplay' }}">Quickplay</b-button>
          <b-button variant="info" :to="{name: 'game-queue', params: { type: 'ranked' }}">Ranked</b-button>
        </div>
      </b-col>
      <b-col>
          <div class="lobbies">
              insert lobbies
          </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
</style>