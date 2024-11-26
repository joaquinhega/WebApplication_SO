// register.js

// URL base de la API
const API_BASE_URL = "http://localhost:3000"; // Cambia esto por la URL real

// Función de registro
async function register(event) {
    event.preventDefault(); // Evita el recargo de la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validación de contraseñas
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        // Envío de datos al backend
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Error en el registro");
        }

        // Notificación y redirección al login
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html"; // Redirige al login tras el registro
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo completar el registro");
    }
}

// Agregar evento al formulario de registro
document.getElementById("register-form").addEventListener("submit", register);
