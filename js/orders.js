$(document).ready(function () {
    const token = localStorage.getItem('authToken'); // Obtener el token de autenticación

    if (!token) {
        alert("Por favor, inicia sesión para ver tus compras.");
        window.location.href = 'login.html'; // Redirigir al login si no hay token
        return;
    }

    // Hacer una solicitud GET a la API para obtener las compras anteriores
    $.ajax({
        url: 'http://localhost:3001/api/v1/orders', // URL con el puerto correcto
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}` // Enviar el token en los encabezados
        },
        success: function (data) {
            if (!data || data.length === 0) {
                $('#orders-list').html('<p class="text-center">No tienes compras anteriores.</p>');
            } else {
                data.forEach(order => {
                    // Extraer y formatear datos relevantes
                    const orderId = order._id;
                    const paymentMethod = order.payment?.method || 'Desconocido';
                    const cardNumber = order.payment?.card_number
                        ? `**** **** **** ${order.payment.card_number.slice(-4)}`
                        : 'N/A';
                    const createdAt = new Date(order.created_at).toLocaleString();

                    // Construir el HTML para mostrar cada pedido
                    const orderHTML = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Pedido ID: ${orderId}</h5>
                                    <p class="card-text">Método de Pago: ${paymentMethod}</p>
                                    <p class="card-text">Tarjeta: ${cardNumber}</p>
                                    <p class="card-text">Creado el: ${createdAt}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#orders-list').append(orderHTML);
                });
            }
        },
        error: function () {
            $('#orders-list').html('<p class="text-center">Hubo un error al cargar tus compras.</p>');
        }
    });
});
