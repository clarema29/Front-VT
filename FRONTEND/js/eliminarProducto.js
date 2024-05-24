import { config } from "../config.js";

// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

const idNumber = parseInt(productoId);

function eliminarProducto(productoId){
    const url = `${config.API_URL}/productos/delete/${productoId}`;

    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    .then(response => {
        if (response.status === 204) {
            console.log('Producto eliminado.');
            alert('Producto eliminado.')
            window.location.reload(); 
        }else {
            throw new Error('Error al eliminar el producto.')
        }
        
    })

    .catch(error => {
        console.error('Error:', error);
    });

}

window.eliminarProducto = eliminarProducto;