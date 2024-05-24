// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('id');

const idNumber = parseInt(clienteId);

// Función para obtener los detalles del producto por su ID
function obtenerDetallesCliente() {
    // URL del endpoint para obtener detalles del producto por su ID
    const url = `http://localhost:8080/v1/api/clientes/${clienteId}`;

    console.log(typeof clienteId);
    console.log(idNumber);
    console.log(typeof idNumber);
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Hacer la solicitud GET usando Fetch API
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del cliente');
        }
        return response.json();
    })
    .then(data => {
        // Llenar el formulario con los detalles del producto
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('email').value = data.email;
        document.getElementById('clave').value = data.clave;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('documento').value = data.documento;
        document.getElementById('direccion').value = data.direccion.direccion;
        document.getElementById('departamento').value = data.direccion.departamento;
        document.getElementById('ciudad').value = data.direccion.ciudad;
        
        document.getElementById('registrar-cliente').innerText = "Editar";
        document.getElementById('titulo').innerText = "Editar Cliente";
        // Deshabilitar el campo de contraseña
        document.getElementById('clave').disabled = true;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Llamar a la función para obtener los detalles del producto cuando la página cargue
window.onload = obtenerDetallesCliente;
