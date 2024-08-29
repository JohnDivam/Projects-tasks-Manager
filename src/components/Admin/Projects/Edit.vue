<template>
    <DashLayout page-title="Edit project">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header"> <span>Edit project</span> </div>
                        <div class="card-body">
                            <form @submit.prevent="updateProject">
                                <div class="row">
                                    <div class="col-md-12">
                                    <v-text-field
                                        v-model="formData.name"
                                        label="Name"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>

                                     <v-file-input
                                        v-model="logoFile"
                                        label="Upload logo"
                                        outlined
                                        dense
                                    ></v-file-input>

                                    <div v-if="formData.logo" class="mb-3">
                                        <img :src="formData.logo" alt="Project Logo"  height="150" />
                                    </div>
                                    
                                    </div>
                                </div>

                                <v-select
                                    v-model="formData.user_ids"
                                    :items="employees"
                                    item-title="name"
                                    item-value="id"
                                    label="Select employees"
                                    multiple
                                    outlined
                                    dense
                                ></v-select>

                                <v-btn type="submit" :disabled="isPending" color="success" block> Save </v-btn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </DashLayout>
</template>


<script>

import DashLayout from '../../layouts/DashLayout.vue';
import SideBar from '../SideBar.vue';
import { getCurrentInstance, computed, onMounted, ref, reactive } from "vue"
import { useRoute } from 'vue-router';
import { find, update } from '../../../services/ProjectService'
import { getEmployees } from '../../../services/EmployeesService'

export default {
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const route = useRoute();
        const isPending =ref(false);
        const employees = ref([]);
        const formData = ref({
            name: '',
            logo: null,
            user_ids: [], 
        });
        const logoFile = ref(null); // Separate ref for the file input

        const updateProject = async()=>{
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.value.name);
            if(logoFile.value) {
                formDataToSend.append('logo', await convertFileToBase64(logoFile.value));
            }
            formData.value.user_ids.forEach(user_id => {
                formDataToSend.append('user_ids[]', user_id);
            });

            await update(route.params.id, formDataToSend, isPending, root);
        }

        const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(e);
                reader.readAsDataURL(file);
            });
        };

        onMounted(async() => {
            const response = await getEmployees(1, isPending, 1000);
            employees.value = response.data.employees.data;
            const project = await find(route.params.id);
            formData.value = {
                name: project.name,
                logo: project.logo,
                user_ids: project.userProjectAccess.map(access => access.user_id), 
            };
        });
        
        return {
            formData,
            updateProject,
            logoFile,
            employees
        }
    },
}
</script>
