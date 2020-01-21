<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="d-flex justify-content-center">
        <div class="my-5">
          <h1>SudokuMP</h1>
          <div class="my-5">
            <b-button variant="danger" :to="{name: 'register'}">Register</b-button>
            <b-button variant="success" :to="{name: 'login'}">Login</b-button>
          </div>
        </div>
      </b-col>
      <b-col>
        <h5>What is SudokuMP</h5>
        <p>SudokuMP is a multiplayer game, the goal is to be the first to complete the given sudoku. It is a very challening game, since you can see the progress of the other participants as well. Making it so you can confuse/mislead others.</p>
      </b-col>
      <b-col>
        <h5>What does it have to offer?</h5>
        <p>SudokuMP has a competitive mode. You can win games and get in a higher tier, and play against better players.</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  components: {}
};
</script>