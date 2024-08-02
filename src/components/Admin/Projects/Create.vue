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
        const formData = ref({
            name: null,
            logo: null,
        });

        const createProject = async()=>{
            isPending.value = true;
            await store(formData.value, root);
        }
        
        return {
            formData,
            createProject
        }
    },
}
</script>
