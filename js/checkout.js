// checkout.js

// Token fijo para pruebas (solo para desarrollo; no usar en producción)
const token = 'mi_token_fijo_para_pruebas';

// Función para enviar la orden
function enviarOrden() {
    // Obtener los valores del formulario
    const cardNumber = document.getElementById('card_number').value;
    const validAt = document.getElementById('valid_at').value;
    const documentNumber = document.getElementById('document_number').value;

    // Datos estáticos de la orden con valores dinámicos en payments
    const orderData = {
        user_id: '12345', // ID del usuario
        item_id: '67890', // ID del ítem
        payment: {
            method: 'credit_card',
            card_number: cardNumber,
            valid_at: validAt,
            document_number: documentNumber
        }
    };

    // Realizar la solicitud POST
    fetch('http://localhost:3001/api/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Token para autorización
        },
        body: JSON.stringify(orderData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Orden creada exitosamente:', data);

            // Redirigir a la página de estado con éxito
            window.location.href = "status.html?success=true";
        })
        .catch(error => {
            console.error('Hubo un error al crear la orden:', error);

            // Redirigir a la página de estado con fracaso
            window.location.href = "status.html?success=false";
        });
}

// Agregar un listener al botón de compra
document.getElementById('botonComprar').addEventListener('click', enviarOrden);
