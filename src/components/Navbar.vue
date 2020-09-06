<template>
  <ul class="nav">
    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
    <li><router-link :to="{ name: 'todo' }">App</router-link></li>
    <li><router-link :to="{ name: 'about' }">About</router-link></li>
    <li><router-link :to="{ name: 'login' }">Login</router-link></li>
    <li><router-link :to="{ name: 'register' }">Register</router-link></li>
  </ul>
</template>
