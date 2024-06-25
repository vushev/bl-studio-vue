<template>
  <div>
    <h1>Uploads</h1>
    <form @submit.prevent="uploadFile">
    <select v-model="project_id">
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.name }}
      </option>
    </select>
    <input type="file" @change="handleFileChange" />
    <button type="submit">Upload</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Project } from '@/types/Project'; 
import http from '@/services/api';

export default defineComponent({
  setup() {
    const albums = ref<Project[]>([{name: '', id: ''}]);
    const project_id = ref<string>('');
    const selectedFile = ref<File | null>(null);

    onMounted(async () => {
      try {
        const response = await http.get('/albums');
        albums.value = response.data.map((album: Project) => ({
          ...album,
          id: album.id,
        }));
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    });

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target && target.files) {
        selectedFile.value = target.files[0];
      }
    };

    const uploadFile = async () => {
      if (!selectedFile.value) {
        console.error('No file selected.');
        return;
      }

      if (!project_id.value) {
        console.error('No album selected.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile.value);
      formData.append('project_id', project_id.value);

      try {
        const response = await http.post('/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    return {
      albums,
      project_id,
      handleFileChange,
      uploadFile,
    };
  },
});
</script>
