<template>
  <div>
    <h1>Gallery</h1>
    <div class="list-group">
      <router-link
        class="list-group-item list-group-item-action"
        :to="{ name: 'galleryView', params: { id: album.id } }"
        v-for="album in albums"
        :key="album.id">
        {{ album.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import http from '@/services/api';
import { Project } from '@/types/Project';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const albums = ref<Project[]>([]);
    const router = useRouter();

    const showImages = (id: string) => {
      router.push({ name: 'galleryView', params: { id } });
    };

    onMounted(async () => {
      const response = await http.get<Project[]>('/albums');
      albums.value = response.data;
    });

    return { albums, showImages };
  },
});
</script>

<style scoped>
img {
  margin-bottom: 10px;
}
</style>
