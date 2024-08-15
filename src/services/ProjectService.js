import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import handleError from './handleError';

export async function getProjects(isPending){
    isPending.value = true;
    try {
        const response = await axios.get('/projects');
        
        if (response.status === 200) {
            return response.data.projects;
        }

    } catch (error) {
        handleError(error);
    } 
    finally{
        isPending.value = false;
    }
    
}

export async function store(formData, isPending, root){
    isPending.value  = true;
    try {
        const response = await axios.post('/projects', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                root.$router.push('/admin/projects');
            }, 2000);
        }
    } catch (error) {
        handleError(error);
    }
    finally{
        isPending.value  = false;
    }
    
}

export async function find(id){
    try {
        const response = await axios.get('/projects/'+id);

        if (response.status === 200) {
            return response.data.project;
        }

    } catch (error) {
        handleError(error);
    } 
}

export async function update(id, formData, isPending, root){
    isPending.value  = true;
    try {
        const response = await axios.put('/projects/'+id, formData);

        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                root.$router.push('/admin/projects');
            }, 2000);
        }

    } catch (error) {
        handleError(error);
    } 
    finally{
        isPending.value  = false;
    }
}

export async function deleteProject(id){
    try {
        const response = await axios.delete('/projects/'+id);

        if (response.status === 200) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });
        }

    } catch (error) {
        handleError(error);
    } 
}
