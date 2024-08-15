<template>
    <DashLayout page-title="Create project">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header"> <span>Create new Project</span> </div>
                        <div class="card-body">
                            <form @submit.prevent="createProject">
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
                                        v-model="formData.logo"
                                        label="Upload logo"
                                        outlined
                                        dense
                                    ></v-file-input>

                                    <v-select
                                        v-model="formData.user_ids"
                                        :items="employees"
                                        item-title="name"
                                        item-value="id"
                                        label="Select Users"
                                        multiple
                                        outlined
                                        dense
                                    ></v-select>

                                    </div>
                                </div>

                                <v-btn type="submit" :disabled="isPending" color="success" block>Create</v-btn>
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
import { useRouter, useRoute } from 'vue-router';
import { store } from '../../../services/ProjectService'
import { getEmployees } from '../../../services/EmployeesService'

export default {
  props: {
  },
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const isPending =ref(false);
        const employees = ref([]);
        const formData = ref({
            name: null,
            logo: null,
            user_ids: [], 
        });

        const createProject = async()=>{
            await store(formData.value, isPending, root);
        }
        
        onMounted(async() => {
            const response = await getEmployees(1, isPending, 1000);
            employees.value = response.data.employees.data;
        });

        return {
            formData,
            createProject,
            employees
        }
    },
}
</script>
