<template>
<!-- links -->
    <ul class="list-unstyled px-0 links">
    <li :class="{active: currentStatus == ''}">
        <router-link  :to="getStatusLink('')"> All Tasks  </router-link>
    </li>
    <li v-for="status in statuses" :key="status" :class="{ active: currentStatus === status }" >
        <router-link :to="getStatusLink(status)">Tasks In {{ status }}</router-link>
    </li>
    <li v-if="user.type === 'admin' || user.type === 'superadmin'">
        <router-link to="/admin/employees" class="bg-dark mt-3"> Admin panel </router-link>
    </li>
</ul>
<!-- end links -->
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
export default{
    props:{
        currentStatus: String,
        statuses : Array,
        user: Object
    },
    setup(props){
        const route = useRoute();

        const getStatusLink = (status) => {
            return {
                name: 'UserHome',
                query: { ...route.query, status }
            };
        };

        return {
            statuses: props.statuses, 
            currentStatus: props.currentStatus,
            user: props.user,
            getStatusLink 
        }
    }
}

</script>