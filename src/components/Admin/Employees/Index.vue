<template>
    <DashLayout page-title="Employees">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="text-right">
                        <router-link to="/admin/employees/create" class="btn btn-success mb-2"> Add </router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-boordered table-hover bg-white">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr v-if="employees.length === 0">
                                <td colspan="5" class="text-center">No employees found</td>
                                </tr>
                                <tr else v-for="(employee) in employees" :key="employee.id">
                                    <td>{{ employee.id }}</td>
                                    <td>{{ employee.name }}</td> 
                                    <td>{{ employee.email }}</td> 
                                    <td>{{ employee.phone }}</td> 
                                    <td class="text-center">
                                        <router-link :to="'/admin/employees/edit/'+employee.id"  class="btn btn-sm">Edit</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        const currentPage = ref(1);
        const lastPage = ref(1);
        const employees = ref([]);

        const fetchEmployees = async (page = 1) => {
            const response = await getEmployees(page);
            employees.value = response.data.employees.data;
            currentPage.value = response.data.employees.current_page;
            lastPage.value = response.data.employees.last_page;
        };

        const changePage = () => {
            if (currentPage.value >= 1 && currentPage.value <= lastPage.value) {
                fetchEmployees(currentPage.value);
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
        }
    },
}
</script>
