 // Función para hacer una solicitud HTTP GET con el token en el encabezado
function obtenerClientes() {

      // Verificar el rol del usuario
    if (!hasRole('ROLE_USER')) {
        
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = '/pages/cliente/login.html';
        return;
    }

    // URL del endpoint
    const url = 'http://localhost:8080/v1/api/clientes/all';
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Hacer la solicitud GET usando Fetch API
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        }
    })
    .then(response => {
        // Verificar si la respuesta fue exitosa (código de estado 200)
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        // Parsear la respuesta como JSON
        return response.json();
    })
    .then(data => {
        // Llamar a la función para mostrar los productos
        mostrarClientes(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para mostrar los productos en la tabla
function mostrarClientes(clientes) {
    const tablaClientes = document.getElementById('tabla-clientes');

    // Limpiar la tabla de productos
    tablaClientes.innerHTML = '';

    // Iterar sobre cada producto y agregarlo a la tabla
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.direccion.direccion}</td>
            <td>${cliente.direccion.departamento}</td>
            <td>${cliente.direccion.ciudad}</td>
            <td><a href="/pages/administrador/registrarCliente.html?id=${cliente.id}" class="button btn-warning btn-lg" id="editar">Editar</a></td>
            <td><a href="#" class="button btn-danger btn-lg" onclick="eliminarCliente(${cliente.id})">Eliminar</a></td>
        `;
        tablaClientes.appendChild(tr);
    });
}

// Llamar a la función para obtener los productos cuando la página cargue
window.onload = obtenerClientes;