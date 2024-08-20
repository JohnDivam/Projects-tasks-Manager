export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

export function hasPermission(user, permission) {
    if(user.type == "superadmin"){
        return true;
    }

    
    if (!user?.permissions || !Array.isArray(user.permissions)) {
        return false;
    }

    return user.permissions.some(item => item.name.includes(permission));

}