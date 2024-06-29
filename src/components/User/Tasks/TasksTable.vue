<template>
    
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

<div class="table-responsive">
<table class="table table-boordered table-hover bg-white">
    <thead>
        <th>#</th>
        <th>Title</th>
        <th>Actions</th>
    </thead>
    <tbody>
        <tr v-if="tasks.length === 0">
        <td colspan="3" class="text-center">No tasks found</td>
        </tr>
        <tr else v-for="(task) in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.name }}</td> <!-- Adjust 'task.title' to match your task object structure -->
            <td class="text-center">
                <a href="#" class="btn btn-sm">Show</a>
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