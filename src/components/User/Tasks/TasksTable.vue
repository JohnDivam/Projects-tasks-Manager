<template>
    
  <div class="row">
    <div class="col-md-3">
      <v-select
          :items="projects"
          v-model="selectedProject"
          label="Select a project"
          item-title="name"
          item-value="id"
          outlined
          dense
          :disabled="isPending"
      ></v-select>
    </div>
    <div class="col-md-3">

    </div>
    <div class="col-md-3">
      
    </div>
    <div class="col-md-3 text-right">
      <router-link  to="/user/tasks/create" class="btn btn-sm btn-success">Create Task</router-link>
    </div>
  </div>
  <!-- end row -->
  
  <div class="table-responsive">
    <table class="table table-boordered table-hover bg-white">
        <thead>
            <th>#</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Estimated Time</th>
            <th>Status</th>
            <th>Actions</th>
        </thead>
        <tbody>
            <tr v-if="tasks.length === 0">
            <td colspan="5" class="text-center">No tasks found</td>
            </tr>
            <tr else v-for="(task) in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td> 
                <td>{{ task.priority }}</td> 
                <td>{{ task.estimated_time }}</td> 
                <td>{{ task.status.status }}</td> 
                <td class="text-center">
                    <router-link :to="'/user/tasks/show/'+task.id"  class="btn btn-sm">Show</router-link>
                </td>
            </tr>
        </tbody>
    </table>

     <v-pagination
        v-if="lastPage > 1"
        v-model="currentPage"
        :length="lastPage"
        class="my-4"
        @click="changePage"
        rounded="circle"
      ></v-pagination>
  </div>

</template>

<script>
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
import { getProjects } from "../../../services/ProjectService";
import { getTasks } from "../../../services/TaskService";
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
    const root = getCurrentInstance().proxy;
    const projects = ref([]);
    const isPending = ref(false);
    const tasks = ref([]);
    const route = useRoute();
    const router = useRouter();
    const selectedProject = ref(projects.value.find(project => project.id === newValue) || null);
    const currentPage = ref(1);
    const lastPage = ref(1);

    const fetchProjects = async() => {
      try {
        projects.value = await getProjects();
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    const fetchTasks = async(page = 1) => {
        const response = await getTasks(page, root);
        tasks.value = response.data.tasks.data;
        currentPage.value = response.data.tasks.current_page;
        lastPage.value = response.data.tasks.last_page;
    }

    const changePage = () => {
        if (currentPage.value >= 1 && currentPage.value <= lastPage.value) {
            fetchTasks(currentPage.value);
        }
    };

    onMounted(async () => {
        await fetchProjects();
        await fetchTasks();
    });

    watch(selectedProject, (newValue) => {
      router.push({ name: 'UserHome', query: {  ...route.query, 'project_id': newValue } });
    })

    watch(() => root.$route.query.status,(newValue) => fetchTasks());
    watch(() => root.$route.query.project_id,(newValue) => fetchTasks());

    return {
        selectedProject,
        projects,
        isPending,
        tasks, 
        fetchTasks,
        currentPage,
        lastPage,
        changePage,
      };
    }
}
</script>