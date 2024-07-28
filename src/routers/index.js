import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../utils/auth';

const routes = [
    { path: '/', component:  () => import("../components/Pages/Welcome.vue"),  },
    { path: '/login', component:  () => import("../components/Pages/Auth/Login.vue"),  
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ path: '/user/home' });
        } else {
          next();
        }
      }  
    },
    { path: '/user/home', component:  () => import("../components/User/Home.vue"),  name: 'UserHome', meta: { requiresAuth: true }, },
    { path: '/user/tasks/create', component:  () => import("../components/User/Tasks/Create.vue"), meta: { requiresAuth: true }, },
    { path: '/user/tasks/show/:id', component:  () => import("../components/User/Tasks/Show.vue"), meta: { requiresAuth: true }, },
    { path: '/admin/users', component:  () => import("../components/Admin/Users/Index.vue"),  meta: { requiresAuth: true }, },

];

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  
export default router;