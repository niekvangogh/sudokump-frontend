<template>
  <b-container>
    <b-row>
      <div class="card mx-auto my-5">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Login</h4>
          <hr />
          <b-alert variant="danger" v-if="error">{{error}}</b-alert>
          <div>
            <b-form @submit.prevent="login">
              <b-form-input
                id="input-1"
                v-model="username"
                type="text"
                required
                placeholder="Username"
              ></b-form-input>
              <br />
              <b-form-input type="password" v-model="password" required placeholder="Password"></b-form-input>
              <br />
              <b-button type="submit" variant="primary">Login</b-button>
            </b-form>
          </div>
        </article>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import Axios from "axios";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "notAuthenticated",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login(e) {
      const email = this.username;
      const password = this.password;
      this.$api
        .post("/auth/login", {
          email,
          password
        })
        .then(response => {
          let data = response.data;
          if (data) {
            const accessToken = data.accessToken;
            this.$api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            this.$api.get("/user/me").then(response => {
              const userProfile = response.data;
              Cookie.set(
                "auth",
                JSON.stringify({ accessToken, user: userProfile })
              );

              this.$store.commit("setAuth", { accessToken, user: userProfile });
              
              this.$router.push({ name: "dashboard" });
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
}
</style>