<template>
    <DashLayout page-title="Create user">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header"> <span>Create new user</span> </div>
                        <div class="card-body">
                            <form @submit.prevent="createUser">
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
                                    <!-- Permissions Section -->
                                    <div class="col-md-12">
                                        <label class="d-block">Permissions</label>
                                        <label v-for="(permission, index) in availablePermissions" :key="index">
                                            <input type="checkbox"
                                                v-model="formData.permissions[permission]"
                                            >
                                            {{permission}} &nbsp;&nbsp;
                                        </label>  
                                    </div>
                                </div>

                                <v-btn type="submit" :disabled="isPending"  :loading="isPending" color="success" block>Create</v-btn>
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
import { storeUser } from '../../../services/UsersService'

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
        const availablePermissions = ref(['Projects', 'Employees', 'Users']);
        const formData = ref({
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            permissions: {}
        });

        const createUser = async()=>{
            const selectedPermissions = Object.keys(formData.value.permissions).filter(permission => formData.value.permissions[permission]);
            await storeUser({ ...formData.value, permissions: selectedPermissions }, isPending, root);
        }
        
        return {
            formData,
            createUser,
            availablePermissions
        }
    },
}
</script>
