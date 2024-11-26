const API_BASE_URL = "http://localhost:3000"; // Cambia esta URL según corresponda

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log('Email:', email, 'Password:', password); // Verificar los valores

    if (!email || !password) {
        alert("Por favor ingresa tu correo y contraseña.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData); // Verificar la respuesta del servidor
            throw new Error(errorData.message || "Error en la autenticación");
        }

        const data = await response.json();
        saveToken(data.token); // Guardar el token en localStorage
        window.location.href = "catalog.html"; // Redirige al catálogo tras el login
        localStorage.setItem('userEmail', JSON.stringify({ email: data.email}));

    } catch (error) {
        console.error("Error:", error);
        alert("Usuario o contraseña incorrectos");
    }
}

document.getElementById("login-form").addEventListener("submit", login);
