<template>
  <div class="home">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed justo ut lacus
       aliquam tempor. Maecenas iaculis euismod dolor, eu aliquam justo suscipit sit amet.
       Donec vulputate, lacus vitae mattis ultrices, nibh lorem pharetra mi, eu consequat
       tortor leo id lectus. Sed congue justo vitae mi ultricies, id congue nunc scelerisque.
       Nullam id dolor id nibh ultricies vehicula ut id elit. Sed euismod, ante at commodo
       lacinia, nunc nulla sagittis nibh, in ullamcorper enim dui sit amet nisl. Proin
       suscipit, velit et lacinia mattis, massa nunc auctor nisi, non consectetur tellus
       mauris vitae nisi.</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
