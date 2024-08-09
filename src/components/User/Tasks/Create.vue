<template>
    <DashLayout page-title="Create task">
    
<div class="container">
    <div class="card">
      <div class="card-header"> 
          <span>Create Task</span> 
          <router-link  to="/user/home" class="btn btn-sm btn-secondary text-white float-right">Back</router-link>
      </div>
      <div class="card-body">
          <form @submit.prevent="createTask">
           <div class="row">
            <div class="col-md-4">
               <v-select
                  v-model="formData.project_id"
                  :items="projects"
                  label="Select a project"
                  item-title="name"
                  item-value="id"
                  outlined
                  dense
              ></v-select>
            </div>
            <div class="col-md-8">
              <v-text-field
                  v-model="formData.name"
                  label="Task Name"
                  required
                  outlined
                  dense
              ></v-text-field>
            </div>
           </div>
            <v-textarea
            v-model="formData.description"
                label="Task Description"
                required
                outlined
                dense
            ></v-textarea>


          

           <div class="row">
            <div class="col-md-6">
                <div class="row">
                  <div class="col">
                    <v-select
                      v-model="formData.type"
                      :items="taskTypes"
                      label="Task Type"
                      required
                      outlined
                      dense
                    ></v-select>
                  </div>
                  <div class="col">
                    <v-select
                      v-model="formData.priority"
                      :items="priorities"
                      label="Task Priority"
                      required
                      outlined
                      dense
                    ></v-select>
                  </div>
                </div>
            </div>
            <div class="col-md-6">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="formData.hours"
                      label="Hour"
                      type="number"
                      min="0"
                      max="23"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formData.minutes"
                      label="Minute"
                      type="number"
                      min="0"
                      max="59"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
            </div>
           </div>


            <v-file-input
              v-model="formData.files"
              label="Upload Files"
              multiple
              outlined
              dense
            ></v-file-input>

       
            <v-btn type="submit" :disabled="isPending" :loading="isPending" color="success" block>Create Task</v-btn>

          </form>
      </div>
    </div>
</div>


    </DashLayout>
</template>

<script>
import DashLayout from '../../layouts/DashLayout.vue';
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
import { getProjects } from "../../../services/ProjectService";
import { storeTask } from "../../../services/TaskService";
export default {
    components:{
        DashLayout
    },
    setup() {
    const root = getCurrentInstance().proxy;
    const selectedProject = ref(null);
    const projects = ref([]);
    const isPending = ref(false);
    const formData = ref({
      name: '',
      project_id: null,
      description: '',
      type: 'Feature',
      priority: 'Normal',
      hours: null,
      minutes: null,
      files: null,  
    });
    const taskTypes = ref(["Bug", "Feature"]);
    const priorities = ref(["Low", "Normal", "High", "Urgent", "Critical"]);

    const fetchProjects = async() => {
      try {
        projects.value = await getProjects();
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

   const createTask = async () => {
      isPending.value = true;
      await storeTask(formData.value, root);
    };

    onMounted(async () => {
        await fetchProjects();
    });


    return {
        selectedProject,
        projects,
        isPending,
        formData,
        createTask,
        priorities,
        taskTypes
        };
    }
}
</script>