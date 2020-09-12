<template>
  <ul class="nav">
    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
    <li><router-link :to="{ name: 'todo' }">Todo List</router-link></li>
    <li><router-link :to="{ name: 'about' }">About</router-link></li>
    <li v-if="!isLoggedIn">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </li>
    <li v-if="!isLoggedIn">
      <router-link :to="{ name: 'register' }">Register</router-link>
    </li>
    <li v-if="isLoggedIn">
      <a href="#" @click.prevent="logout">Logout</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/AUTH_LOGOUT").then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
};
</script>
