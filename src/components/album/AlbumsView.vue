<template>
  <div>
    <h1>Albums</h1>
    <ul>
      <li v-for="album in albums" :key="album.id">
        <router-link :to="`/galleryView/${album.id}`">
          {{ album.name }}
        </router-link>
        <button @click="deleteProject(album.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addProject">
      <input v-model="album.name" placeholder="Name" />
      <button type="submit">Add Project</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import http from '@/services/api';
import { AxiosResponse } from 'axios'

export default defineComponent({
  setup() {
    const album = ref<{ name: string }>({ name: '' });

    // Define an array of albums with `ref` and initialize it with the single album
    const albums = ref([{...album}]);


    const fetchProjects = async () => {
        const response = await http.get('/albums');
        albums.value = response.data;
    };

    const addProject = async () => {
        if (album.value.name.trim() !== '') {
            try {
                const newProject: AxiosResponse = await http.post('/albums', album.value);
                
                album.value = {
                    name: ''
                };
                
              const newProj = reactive(newProject.data);
              albums.value.push(newProj);
                // fetchProjects()
            } catch (error) {
                console.error(error);
            }
        }
      };

    const deleteProject = async (id: string) => {
      try {
            await http.delete('/albums/' + id);
            fetchProjects()
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(fetchProjects);

    return {
        album,
        albums,
        addProject,
        deleteProject
    }
  },
});
</script>