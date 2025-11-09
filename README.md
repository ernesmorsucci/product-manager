# 🛍️ Product Manager

Aplicación web desarrollada con **Node.js**, **Express** y **Handlebars** que permite gestionar productos en tiempo real mediante **Socket.io**.  
Este proyecto simula un sistema de administración de productos con persistencia en archivos JSON y comunicación dinámica entre cliente y servidor.

---

### 🚦 Navegación rápida

[`🚀 Características`](#1) │
[`🧱 Tecnologías`](#2) │
[`⚙️ Instalación`](#3) │
[`📁 Estructura`](#4) │
[`💡 Endpoints`](#5) │
[`💬 Vistas`](#6) │
[`🧠 Autor`](#7)

---

<a id="1"></a>
## 🚀 Características principales

- Visualización de productos en tiempo real.  
- Alta y baja de productos desde la interfaz web.  
- Eliminación instantánea sin necesidad de recargar la página.  
- Actualizar productos y manejar carritos con `Postman`. 
- Manejo de datos persistentes mediante archivos JSON.  
- Generación de IDs únicos con el módulo nativo `crypto`.  
- Comunicación bidireccional cliente-servidor con `Socket.io`.

---

<a id="2"></a>
## 🧱 Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| Node.js | Entorno de ejecución del servidor |
| Express.js | Framework web backend |
| Handlebars | Motor de plantillas para vistas dinámicas |
| Socket.io | Comunicación en tiempo real |
| File System (fs) | Lectura/escritura de archivos locales |
| Crypto | Generación de identificadores únicos |
| HTML5, CSS3 y JavaScript | Interfaz de usuario |

---

<a id="3"></a>
## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/ernesmorsucci/product-manager.git
   cd product-manager

2. **Instalar dependencias**

   ```bash
   npm install

3. **Iniciar el servidor**

   ```bash
   node ./src/app.js

4. **Abrir en el navegador**

   ```bash
   http://localhost:8080/

---

<a id="4"></a>
## 📁 Estructura del Proyecto

   ```pgsql
  product-manager/
  │
  ├── src/
  │   ├── app.js                     # Configuración principal del servidor Express y Socket.io
  │   ├── productManager.js          # Lógica para manejo de productos
  │   ├── cartManager.js             # Lógica para manejo de carritos
  │   ├── routes/
  │   │   ├── products.router.js     # Rutas de productos
  │   │   └── carts.router.js        # Rutas de carritos
  │   │   └── views.router.js        # Rutas de views
  │   ├── data/
  │   │   ├── products.json          # Persistencia de datos para productos
  │   │   └── carts.json             # Persistencia de datos para carritos
  │   ├── views/
  │   │   ├── layouts/
  │   │   │   └── index.handlebars   # Layout principal
  │   │   ├── home.handlebars        # View principal (Home)
  │   │   └── realTimeProducts.handlebars # View de productos en tiempo real
  │   └── public/
  │       └── css/
  │           └── styles.css         # Estilos globales
  │
  ├── package.json
  └── README.md
```

---

<a id="5"></a>
## 💡 Endpoints Principales

### 📦 Productos

| Método   | Endpoint             | Descripción                                  |
| -------- | -------------------- | -------------------------------------------- |
| `GET`    | `/api/products`      | Obtiene todos los productos                  |
| `GET`    | `/api/products/:pid` | Obtiene un producto por su ID (solo Postman) |
| `POST`   | `/api/products`      | Agrega un nuevo producto                     |
| `PUT`    | `/api/products/:pid` | Edita un producto por ID (solo Postman)      |
| `DELETE` | `/api/products/:pid` | Elimina un producto por ID                   |

### 🛒 Carritos

| Método | Endpoint                        | Descripción                             |
| ------ | ------------------------------- | --------------------------------------- |
| `GET`  | `/api/carts/:cid/products`      | Lista todos los productos de un carrito |
| `POST` | `/api/carts`                    | Crea un nuevo carrito                   |
| `POST` | `/api/carts/:cid/products/:pid` | Agrega un producto a un carrito         |

Nota: Los endpoints para carritos se utilizan en Postman.

---

<a id="6"></a>
## 💬 Vistas disponibles

### Home
  * Muestra todos los productos activos.
  * Sección principal de la aplicación.

### RealTimeProducts
  * Permite agregar y eliminar productos en tiempo real.
  * El contenido se actualiza automáticamente mediante WebSockets.

---

<a id="7"></a>
### 🧠 Autor

**Ernesto Morsucci**.<br>
[Repositorio](https://github.com/ernesmorsucci/product-manager).<br>
📍 Mendoza, Argentina.<br>
🔗 [GitHub](https://github.com/ernesmorsucci).
