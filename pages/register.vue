<template>
  <b-container>
    <b-row>
      <div class="card mx-auto my-5">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Register</h4>
          <hr />
          <b-alert variant="danger" v-if="error">{{error}}</b-alert>
          <div>
            <b-form @submit.prevent="register">
              <b-form-input id="input-1" v-model="email" type="email" required placeholder="Email"></b-form-input>
              <br />
              <b-form-input id="input-1" v-model="name" type="text" required placeholder="Name"></b-form-input>
              <br />
              <b-form-input type="password" v-model="password" required placeholder="Password"></b-form-input>
              <br />
              <b-button type="submit" variant="primary">Register</b-button>
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
      email: "",
      password: "",
      name: "",
      error: ""
    };
  },
  methods: {
    register(e) {
      const email = this.email;
      const password = this.password;
      const name = this.name;
      this.$api
        .post("/auth/signup", {
          email,
          name,
          password
        })
        .then(response => {
          let data = response.data;
          if (data) {
            this.$router.push({ name: "login" });
          }
        });
    }
  }
};
</script>

<style>
</style>