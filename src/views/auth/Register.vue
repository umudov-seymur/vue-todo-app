<template>
  <div class="container">
    <h3 class="m-heading">Register</h3>
    <Errors v-if="errors.length > 0">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </Errors>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Fullname</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <loading-btn :loading="loading">Register</loading-btn>
    </form>
  </div>
</template>

<script>
import Errors from "@/components/shared/Errors.vue";
import LoadingBtn from "@/components/shared/LoadingBtn.vue";

export default {
  data() {
    return {
      loading: false,
      email: "",
      name: "",
      password: "",
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
    register() {
      this.loading = true;
      this.$store
        .dispatch("auth/AUTH_REGISTER", this.$data)
        .then(({ name }) => {
          this.loading = false;
          alert(`Dear ${name}, you have been successfull registered!`);
          alert("Redirected ....");
          this.$router.push({ name: "login" });
        })
        .catch(() => (this.loading = false));
    },
  },
  components: {
    Errors,
    LoadingBtn,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/forms.scss";
</style>
