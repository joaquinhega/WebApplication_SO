const API_BASE_URL = "http://localhost:3000"; 
// Función de recuperación de contraseña
async function recoverPassword(event) {
    event.preventDefault(); // Evita el recargo de la página

    const email = document.getElementById("email").value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/recovery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error("Error en la recuperación de contraseña");
        }

        alert("Se ha enviado un enlace de recuperación a tu correo electrónico");
        window.location.href = "login.html"; // Redirige al login tras enviar el enlace de recuperación
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo enviar el enlace de recuperación");
    }
}

// Agregar evento al formulario de recuperación
document.getElementById("recover-form").addEventListener("submit", recoverPassword);
