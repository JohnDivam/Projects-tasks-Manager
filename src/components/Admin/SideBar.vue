<template>
<!-- links -->
    <ul class="list-unstyled px-0 links">
    <li :class="{active: currectPath == '/admin/employees' }">
        <router-link to="/admin/employees"> Employees  </router-link>
    </li>
    <li :class="{active: currectPath == '/admin/projects' }">
        <router-link to="/admin/projects"> Projects  </router-link>
    </li>
    <li :class="{active: currectPath == '/admin/users' }">
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
export default{
  methods: {
  },
    setup(){
        const root = getCurrentInstance().proxy;

        const currectPath = computed(() => root.$route.fullPath || "");

        return {
            currectPath
        }
    }
}

</script>