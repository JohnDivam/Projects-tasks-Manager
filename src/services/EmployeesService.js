import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export async function getEmployees(page, perPage = 12){
    try {
        const response = await axios.get('/employees?perPage='+perPage+'&page='+page);

        if (response.status === 200) {
            return response;
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


export async function storeEmployee(isPending, formData, root){
    try {
        const response = await axios.post('/employees', formData);

        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                root.$router.push('/admin/employees');
            }, 2000);
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
    }
}

export async function find(id){
    try {
        const response = await axios.get('/employees/'+id);

        if (response.status === 200) {
            return response.data.employee;
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
    } 
}

export async function update(id, formData, root){
    try {
        const response = await axios.put('/employees/'+id, formData);

        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                root.$router.push('/admin/employees');
            }, 2000);
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
    } 
}