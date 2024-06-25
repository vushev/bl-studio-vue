<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4">Sign In</h1>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" v-model="email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input id="password" v-model="password" type="password" class="form-control" required>
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
import { mapMutations } from 'vuex';
import AuthService from '../services/auth.service'
import { useRouter } from 'vue-router';

// import { useRouter } from 'vue-router';
// import http from '@/services/api';

export default defineComponent({
  name: 'SignIn',
  data() {
    
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    async login() {
      console.log('login')
      try {
        const response = await AuthService.login({ email: this.email, password: this.password })
        console.log(response)
        if (response)
        {
          this.setToken(response)
          this.$router.push('/galleryList')
        }
      } catch (error) {
        console.error(error)
      }

      
      // const response = await http.post('/auth/signin', {
      //   email: this.email,
      //   password: this.password,
      // });
      // console.log(response)
      // const data = await response.json();
      // if (response.ok) {
      //   this.setToken(data.token);
      //   useRouter().push('/');
      // } else {
      //   alert(data.message);
      // }
    },
  },
});
</script>
