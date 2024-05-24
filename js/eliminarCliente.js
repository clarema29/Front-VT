// Obtener el ID del cliente de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

const idNumber = parseInt(clienteId);

function eliminarCliente(clienteId){
    const url = `http://localhost:8080/v1/api/clientes/delete/${clienteId}`;

    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
     
    .then(response => {
        if (response.status === 204) {
            console.log('Cliente eliminado.');
            alert('cliente eliminado.')
            obtenerClientes();
        }else {
            throw new Error('Error al eliminar el cliente.')
        }
        
    })

    .catch(error => {
        console.error('Error:', error);
    });

}