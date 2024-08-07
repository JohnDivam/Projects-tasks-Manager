<template>
    <DashLayout page-title="Edit employee">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header"> <span>Edit employee</span> </div>
                        <div class="card-body">
                            <form @submit.prevent="updateEmployee">
                                <div class="row">
                                    <div class="col-md-12">
                                    <v-text-field
                                        v-model="formData.name"
                                        label="Name"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="formData.email"
                                        label="Email"
                                        type="email"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="formData.phone"
                                        label="Phone"
                                        type="tel"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="formData.password"
                                        label="Password"
                                        type="password"
                                        outlined
                                        dense
                                    ></v-text-field>

                                     <v-text-field
                                        v-model="formData.password_confirmation"
                                        label="Confirm password"
                                        type="password"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    
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
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import { find, update } from '../../../services/EmployeesService'

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
            email: '',
            phone: '',
            password: '',
            password_confirmation: ''
        });

        const updateEmployee = async()=>{
            await update(route.params.id, formData.value, root);
        }

        onMounted(async() => {
            const employee = await find(route.params.id);
            formData.value = {
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                password: '', 
                password_confirmation: ''
            };
        });
        
        return {
            formData,
            updateEmployee
        }
    },
}
</script>
