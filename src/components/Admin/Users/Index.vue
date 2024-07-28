<template>
    <DashLayout page-title="Home">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="table-responsive">
                        <table class="table table-boordered table-hover bg-white">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>_____</th>
                                <th>_____</th>
                                <th>_____</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr v-if="users.length === 0">
                                <td colspan="5" class="text-center">No employees found</td>
                                </tr>
                                <tr else v-for="(user) in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td> 
                                    <td>{{ ''}}</td> 
                                    <td>{{ ''}}</td> 
                                    <td>{{ ''}}</td> 
                                    <td class="text-center">
                                        <router-link :to="'/user/employees/edit/'+user.id"  class="btn btn-sm">Edit</router-link>
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
import { getCurrentInstance, computed } from "vue"
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';

export default {
  props: {
  },
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const store = useStore();

        const users = [];

        return {
            user: computed(() => store.getters['userModule/getUser']),
            users
        }
    },
}
</script>
