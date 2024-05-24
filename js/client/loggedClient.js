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

function mostrarNombreUsuario() {
    const nombreUsuarioElemento = document.getElementById('nombre-cliente');
  
    if (nombreUsuarioElemento) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem('token');
  
      if (token) {
        // Decodifica el token para obtener el nombre del usuario
        const decodedToken = parseJwt(token);
  
        // Verifica si el token contiene el nombre del usuario
        if (decodedToken && decodedToken.nombre) {
          const nombreUsuario = decodedToken.nombre;
  
          // Actualiza el contenido del elemento con el nombre del usuario
          nombreUsuarioElemento.textContent = nombreUsuario;
        } else {
          console.error('El token no contiene el nombre del usuario.');
        }
      } else {
        console.error('No hay un token almacenado en el localStorage.');
      }
    } else {
      console.error('El elemento "nombre-usuario" no se encontró en la página.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    mostrarNombreUsuario();
  });