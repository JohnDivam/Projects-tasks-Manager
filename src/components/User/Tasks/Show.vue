<template>
    <DashLayout page-title="Create task">
    
<div class="container">
    <div class="card">
      <div class="card-header"> 
          <span>Task Details</span> 
          <router-link  to="/user/home" class="btn btn-sm btn-secondary text-white float-right">Back</router-link>
      </div>
      
    </div>
</div>


    </DashLayout>
</template>

<script>
import DashLayout from '../../layouts/DashLayout.vue';
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
export default {
  created () {
  },
    components:{
        DashLayout
    },
    setup() {
    const root = getCurrentInstance().proxy;
    const isPending = ref(false);

    return {
        isPending,
        };
    }
}
</script>