<template>
    <DashLayout page-title="Create employee">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header"> <span>Create new employee</span> </div>
                        <div class="card-body">
                            <form @submit.prevent="createEmployee">
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
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>

                                     <v-text-field
                                        v-model="formData.password_confirmation"
                                        label="Confirm password"
                                        type="password"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                    
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
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import { storeEmployee } from '../../../services/EmployeesService'

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
        const isPending =ref(false);
        const formData = ref({
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: ''
        });

        const createEmployee = async()=>{
            await storeEmployee(isPending, formData.value, root);
        }
        
        return {
            formData,
            createEmployee
        }
    },
}
</script>
