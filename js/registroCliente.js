document.getElementById('registro-cliente').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const token = localStorage.getItem('token');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const idNumber = parseInt(id);

    //const id = (document.getElementById('id')) ? document.getElementById('id').value : null;

    console.log("Id obtenido "+idNumber);

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    const telefono = document.getElementById('telefono').value;
    const documento = document.getElementById('documento').value;
    const direccion = document.getElementById('direccion').value;
    const departamento = document.getElementById('departamento').value;
    const ciudad = document.getElementById('ciudad').value;
   
    // Verificar si se está creando un nuevo producto o editando uno existente
    const url = (idNumber) ? `http://localhost:8080/v1/api/clientes/update/${idNumber}` : 'http://localhost:8080/v1/api/clientes/create';
    const method = (idNumber) ? 'PUT' : 'POST';
    const modo = (idNumber) ? 'EDITAR' : 'CREAR';

    console.log("URL: "+url);
    console.log("Method: "+method);

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
        alert('¡Cliente ' + action + ' exitosamente');
        window.location.href = '/pages/administrador/listaClientes.html';
    })
    .catch(function (error) {
        // Manejar errores de la solicitud
        console.error('Error al registrar:', error);
    });
});
