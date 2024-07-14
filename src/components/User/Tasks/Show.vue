<template>
    <DashLayout page-title="Create task">
    
<div class="container">
    <div class="card">
      <div class="card-header"> 
          <span>{{ task.name }}</span> 
          <router-link  to="/user/home" class="btn btn-sm btn-secondary text-white float-right">Back</router-link>
      </div>
      <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <p>{{task.description}}</p>

                    <hr>
                    <a href="#">
                        document.pdf
                    </a>
                </div>
                <div class="col-md-4">
                    <ul>
                        <li>Project: {{task.project_name}}</li>
                        <li>Created at: {{task.created_at}}</li>
                        <li>Priority: {{task.priority}}</li>
                        <li>Type: {{task.type}}</li>
                        <li>Estimated time: {{task.estimated_time}}</li>
                        <li>Start at: {{task.start_at}}</li>
                        <li>End at: {{task.end_at}}</li>
                        
                    </ul>
                </div>
            </div>
      </div>
      <div class="card-footer">
        footer
      </div>
      
    </div>
</div>


    </DashLayout>
</template>

<script>
import DashLayout from '../../layouts/DashLayout.vue';
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
import { getTask } from "../../../services/TaskService";
import { useRoute } from 'vue-router';

export default {
    components:{
        DashLayout
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const isPending = ref(false);
        const task = ref({});
        const route = useRoute();

        const findTask = async() => {
            try {
                isPending.value = true;
                const taskData = await getTask(route.params.id);
                task.value = taskData;
            } catch (error) {
                console.error('Error find task:', error);
            } finally {
                isPending.value = false;
            }
        }

       
        onMounted(async () => {
            await findTask();
        });

        return {
            isPending,
            task,
            findTask
        };
    }
}
</script>