<template>
        <DashLayout page-title="Home">
        <div class="homepage">
                <h1>Welcome {{user.name}} </h1> 
        </div>
        </DashLayout>
</template>


<script>

import DashLayout from '../layouts/DashLayout.vue';
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    components:{
        DashLayout,
    },
    setup() {
        const store = useStore();
        
        return {
            user: computed(() => store.getters['userModule/getUser']),
        }
    },
}
</script>
