<template>
  <HeaderLayout />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderLayout from './Layout/HeaderLayout.vue';
import verifyToken from './services/verify.auth';

export default defineComponent({
  name: 'App',
  components: {
    HeaderLayout,
  },
  created() {
    verifyToken();
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
