import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export async function clientLogin(form, isPending, root){
    isPending.value = true;

    const response = await axios.post('auth/client/login',{
        'email':form.email,
        'password':form.password,
    });
     
    
    if(response.status=== 200){
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
        });

        setTimeout(() => {
           window.location.href = "/user/home";
        }, 2000);
    }
    else if(response.status===401){
       toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    else if(response.status==422){
        for(let i in response.data.errors){
            toast.warning(response.data.errors[i][0], {
                position: "top-right",
                autoClose: 3000,
            });
        }
    } 
    else{
        toast.error("Somethingn went wrong! Please try again.", {
            position: "top-right",
            autoClose: 3000,
            //rtl: false
        });
    }

    isPending.value = false;
    
}
