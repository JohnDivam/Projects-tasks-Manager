<template>
     <AppLayout page-title="Login">
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <h1 class="mb-3 mt-3">Sign into your account</h1>
                        <h4 class="text-muted">There are many variations of passages of Lorem Ipsum </h4>
                        <p class="text-muted">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        </p>
                    </div>
                    <div class="col-md-5">
                        <v-form  ref="form" class="w-75 ml-auto mt-4" v-model="valid"  :lazy-validation="false" >
                            <v-text-field
                            v-model="loginForm.email"
                            :rules="[required,email]"
                            label="E-mail"
                            type="email"
                            class="site-input-radius"
                            prepend-inner-icon="mdi-email-outline"
                            variant="outlined"
                            ></v-text-field>

                            <v-text-field
                                v-model="loginForm.password"
                                :rules="[required,password]"
                                :append-icon="loginForm.showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="loginForm.showPass ?   'text' : 'password'"
                                label="Password"
                                class="site-input-radius"
                                prepend-inner-icon="mdi-lock-outline"
                                variant="outlined"
                                @click:append="loginForm.showPass = !loginForm.showPass"
                                autocomplete="new-password"
                            ></v-text-field>

                            <router-link  to="/forget-password">Forget password ? </router-link >
                        

                            <v-btn type="submit" 
                                :disabled="!valid || isPending"
                                :loading="isPending"
                                @click.prevent="login" block class="mt-4 btn-site"
                            >Submit</v-btn>
                            
                           
                        </v-form>
                    </div>
                </div>
            </div>
        </div>
     </AppLayout>
</template>


<script>

import AppLayout from '../../layouts/AppLayout.vue';
import { computed, reactive, ref, getCurrentInstance, watchEffect } from "vue";
import { userLogin } from "../../../services/AuthService";
import { required,  password, email} from "../../../Mixins/Helpers/Helper.js";

export default {
    name: 'Login',
    components:{
        AppLayout,
    },
    data() {
        return {
        valid: false,
        };
    },
    setup(props, { emit }) {
        const root = getCurrentInstance().proxy;

        const isPending = ref(false);
        const loginForm  = reactive({
            email:'',
            password:'',
            showPass: false
        });

        
        const login = async() => {
            userLogin(loginForm, isPending, root);
        };

        return {
            loginForm,
            login,
            isPending,
            required: (value) => required(value),
            email: (value) => email(value),
            password: (value) => password(value),
        }
    },
}
</script>
