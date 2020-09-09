<template>
  <div class="container">
    <h3 class="m-heading">Login</h3>
    <form action="" @submit.prevent="login" method="post">
      <div class="form-group">
        <label for="username">Username / Email</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("retrieveToken", this.$data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/forms.scss";
</style>
