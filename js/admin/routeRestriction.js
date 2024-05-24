// Función para obtener el token desde el almacenamiento local
function getToken() {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Imprimir el token en la consola
    return token;
}

// Función para decodificar el token JWT
function parseJwt(token) {
    const decodedToken = token && token.split('.')[1];
    if (!decodedToken) {
        console.log('Token no válido'); // Imprimir si el token no es válido
        return null;
    }

    try {
        const base64 = decodedToken.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const parsedPayload = JSON.parse(jsonPayload);
        console.log('Token decodificado:', parsedPayload); // Imprimir el token decodificado en la consola
        return parsedPayload;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

// Función para verificar el rol del usuario
function hasRole(role) {
    const token = getToken();
    if (!token) return false;

    const decodedToken = parseJwt(token);
    console.log('Usuario:', decodedToken.sub); // Imprimir el usuario en la consola
    console.log('Rol:', decodedToken.authorities); // Imprimir el rol en la consola
    // Verificar si el rol está presente en las authorities del token
    return decodedToken.authorities && decodedToken.authorities.includes(role);
}