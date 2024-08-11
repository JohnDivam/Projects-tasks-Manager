import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import handleError from './handleError';

export async function userLogin(form, isPending, root){
    isPending.value  = true;
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
        handleError(error);
    }
    finally{
        isPending.value  = false;
    }
    
}
