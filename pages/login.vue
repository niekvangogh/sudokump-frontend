<template>
  <b-container>
    <b-row>
      <div class="card mx-auto my-5">
        <article class="card-body">
          <h4 class="card-title text-center mb-4 mt-1">Login</h4>
          <hr />
          <b-alert variant="danger" v-if="error">{{error}}</b-alert>
          <form @submit="login">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input
                  v-model="username"
                  name
                  class="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
          </form>
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
      error: null
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      
      let username = this.username;
      let password = this.password;

      if (true) {
        this.$router.push({ name: "dashboard", params: { profile: {} } });
      } else {
        this.error = "Incorrect username or password";
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
}
</style>