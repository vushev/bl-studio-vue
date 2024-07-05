<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4">Sign In</h1>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" v-model="credentials.email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="credentials.password" type="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';
import AuthService from '../services/auth.service'
import { useRouter } from 'vue-router';

// import { useRouter } from 'vue-router';
// import http from '@/services/api';

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    handleSubmit() {
      this.login(this.credentials);
    }
  }
});
</script>
