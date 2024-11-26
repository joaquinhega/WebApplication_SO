document.getElementById('fetchOrdersButton').addEventListener('click', fetchOrders);

async function fetchOrders() {
    const userId = document.getElementById('userId').value;
    const tableBody = document.getElementById('ordersTable').querySelector('tbody');

    // Limpiar tabla antes de mostrar nuevos datos
    tableBody.innerHTML = '';

    if (!userId) {
        alert("Por favor, ingresa un ID de usuario válido.");
        return;
    }

    // Obtener pedidos desde el backend
    const orders = await getOrders(userId);

    if (orders.length === 0) {
        // Si no hay pedidos, mostrar un mensaje
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 4;
        cell.innerText = 'No hay pedidos para mostrar.';
        cell.style.textAlign = 'center';
    } else {
        // Llenar la tabla con los datos de los pedidos
        orders.forEach(order => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = order.id;
            row.insertCell(1).innerText = order.status;
            row.insertCell(2).innerText = new Date(order.orderDate).toLocaleDateString();
            row.insertCell(3).innerText = `$${order.totalAmount.toFixed(2)}`;
        });
    }
}

// Función para realizar la solicitud al servidor y obtener los pedidos del usuario
async function getOrders(userId) {
    try {
        const response = await fetch(`conn.php?userId=${userId}`);
        if (!response.ok) throw new Error('Error al obtener los pedidos');

        const orders = await response.json();
        return orders.length ? orders : [];
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al obtener los pedidos.");
        return [];
    }
}
