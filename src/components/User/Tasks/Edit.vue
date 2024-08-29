<template>
    <DashLayout page-title="Edit task">
    
<div class="container">
    <div class="card">
      <div class="card-header"> 
          <span>Edit Task</span> 
          <router-link  to="/user/home" class="btn btn-sm btn-secondary text-white float-right">Back</router-link>
      </div>
      <div class="card-body">
          <form @submit.prevent="edit">
           <div class="row">
            <div class="col-md-8">
              <v-text-field
                  v-model="formData.name"
                  label="Task Name"
                  required
                  outlined
                  dense
              ></v-text-field>
            </div>
           <div class="col-md-4">
              <select v-model="formData.project_id"  :disabled="isPending" class="form-control">
                  <option value="" selected disabled>Choose project</option>
                  <option v-for="project in projects" :value="project.id" :key="project.id">{{project.name}}</option>
              </select>
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


            <div v-if="taskFiles && taskFiles.length">
                <h5>Files: </h5>
                <ul class="list-unstyled">
                    <li v-for="(file, index) in taskFiles" :key="index">
                    <a :href="file" target="_blank">{{ getFileName(file) }}</a>
                    </li>
                </ul>
            </div>
            <v-file-input
              v-model="formData.files"
              label="Upload Files"
              multiple
              outlined
              dense
            ></v-file-input>

       
            <v-btn type="submit" :disabled="isPending" :loading="isPending" color="success" block>Save </v-btn>

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
import { storeTask, getTask, update } from "../../../services/TaskService";
import { useRouter, useRoute } from 'vue-router';
export default {
  data () {
    return {
    }
  },
    components:{
        DashLayout
    },
    setup() {
    const root = getCurrentInstance().proxy;
    const selectedProject = ref(null);
    const projects = ref([]);
    const isPending = ref(false);
    const route = useRoute();
    const formData = ref({
      name: '',
      project_id: null,
      description: '',
      type: 'Feature',
      priority: 'Normal',
      hours: null,
      minutes: null,
      files: [],  
    });
    const taskTypes = ref(["Bug", "Feature"]);
    const priorities = ref(["Low", "Normal", "High", "Urgent", "Critical"]);
    const taskFiles  = ref([]);

    const fetchProjects = async() => {
      try {
        projects.value = await getProjects(isPending);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

   const edit = async () => {
     const formDataToSend = new FormData();
      formDataToSend.append('name', formData.value.name);
      formDataToSend.append('project_id', formData.value.project_id);
      formDataToSend.append('description', formData.value.description);
      formDataToSend.append('type', formData.value.type);
      formDataToSend.append('priority', formData.value.priority);
      formDataToSend.append('hours', formData.value.hours);
      formDataToSend.append('minutes', formData.value.minutes);
      if (formData.value.files && formData.value.files.length > 0) {
         const fileBase64Promises = formData.value.files.map(async (file) => {
            const base64File = await convertFileToBase64(file);
            console.log(base64File);
            formDataToSend.append('files[]', base64File);
        });
          await Promise.all(fileBase64Promises);
      }


      await update(route.params.id, formDataToSend, isPending, root);
    };

      
    const getFileName = (fileUrl) => {
        return fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    };

    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
      });
    };

    onMounted(async () => {
        await fetchProjects();
         let res = await getTask(route.params.id);
         if(res){
          let task = res.task;
          formData.value = {
              name: task.name,
              project_id: task.project_id,
              description: task.description,
              type: task.type,
              priority: task.priority,
              hours: task.hours,
              minutes: task.minutes,
          };

          taskFiles.value = task.files;
         }
        

    });

    return {
        selectedProject,
        projects,
        isPending,
        formData,
        edit,
        priorities,
        taskTypes,
        taskFiles,
        getFileName
      };
    }
}
</script>