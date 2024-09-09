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
                            <span>Employees</span>
                            <router-link to="/admin/employees/create" class="btn btn-success btn-sm float-right"> Add </router-link>
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
                                        <tr v-else-if="employees.length === 0">
                                        <td colspan="5" class="text-center">No employees found</td>
                                        </tr>
                                        <tr else v-for="(employee) in employees" :key="employee.id">
                                            <td>{{ employee.id }}</td>
                                            <td>{{ employee.name }}</td> 
                                            <td>{{ employee.email }}</td> 
                                            <td>{{ employee.phone }}</td> 
                                            <td class="text-center">
                                                <router-link :to="'/admin/employees/edit/'+employee.id"  class="btn btn-sm">Edit</router-link>
                                                <button @click="confirmDelete(employee.id)" class="btn btn-sm btn-danger">Delete</button>
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
import { getEmployees, deleteEmployee } from '../../../services/EmployeesService'

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
        const employees = ref([]);
        const isPending = ref(false);

        const fetchEmployees = async (page = 1) => {
            const response = await getEmployees(page, isPending);
            employees.value = response.data.employees.data;
            currentPage.value = response.data.employees.current_page;
            lastPage.value = response.data.employees.last_page;
        };

        const changePage = () => {
            if (currentPage.value >= 1 && currentPage.value <= lastPage.value) {
                fetchEmployees(currentPage.value);
            }
        };

       
        const confirmDelete = async(employeeId) => {
            if (confirm("Are you sure you want to delete this employee?")) {
                await deleteEmployee(employeeId);
                employees.value = employees.value.filter(employee => employee.id !== employeeId);
            }
        };

        onMounted(() => {
            fetchEmployees();
        });

        return {
            employees,
            currentPage,
            lastPage,
            changePage,
            isPending,
            confirmDelete
        }
    },
}
</script>
