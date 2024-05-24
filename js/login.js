document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    var email = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    
    // Construye el objeto de datos a enviar
    var data = {
        email: email,
        clave: password
    };
    

    // Realiza la solicitud POST al endpoint de autenticación
    fetch('http://localhost:8080/v1/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Captura el token del objeto de respuesta
        var token = data.jwtToken;
        
        // Almacena el token en el almacenamiento local
        localStorage.setItem('token', token);
        console.log('Token almacenado:', token);
        alert('¡Inicio de sesión exitoso!');
            // Decodifica el token para obtener el rol del usuario
    const decodedToken = parseJwt(token);
    if (decodedToken.authorities.includes('ROLE_USER')) {
        // Si el usuario es administrador, redirige al listado de productos
        window.location.href = '/pages/administrador/listaProuctos.html';
    } else if (decodedToken.authorities.includes('ROLE_CLIENTE')) {     
        // Si el usuario es cliente, redirige al home
        window.location.href = '/index.html';
    } else {
        // Si el rol no está definido o no es válido, manejar de alguna manera
        console.error('Rol no válido');
        // Puedes redirigir a una página de error o realizar otra acción según sea necesario
    }

        
    })
    .catch(error => {
        // Maneja los errores de la solicitud aquí
        console.error('Error:', error);
    });
});