import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, hasPermission } from '../utils/auth';
import { computed } from 'vue';
import { useStore } from 'vuex';

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
    { path: '/user/tasks/edit/:id', component:  () => import("../components/User/Tasks/Edit.vue"), meta: { requiresAuth: true }, },
    
    
    { path: '/admin/home', component:  () => import("../components/Admin/Home.vue"),  meta: { requiresAuth: true}, },

    { path: '/admin/employees', component:  () => import("../components/Admin/Employees/Index.vue"),  meta: { requiresAuth: true, permission: 'Employees' }, },
    { path: '/admin/employees/create', component:  () => import("../components/Admin/Employees/Create.vue"),  meta: { requiresAuth: true, permission: 'Employees' }, },
    { path: '/admin/employees/edit/:id', component:  () => import("../components/Admin/Employees/Edit.vue"),  meta: { requiresAuth: true, permission: 'Employees' }, },

    { path: '/admin/projects', component:  () => import("../components/Admin/Projects/Index.vue"),  meta: { requiresAuth: true, permission: 'Projects' }, },
    { path: '/admin/projects/create', component:  () => import("../components/Admin/Projects/Create.vue"),  meta: { requiresAuth: true, permission: 'Projects' }, },
    { path: '/admin/projects/edit/:id', component:  () => import("../components/Admin/Projects/Edit.vue"),  meta: { requiresAuth: true, permission: 'Projects' }, },

    
    { path: '/admin/users', component:  () => import("../components/Admin/Users/Index.vue"),  meta: { requiresAuth: true, permission: 'Users' }, },
    { path: '/admin/users/create', component:  () => import("../components/Admin/Users/Create.vue"),  meta: { requiresAuth: true, permission: 'Users' }, },
    { path: '/admin/users/edit/:id', component:  () => import("../components/Admin/Users/Edit.vue"),  meta: { requiresAuth: true, permission: 'Users' }, },

    
];

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes,
});


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        const store = useStore();  // Access the store in the setup function
        const user = computed(() => store.getters['userModule/getUser']);

        if (!user.value) {
          try {
            await store.dispatch('userModule/user', { endpoint: '/user-profile' });
            user = computed(() => store.getters['userModule/getUser']);

          } catch (error) {
            console.error('Error fetching user:', error);
          }
        }

        const permission = to.meta.permission;

        if (user.value.name && permission && !hasPermission(user.value, permission)) {
          return next('/unauthorized'); // Redirect to an unauthorized page or login
        }

        next();
      }
    } else {
      next();
    }
  });

  
export default router;