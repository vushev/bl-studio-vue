<template>
  <header class="header">
    <div class="header__bar">
      <div class="header__navbar">
        <div class="header__logo">
          <h1>
            <router-link to="/">Logo</router-link>
          </h1>
        </div>
        <nav class="header__nav">
          <!-- <router-link to="/">Home</router-link> -->
          <template v-if="isAuthenticated">
            <!-- | <router-link to="/users">Go to User List</router-link> | -->
            <!-- <router-link to="/albums">Go to Project List</router-link> | -->
            <router-link to="/galleryList">Go to Gallery</router-link> |
            <!-- <router-link to="/uploads">Uploads</router-link> -->
          </template>
        </nav>
      </div>
      <div class="header__actions">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn--primary">Sign in</router-link>
          <!-- <router-link to="/register" class="btn btn--secondary">Register</router-link> -->
        </template>
        <template v-else>
          <!-- <router-link to="/profile" class="btn btn--primary">Profile</router-link> -->
          <button @click="logout">Logout</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderLayout',
  setup() {
    console.log('load header')
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    baseUrl() {
      return this.$baseUrl;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.header {
  background-color: #f5f5f5;
  padding: 10px;
}

.header__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__navbar {
  display: flex;
  align-items: center;
}

.header__logo {
  margin-right: 20px;
}

.header__nav {
  display: flex;
  list-style: none;
}

.header__nav li {
  margin-right: 20px;
}

.header__actions {
  display: flex;
  gap: 10px;
}
</style>
