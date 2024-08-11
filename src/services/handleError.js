import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default function handleError(error) {
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
    }
}