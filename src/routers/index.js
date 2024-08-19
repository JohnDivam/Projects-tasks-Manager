import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, hasPermission } from '../utils/auth';
import store from  '../store';

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
    
    { path: '/admin/employees', component:  () => import("../components/Admin/Employees/Index.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Employees'] }, },
    { path: '/admin/employees/create', component:  () => import("../components/Admin/Employees/Create.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Employees'] }, },
    { path: '/admin/employees/edit/:id', component:  () => import("../components/Admin/Employees/Edit.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Employees'] }, },

    { path: '/admin/projects', component:  () => import("../components/Admin/Projects/Index.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Projects'] }, },
    { path: '/admin/projects/create', component:  () => import("../components/Admin/Projects/Create.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Projects'] }, },
    { path: '/admin/projects/edit/:id', component:  () => import("../components/Admin/Projects/Edit.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Projects'] }, },

    
    { path: '/admin/users', component:  () => import("../components/Admin/Users/Index.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Users'] }, },
    { path: '/admin/users/create', component:  () => import("../components/Admin/Users/Create.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Users'] }, },
    { path: '/admin/users/edit/:id', component:  () => import("../components/Admin/Users/Edit.vue"),  meta: { requiresAuth: true, requiredPermissions: ['Users'] }, },

    
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
        if (!store.getters['userModule/getUser'].length) {
           store.dispatch('userModule/user', { endpoint: '/user-profile' });
        }
        if(to.meta.requiredPermissions){
          console.log(store.getters['userModule/getUser']);
          if (hasPermission(store.getters['userModule/getUser'], to.meta.requiredPermissions)) {
              next();
          } else {
              next('/unauthorized');
          }
        }else{
          next();
        }
      }
    } else {
      next();
    }
  });

  
export default router;