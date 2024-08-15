import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import handleError from './handleError';



export async function getAnalyses(){
    try {
        const response = await axios.get('/analyses');
        
        if (response.status === 200) {
            return response.data.employeeTasksCount;
        }

    } catch (error) {
        handleError(error); 
    } 
}