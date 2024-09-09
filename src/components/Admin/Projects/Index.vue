<template>
    <DashLayout page-title="Projects">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <span>Projects</span>
                            <router-link to="/admin/projects/create" class="btn btn-success btn-sm float-right"> Add </router-link>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-boordered table-hover bg-white">
                                    <thead>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Logo</th>
                                        <th class="text-center">Actions</th>
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
                                                <button @click="confirmDelete(project.id)" class="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
import { getCurrentInstance, computed, onMounted, ref } from "vue"
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import { getProjects, deleteProject } from '../../../services/ProjectService'

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
       
        const confirmDelete = async(projectId) => {
            if (confirm("Are you sure you want to delete this project?")) {
                await deleteProject(projectId);
                projects.value = projects.value.filter(project => project.id !== projectId);
            }
        };

        onMounted( async() => {
            projects.value = await getProjects(isPending);
        });

        return {
            projects,
            isPending,
            confirmDelete
        }
    },
}
</script>
