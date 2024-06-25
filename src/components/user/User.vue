<template>
    <div>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="addUser">
        <input v-model="user.name" placeholder="Name" />
        <input v-model="user.username" placeholder="Username" />
        <input v-model="user.email" placeholder="Email" />
        <input v-model="user.password" placeholder="Password" />
        <button type="submit">Add User</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import http from '@/services/api';
  import { ApiResponse } from '@/types/axios';
  
  export default defineComponent({
    name: 'UserList',
    setup() {
        const user = ref<{
            name: string,
            username: string,
            email: string,
            password: string
        }>({
            name: '',
            username: '',
            email: '',
            password: ''
        });

        const users = ref([{...user}]);
  
      const fetchUsers = async () => {
        const response = await http.get('/users');

        users.value = response.data;

      };
  
      const addUser = async () => {
        if (user.value.name.trim() !== '') {
            try {

                await http.post('/users', user.value);

                user.value = {
                    name: '',
                    username: '',
                    email: '',
                    password: ''
                };
                fetchUsers();
             } catch (error) {
                const apiError = error as ApiResponse<null>;
                console.log(error)
                alert("Error: " + apiError.message);
            }
        }
      };
  
      const deleteUser = async (id: string) => {

        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await http.delete('/users/' + id);

                fetchUsers();
            } catch (error) {
                console.log(error)
            }
        }
        
      };
  
      onMounted(fetchUsers);
  
      return {
        users,
        user,
        addUser,
        deleteUser,
      };
    },
  });
  </script>
  