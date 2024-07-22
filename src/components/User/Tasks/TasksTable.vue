<template>
    
  <div class="row">
    <div class="col-md-3">
      <v-select
          v-model="selectedProject"
          :items="projects"
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
  </div>

</template>

<script>
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
import { getProjects } from "../../../services/ProjectService";
import { getTasks } from "../../../services/TaskService";

export default {
    setup() {
    const root = getCurrentInstance().proxy;
    const selectedProject = ref(null);
    const projects = ref([]);
    const isPending = ref(false);
    const tasks = ref([]);

    const fetchProjects = async() => {
      try {
        await getProjects(isPending, projects, root);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    const fetchTasks = async() => {
      try {
        await getTasks(tasks, selectedProject, root);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    onMounted(async () => {
        await fetchProjects();
        await fetchTasks();
    });

    watch(selectedProject, (newValue) => fetchTasks())

    watch(() => root.$route.query.status,(newStatus) => fetchTasks());

    return {
        selectedProject,
        projects,
        isPending,
        tasks, 
        fetchTasks,
        };
    }
}
</script>