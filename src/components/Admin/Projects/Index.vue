<template>
    <DashLayout page-title="Projects">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="text-right">
                        <router-link to="/admin/projects/create" class="btn btn-success mb-2"> Add </router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-boordered table-hover bg-white">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Logo</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr v-if="isPending">
                                    <td colspan="6">
                                        <v-skeleton-loader type="table-row" :loading="isPending"></v-skeleton-loader>
                                    </td>
                                </tr>
                                <tr v-else-if="projects.length === 0">
                                    <td colspan="5" class="text-center">No projects found</td>
                                </tr>
                                <tr else v-for="(project) in projects" :key="project.id">
                                    <td>{{ project.id }}</td>
                                    <td>{{ project.name }}</td> 
                                    <td> <img :src="project.logo" alt="" height="50"> </td> 
                                    <td class="text-center">
                                        <router-link :to="'/admin/projects/edit/'+project.id"  class="btn btn-sm">Edit</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import { getCurrentInstance, computed, onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import { getProjects } from '../../../services/ProjectService'

export default {
  props: {
  },
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const projects = ref([]);
        const isPending = ref(false);
       
        onMounted( async() => {
            projects.value = await getProjects(isPending);
        });

        return {
            projects,
            isPending
        }
    },
}
</script>
