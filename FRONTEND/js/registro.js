import { config } from "../config.js";

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    const telefono = document.getElementById('telefono').value;
    const documento = document.getElementById('documento').value;
    const direccion = document.getElementById('direccion').value;
    const departamento = document.getElementById('departamento').value;
    const ciudad = document.getElementById('ciudad').value;

    // Construir el objeto JSON
    const jsonData = {
        nombre: nombre,
        email: email,
        clave: clave,
        telefono: telefono,
        documento: documento,
        direccion: {
            direccion: direccion,
            departamento: departamento,
            ciudad: ciudad
        }
    };

    // Realizar la solicitud HTTP POST usando Axios
    axios.post(`${config.API_URL}/clientes/create`, jsonData)
        .then(function (response) {
            // Manejar la respuesta del servidor
            console.log(response.jsonData);
            alert('¡Usuario registrado!');
            window.location.href = '/pages/cliente/login.html';
        })
        .catch(function (error) {
            // Manejar errores de la solicitud
            console.error('Error al registrar:', error);
        });
});
