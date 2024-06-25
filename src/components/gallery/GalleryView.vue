<template>
  <div>
    <h1>{{albums.name}}</h1>
    <div class="row">
        <GalleryImage v-for="image in images" :key="image.id" :image="image" @open-modal="showModal" />
      </div>
  
    <!-- Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="imageModalLabel">{{ modalImage.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="getImageUrl(modalImage.path)" class="img-fluid" :alt="modalImage.name" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Затвори</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import GalleryImage from './GalleryImage.vue';

import { Modal } from 'bootstrap';

import http from '@/services/api';
import { useRouter } from 'vue-router';
import { Image } from '@/types/Image';

export default defineComponent({
  components: {
    GalleryImage,
  },
  setup() {
    const images = ref<{  id: number, name: string, path: string, version: number, status: string }[]>([]);
    const albums = ref<{ name: string }>({
      name: '',
    });

    const modalImage = ref<Image>({} as Image);

    const getImageUrl = (path: string) => {
      if (path) {
        return `${process.env.VUE_APP_API_ROOT}/${path}`;
      }
    }
    const showModal = (image: Image) => {
      modalImage.value = image;
      const modalElement = document.getElementById('imageModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    onMounted(async () => {
      const route = useRouter();

      const id = route.currentRoute.value.params.id;

      try {
        const album = await http.get(`/albums/${id}`);
        albums.value = album.data;
      } catch (error) {
        console.error(error);
      }

      const response = await http.get(`/album/${id}`);
      images.value = response.data;
    });


    return { images, albums, modalImage, getImageUrl, showModal };
  },
});
</script>

<style scoped>
.galleryItem {
    display: inline-block;
    margin: 10px;
}
</style>