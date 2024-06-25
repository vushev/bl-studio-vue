<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 shadow-sm" @click="openModal(image)">
      <img :src="getImageUrl(image.path)" class="card-img-top" :alt="image.name" />
      <div class="card-body">
        <h5 class="card-title">{{ image.name }} <small class="text-muted">version: {{ image.version }}</small></h5>
        <p class="card-text">
          <span v-if="image.status === 'approved'" class="badge bg-success">Одобрена</span>
          <span v-else-if="image.status === 'rejected'" class="badge bg-danger">Отказана</span>
          <span v-else-if="image.status === 'needs_work'" class="badge bg-warning text-dark">Изисква работа</span>
          <span v-else class="badge bg-secondary">Неизвестен статус</span>
        </p>

        <div class="mb-3">
          <label for="status" class="form-label">Статус</label>
          <select v-model="localStatus" @change="updateStatus(localStatus)" class="form-select">
            <option value="approved">Одобрена</option>
            <option value="rejected">Отказана</option>
            <option value="needs_work">Изисква работа</option>
          </select>
        </div>

        <div v-if="image.status === 'needs_work' && !image.comments" class="mb-3">
          <label for="comments" class="form-label">Коментари</label>
          <textarea v-model="comments" class="form-control" rows="3"></textarea>
          <button @click.stop="saveComments" class="btn btn-primary mt-2">Запиши коментари</button>
        </div>
        <div v-else-if="image.status === 'needs_work' && image.comments" class="mb-3">
          <label for="comments" class="form-label">Коментари</label>
          <p>{{ image.comments }}</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import http from '@/services/api';
import { Image } from '@/types/Image';

export default defineComponent({
  name: 'ImageCard',
  props: {
    image: {
      type: Object,
      required: true
    },
  },
  setup(props, { emit }) {
    const comments = ref(props.image.comments || "");
    const localStatus = computed({
      get() {
        return props.image.status;
      },
      set(value: string) {
        updateStatus(value);
      }
    });

    const getImageUrl = (path: string) => {
      return `${process.env.VUE_APP_API_ROOT}/${path}`;
    };

    const updateStatus = async (status: string) => {
      try {
        await http.patch(`/album/image/${props.image.id}/status`, { status });
      } catch (error) {
        console.error('Failed to update image status', error);
      }
    };

    const saveComments = async () => {
      try {
        await http.patch(`/album/image/${props.image.id}/comments`, { comments: comments.value });
      } catch (error) {
        console.error('Failed to update image comments', error);
      }
    };

    const openModal = (image: Image) => {
      emit('open-modal', image);
    };

    return { getImageUrl, updateStatus, saveComments, localStatus, comments, openModal };
  }
});
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card-img-top {
  width: 100%;
  height: auto;
}
.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.card-title small {
  font-size: 0.875rem;
  color: #666;
}
.card-text {
  margin-bottom: 1rem;
}
</style>
