<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";     // Cambia esto a tu nombre de usuario de MySQL
$password = "";   // Cambia esto a tu contraseña de MySQL
$dbname = "ventas_en_linea";

$userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión a la base de datos']));
}

$sql = "SELECT id, estado AS status, fecha_pedido AS orderDate, total AS totalAmount FROM pedidos WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);

$stmt->close();
$conn->close();
?>
