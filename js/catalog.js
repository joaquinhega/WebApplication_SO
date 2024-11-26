// URL del API Gateway
const API_BASE_URL = "https://api-gateway.example.com"; // Cambia esto por la URL real de tu API Gateway

// Función para obtener productos desde el API Gateway
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        const products = await response.json();
        displayProducts(products); // Muestra los productos en el catálogo
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para mostrar productos en el catálogo
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Limpia el contenedor de productos

    products.forEach(product => {
        // Crear un elemento para cada producto
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;

        productContainer.appendChild(productElement);
    });
}

// Función para filtrar productos
function filterProducts(criteria) {
    // Aquí podrías hacer una solicitud al API Gateway con filtros, por ejemplo:
    fetch(`${API_BASE_URL}/products?filter=${criteria}`)
        .then(response => response.json())
        .then(filteredProducts => displayProducts(filteredProducts))
        .catch(error => console.error("Error al filtrar productos:", error));
}

// Función para ordenar productos
function sortProducts(order) {
    // Aquí podrías hacer una solicitud al API Gateway con ordenamiento, por ejemplo:
    fetch(`${API_BASE_URL}/products?sort=${order}`)
        .then(response => response.json())
        .then(sortedProducts => displayProducts(sortedProducts))
        .catch(error => console.error("Error al ordenar productos:", error));
}

// Función para agregar producto al carrito (implementación básica)
function addToCart(productId) {
    console.log("Producto agregado al carrito, ID:", productId);
    // Aquí podrías hacer otra llamada al backend para añadir el producto al carrito de compras
}

// Función para verificar si el usuario está autenticado
function checkAuth() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Si no hay token, redirige al login
        window.location.href = "login.html";
    }
}

// Función de cerrar sesión
function logout() {
    // Elimina el token del localStorage
    localStorage.removeItem("authToken");

    // Redirige al usuario a la página de login
    window.location.href = "login.html";
}

// Asignar la función logout al botón de cerrar sesión
document.getElementById("logout-button").addEventListener("click", logout);

// Llamada a la función de verificación de autenticación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    checkAuth(); // Verifica si el usuario está autenticado
    fetchProducts(); // Luego, carga los productos
});
