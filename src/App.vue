<template>
      <router-view></router-view> 
</template>

<script>
import { onMounted, computed  } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'App',
    setup() {
        const store = useStore();
        const userExists = computed(() => {
            const user = store.getters['userModule/getUser'];
            return user && Object.keys(user).length > 0;
        });

        onMounted(async () => {
            if (!userExists.value) {
                try {
                    await store.dispatch('userModule/user', { endpoint: '/user-profile' });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        });
    },
    
}
</script>