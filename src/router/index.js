import { createRouter, createWebHistory } from 'vue-router';
import LogOut from '../components/LogOut.vue';
import LogInForm from '../components/LogInForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: LogInForm },
    { name: 'logged', path: '/logged', component: LogOut },
  ],
});

export default router;
