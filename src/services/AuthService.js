import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export async function userLogin(form, isPending, root){
    isPending.value = true;

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login',{
            'email':form.email,
            'password':form.password,
        });
        
        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token); // Store the token in localStorage

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                window.location.href = "/user/home";
            }, 2000);
        }else{
            console.log(response.status);
        }

    } catch (error) {
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
    } finally {
        isPending.value = false;
    }
    
}
