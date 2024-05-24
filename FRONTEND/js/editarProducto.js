import { config } from "../config.js";
// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

const idNumber = parseInt(productoId);

// Función para obtener los detalles del producto por su ID
function obtenerDetallesProducto() {
    // URL del endpoint para obtener detalles del producto por su ID
    const url = `${config.API_URL}/productos/${productoId}`;

    console.log(typeof productoId);
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
            throw new Error('Error al obtener los detalles del producto');
        }
        return response.json();
    })
    .then(data => {
        // Llenar el formulario con los detalles del producto
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('descripcion').value = data.descripcion;
        document.getElementById('cantidad').value = data.cantidad;
        document.getElementById('precio').value = data.precio;
        document.getElementById('categoriaEnum').value = data.categoriaEnum;
        // Mostrar la imagen del producto si está disponible
       // if (data.imagen) {
            // Suponiendo que tienes un elemento <img> con ID "imagen"
            document.getElementById('imagen').src = data.imagen;
       // }
        document.getElementById('enOferta').checked = data.enOferta;
        document.getElementById('crear-producto').innerText = "Editar";
        document.getElementById('titulo-form').innerText = "Editar Producto";
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Llamar a la función para obtener los detalles del producto cuando la página cargue
window.onload = obtenerDetallesProducto;
