<template>
    <DashLayout page-title="Home">
    
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

export default {
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const route = useRoute();
        const isPending =ref(false);
        const formData = ref({
            name: '',
            logo: null,
        });
        const logoFile = ref(null); // Separate ref for the file input

        const updateProject = async()=>{
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.value.name);
            if(logoFile.value) {
                formDataToSend.append('logo', logoFile.value);
            }

            await update(route.params.id, formDataToSend, root);
        }

        onMounted(async() => {
            const project = await find(route.params.id);
            formData.value = {
                name: project.name,
                logo: project.logo,
            };
        });
        
        return {
            formData,
            updateProject,
            logoFile
        }
    },
}
</script>
