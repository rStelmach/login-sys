import { createRouter, createWebHistory } from 'vue-router';
import LogOut from '../components/LogOut.vue';
import LogInForm from '../components/LogInForm.vue';
import store from '../store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    {
      name: 'login',
      path: '/login',
      component: LogInForm,
      meta: { requiresUnauth: true },
    },
    {
      name: 'logged',
      path: '/logged',
      component: LogOut,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/logged');
  } else {
    next();
  }
});

export default router;
