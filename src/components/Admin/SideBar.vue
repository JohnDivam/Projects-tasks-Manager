<template>
<!-- links -->
    <ul class="list-unstyled px-0 links">
    <li :class="{active: currectPath == '/admin/employees' }"  v-if="checkPermission('Employees')">
        <router-link to="/admin/employees"> Employees  </router-link>
    </li>
    <li :class="{active: currectPath == '/admin/projects' }"  v-if="checkPermission('Projects')">
        <router-link to="/admin/projects"> Projects  </router-link>
    </li>
    <li :class="{active: currectPath == '/admin/users' }"  v-if="checkPermission('Users')">
        <router-link to="/admin/users"> Permissions  </router-link>
    </li>

    <li>
        <router-link to="/user/home" class="bg-dark mt-3">  Employee panel  </router-link>
    </li>
</ul>
<!-- end links -->
</template>

<script>
import { computed, getCurrentInstance } from "vue"
import { useStore } from "vuex";
import { hasPermission } from '../../utils/auth';

export default{
  data () {
    return {
    }
  },
  methods: {
  },
    setup(){
        const root = getCurrentInstance().proxy;
        const store = useStore();

        const currectPath = computed(() => root.$route.fullPath || "");

        const checkPermission = (permission) => {
            return hasPermission(store.getters['userModule/getUser'], permission);
        };

        return {
            currectPath,
            checkPermission
        }
    }
}

</script>