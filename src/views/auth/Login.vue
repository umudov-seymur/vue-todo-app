<template>
  <div class="container">
    <h3 class="m-heading">Login</h3>
    <Errors v-if="errors.length > 0">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </Errors>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username / Email</label>
        <input type="text" id="username" v-model.trim="user.username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="user.password" />
      </div>
      <loading-btn :loading="loading">Login</loading-btn>
    </form>
  </div>
</template>

<script>
import Errors from "@/components/shared/Errors.vue";
import LoadingBtn from "@/components/shared/LoadingBtn.vue";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    errors() {
      return this.$store.getters["auth/AUTH_ERROR"];
    },
  },
  destroyed() {
    this.$store.state.auth.errors = [];
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("auth/AUTH_LOGIN", this.$data.user)
        .then(() => {
          this.user.username = null;
          this.user.password = null;
          this.loading = false;
          this.$router.push({ name: "todo" });
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  components: {
    Errors,
    LoadingBtn,
  },
};
</script>

<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
@import "@/styles/forms.scss";
</style>
