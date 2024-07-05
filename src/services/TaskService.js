import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export async function getTasks(tasks, selectedProject, root){
    try {
        const response = await axios.get('/tasks',{
            params: {
                'project_id': selectedProject.value
            }
        });
        
        if (response.status === 200) {
            tasks.value = response.data.tasks;
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


export async function storeTask(isPending, taskData, root){
    isPending.value = true;

    try {
        const response = await axios.post('/tasks',taskData);
        
        if (response.status === 200 && response.data.status == true) {
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
    finally {
        isPending.value = false;
    }
    
    
}
