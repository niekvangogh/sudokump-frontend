<template>
  <b-container>
    <b-row>
      <div class="card mx-auto my-5">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Login</h4>
          <hr />
          <b-alert variant="danger" v-if="error">{{error}}</b-alert>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >Sign in with Google</g-signin-button>
        </article>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
      googleSignInParams: {
        client_id:
          "1052949725832-4cbeegr988optkd2a6j7bstr25g9oon3.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      console.log(googleUser)

      if (true) {
        this.$router.push({ name: "dashboard", params: { profile: {} } });
      } else {
        this.error = "Incorrect username or password";
      }
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
}
</style>