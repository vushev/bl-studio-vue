import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/user/User.vue')
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: () => import('../components/UploadView.vue')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('../components/album/AlbumsView.vue')
  },
  {
    path: '/galleryList',
    name: 'galleryList',
    component: () => import('../components/gallery/GalleryList.vue')
  },
  {
    path: '/galleryView/:id',
    name: 'galleryView',
    component: () => import('../components/gallery/GalleryView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/SignInAuth.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
