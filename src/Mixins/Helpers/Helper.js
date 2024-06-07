import { resolveTypeElements } from "vue/compiler-sfc";

export const required = (value) =>
  !!value || "This field is required!";

export const email = (value) => {
    if (value.trim().length==0) return true;
    return (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) || "Invalid email!"
    );
};
  
export const password = (value) =>{
  if (value.trim().length==0) return true;
  return (value.trim().length >= 6 || 'Minimum length is 6 characters');
}

export const name = (value) =>{
  if (value.trim().length==0) return true;
  if(value.trim().length > 15) return 'Max length is 15 characters'; 
}

export const confirmPassword = (value, pass) =>{
  if (value.trim().length==0) return true;
  if(value.trim().length < 6) return 'Minimum length is 6 characters'; 
  return (value == pass || 'The password confirmation does not match');
}