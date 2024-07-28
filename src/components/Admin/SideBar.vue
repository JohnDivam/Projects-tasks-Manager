<template>
<!-- links -->
    <ul class="list-unstyled px-0 links">
    <li>
        <router-link to="/admin/users"> Users  </router-link>
    </li>
    <li>
        <router-link to="/admin/users"> Projects  </router-link>
    </li>
    <li>
        <router-link to="/admin/users"> Permissions  </router-link>
    </li>

    <li>
        <router-link to="/user/home" class="bg-dark mt-3">  Employee panel  </router-link>
    </li>
</ul>
<!-- end links -->
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
export default{
    setup(props){
        const route = useRoute();

        
    }
}

</script>