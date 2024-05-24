import { config } from "../config.js";

// Obtener el ID del cliente de la URL
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('id');

const idNumber = parseInt(clienteId);

function eliminarCliente(clienteId){
    const url = `${config.API_URL}/clientes/delete/${clienteId}`;

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
            window.location.reload(); 
        }else {
            throw new Error('Error al eliminar el cliente.')
        }
        
    })

    .catch(error => {
        console.error('Error:', error);
    });

}

window.eliminarCliente = eliminarCliente;
