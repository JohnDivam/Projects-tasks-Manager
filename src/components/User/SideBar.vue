<template>
<!-- links -->
    <ul class="list-unstyled px-0 links">
    <li :class="{active: currentStatus == ''}">
        <router-link  :to="getStatusLink('')"> All Tasks  </router-link>
    </li>
    <li v-for="status in statuses" :key="status" :class="{ active: currentStatus === status }" >
        <router-link :to="getStatusLink(status)"> {{ status }}</router-link>
    </li>
    <li v-if="user.type === 'admin' || user.type === 'superadmin'">
        <router-link to="/admin/home" class="bg-dark mt-3"> Admin panel </router-link>
    </li>
</ul>
<!-- end links -->
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { computed, watch, getCurrentInstance } from "vue"
export default{
    props:{
        statuses : Array,
        user: Object
    },
    setup(props){
        const root = getCurrentInstance().proxy;

        const route = useRoute();
        const currentStatus = computed(() => root.$route.query.status || "");

        const getStatusLink = (status) => {
            return {
                name: 'UserHome',
                query: { ...route.query, status }
            };
        };

        watch(() => root.$route.query.status,(newValue) => currentStatus.value = newValue);


        return {
            statuses: props.statuses, 
            user: props.user,
            currentStatus,
            getStatusLink
        }
    }
}

</script>