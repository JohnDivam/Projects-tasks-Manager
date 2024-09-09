<template>
    <DashLayout page-title="Employees">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <span>Users</span>
                            <router-link to="/admin/users/create" class="btn btn-success btn-sm float-right"> Add </router-link>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-boordered table-hover bg-white">
                                    <thead>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th class="text-center">Actions</th>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isPending">
                                            <td colspan="6">
                                                <v-skeleton-loader type="table-row" :loading="isPending"></v-skeleton-loader>
                                            </td>
                                        </tr>
                                        <tr v-else-if="users.length === 0">
                                        <td colspan="5" class="text-center">No users found</td>
                                        </tr>
                                        <tr else v-for="(user) in users" :key="user.id">
                                            <td>{{ user.id }}</td>
                                            <td>{{ user.name }}</td> 
                                            <td>{{ user.email }}</td> 
                                            <td>{{ user.phone }}</td> 
                                            <td class="text-center">
                                                <router-link :to="'/admin/users/edit/'+user.id"  class="btn btn-sm">Edit</router-link>
                                                <button @click="confirmDelete(user.id)" class="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <v-pagination
                        v-if="lastPage > 1"
                        v-model="currentPage"
                        :length="lastPage"
                        class="my-4"
                        @click="changePage"
                        rounded="circle"
                    ></v-pagination>
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
import { getUsers, deleteUser } from '../../../services/UsersService'

export default {
  props: {
  },
    components:{
        DashLayout,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const currentPage = ref(1);
        const lastPage = ref(1);
        const users = ref([]);
        const isPending = ref(false);

        const fetchEmployees = async (page = 1) => {
            const response = await getUsers(page, isPending);
            users.value = response.data.users.data;
            currentPage.value = response.data.users.current_page;
            lastPage.value = response.data.users.last_page;
        };

        const changePage = () => {
            if (currentPage.value >= 1 && currentPage.value <= lastPage.value) {
                fetchEmployees(currentPage.value);
            }
        };

       
        const confirmDelete = async(userId) => {
            if (confirm("Are you sure you want to delete this user?")) {
                await deleteUser(userId);
                users.value = users.value.filter(user => user.id !== userId);
            }
        };

        onMounted(() => {
            fetchEmployees();
        });

        return {
            users,
            currentPage,
            lastPage,
            changePage,
            isPending,
            confirmDelete
        }
    },
}
</script>
