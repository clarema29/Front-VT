import {config} from "../config.js";

document.getElementById('registroProducto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const token = localStorage.getItem('token');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const idNumber = parseInt(id);

    //const id = (document.getElementById('id')) ? document.getElementById('id').value : null;

    console.log("Id obtenido "+idNumber);

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').src;
    const categoriaEnum = document.getElementById('categoriaEnum').value;
    const enOferta = document.getElementById('enOferta').checked;
   
    // Verificar si se está creando un nuevo producto o editando uno existente
    const url = (idNumber) ? `${config.API_URL}/productos/update/${idNumber}` : `${config.API_URL}/productos/create`;
    const method = (idNumber) ? 'PUT' : 'POST';
    const modo = (idNumber) ? 'EDITAR' : 'CREAR';

    console.log("URL: "+url);
    console.log("Method: "+method);

    // Construir el objeto JSON
    const jsonData = {
        nombre: nombre,
        descripcion: descripcion,
        cantidad: cantidad,
        precio: precio,
        imagen: imagen,
        categoriaEnum:categoriaEnum,
        enOferta: enOferta
    };

    // Realizar la solicitud HTTP usando Axios
    axios({
        method: method,
        url: url,
        data: jsonData,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(function (response) {
        // Manejar la respuesta del servidor
        console.log(response.jsonData);
        const action = (idNumber) ? 'actualizado' : 'creado';
        alert('¡Producto ' + action + ' exitosamente');
        window.location.href = '/pages/administrador/listaProuctos.html';
    })
    .catch(function (error) {
        // Manejar errores de la solicitud
        console.error('Error al registrar:', error);
    });
});
