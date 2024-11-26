// Guardar el token en el localStorage
function saveToken(token) {
    localStorage.setItem("authToken", token);
}

// Obtener el token del localStorage
function getToken() {
    return localStorage.getItem("authToken");
}

// Eliminar el token del localStorage (logout)
function clearToken() {
    localStorage.removeItem("authToken");
}

// Redireccionar si no hay un token válido
function checkAuth() {
    if (!getToken()) {
        window.location.href = "login.html"; // Redirige a la página de login si no hay token
    }
}
