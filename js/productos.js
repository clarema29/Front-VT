 // Función para hacer una solicitud HTTP GET con el token en el encabezado
function obtenerProductos() {

       // Verificar el rol del usuario
    if (!hasRole('ROLE_USER')) {
    
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = '/pages/cliente/login.html';
        return;
    }
    // URL del endpoint
    const url = 'http://localhost:8080/v1/api/productos';
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
            throw new Error('Error al obtener los productos');
        }
        // Parsear la respuesta como JSON
        return response.json();
    })
    .then(data => {
        // Llamar a la función para mostrar los productos
        mostrarProductos(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para mostrar los productos en la tabla
function mostrarProductos(productos) {
    const tablaProductos = document.getElementById('tabla-productos');

    // Limpiar la tabla de productos
    tablaProductos.innerHTML = '';

    // Iterar sobre cada producto y agregarlo a la tabla
    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100px; max-height: 100px;"></td>
            <td>${producto.categoriaEnum}</td>
            
            <td>${producto.enOferta ? 'En oferta' : 'No disponible'}</td>
            <td><a href="/pages/administrador/crearProductos.html?id=${producto.id}" class="button btn-warning btn-lg" id="editar">Editar</a></td>
            <td><a href="#" class="button btn-danger btn-lg" onclick="eliminarProducto(${producto.id})">Eliminar</a></td>
        `;
        tablaProductos.appendChild(tr);
    });
}

// Llamar a la función para obtener los productos cuando la página cargue
window.onload = obtenerProductos;