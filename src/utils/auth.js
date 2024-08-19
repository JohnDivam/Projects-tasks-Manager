export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

export function hasPermission(user, permission) {
    if(user.type == "superadmin"){
        return true;
    }

    console.log(user);
    return user.permissions.some(item =>item.name.includes(permission));

}