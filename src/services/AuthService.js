import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export async function userLogin(form,root){
    try {
        const response = await axios.post('/login', {
            'email':form.email,
            'password':form.password,
        });
        
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token); 
            root.$store.commit('userModule/setUser', response.data.user);

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                const redirect = root.$route.query.redirect || '/user/home';
                root.$router.push(redirect);
            }, 2000);
        }

    } catch (error) {
        console.log(error);
        if (error.response) {
            const response = error.response;
            if (response.status === 401 || response.data.message) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else if (response.status === 422) {
                for (let i in response.data.errors) {
                    toast.warning(response.data.errors[i][0], {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } else {
                toast.error("Something went wrong! Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } else if (error.request) {
            toast.error("No response from the server. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    } 
    
}
