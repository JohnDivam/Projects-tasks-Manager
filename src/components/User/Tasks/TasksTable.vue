<template>
  <div class="row">
     <div class="col-md-3">
      <v-text-field
          v-model="searchQuery"
          label="Search Tasks"
          outlined
          dense
        ></v-text-field>
    </div>
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
            <tr v-if="isPending">
              <td colspan="6">
                <v-skeleton-loader type="table-row" :loading="isPending"></v-skeleton-loader>
              </td>
            </tr>
            <tr v-else-if="tasks.length === 0">
              <td colspan="6" class="text-center">No tasks found</td>
            </tr>
            <tr v-else v-for="(task) in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td> 
                <td>{{ task.priority }}</td> 
                <td>{{ task.estimated_time }}</td> 
                <td>{{ task.status.status }}</td> 
                <td class="text-center">
                    <router-link :to="'/user/tasks/show/'+task.id"  class="btn btn-sm">Show</router-link>
                    <button @click="confirmDelete(task.id)" class="btn btn-sm btn-danger">Delete</button>
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
import { ref, getCurrentInstance, onMounted, watch  } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { getProjects } from "../../../services/ProjectService";
import { getTasks,deleteTask } from "../../../services/TaskService";

export default {
    setup() {
    const root = getCurrentInstance().proxy;
    const projects = ref([]);
    const isPending = ref(false);
    const tasks = ref([]);
    const route = useRoute();
    const router = useRouter();
    const selectedProject = ref(projects.value.find(project => project.id === newValue) || null);
    const searchQuery = ref(null);
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
        const response = await getTasks(page, isPending,  root);
        tasks.value = response.data.tasks.data;
        currentPage.value = response.data.tasks.current_page;
        lastPage.value = response.data.tasks.last_page;
    }

    const changePage = () => {
        if (currentPage.value >= 1 && currentPage.value <= lastPage.value) {
            fetchTasks(currentPage.value);
        }
    };

    const confirmDelete = async(taskId) => {
      if (confirm("Are you sure you want to delete this task?")) {
          await deleteTask(taskId);
          tasks.value = tasks.value.filter(task => task.id !== taskId);
      }
    };


 
    onMounted(async () => {
        await fetchProjects();
        await fetchTasks();
    });


    watch(() => root.$route.query.status,(newValue) => fetchTasks());
    watch(() => root.$route.query.project_id,(newValue) => fetchTasks());
    watch(() => root.$route.query.search,(newValue) => {
      searchQuery.value = newValue;
      fetchTasks();
    });

    watch(searchQuery, (newValue) => {
        if(newValue != root.$route.query.search){
          router.push({ name: 'UserHome', query: { ...route.query, 'search': newValue } });
        }
    }, 300);

    watch(selectedProject, (newValue) => {
      if(newValue != root.$route.query.project_id){
        router.push({ name: 'UserHome', query: {  ...route.query, 'project_id': newValue } });
      }
    });

    return {
        selectedProject,
        projects,
        isPending,
        tasks, 
        fetchTasks,
        currentPage,
        lastPage,
        changePage,
        searchQuery,
        confirmDelete
      };
    }
}
</script>