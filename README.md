# 🛍️ Product Manager

Aplicación web desarrollada con **Node.js**, **Express**, **MongoDB**, **Mongoose** y **Handlebars** .  
Este proyecto simula un sistema de administración de productos y carritos con persistencia en archivos en base de datos Mongo. Cuenta con interfaz visual, manejo de archivos públicos, rutas API REST y vistas dinámicas.

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

- Visualización de productos y manejo de carritos desde interfaz web.  
- Alertas personalizadas con Sweeralert2.
- Administración productos y manejar carritos con `Postman`. 
- Manejo de datos persistentes mediante base de datos Mongo y Mongoose.
---

<a id="2"></a>
## 🧱 Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| Node.js | Entorno de ejecución del servidor |
| Express.js | Framework web backend |
| Handlebars | Motor de plantillas para vistas dinámicas |
| MongoDB y Mongoose | Persistencia de datos |
| Mongoose-paginate-v2 | Paginación de productos |
| Sweeralert2 | Personalización de alertas |
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
   ├── public/
   │   ├── css/
   │   │   ├── carts.css          # Estilos para views de carritos
   │   │   ├── error.css          # Estilos pantalla de error
   │   │   ├── products.css       # Estilos para views de productos
   │   │   ├── style.css          # Estilos generales del sitio
   │   ├── js/
   │       ├── carts.js           # Lógica de manejo de carritos
   │       ├── home.js            # Scripts de Home
   │       ├── product.js         # Funciones de productos
   │       ├── singleCart.js      # Manejo de carrito individual
   │
   ├── src/
   │   ├── app.js                 # Configuracion del servidor
   │   ├── config/db.js           # Conexión a MongoDB
   │   ├── models/
   │   │   ├── cart.model.js      # Esquema de carrito
   │   │   ├── product.model.js   # Esquema de producto
   │   ├── routes/
   │       ├── carts.router.js    # Endpoints API carritos
   │       ├── products.router.js # Endpoints API productos
   │       ├── views.router.js    # Endpoints views con Handlebars
   │
   ├── views/
   │   ├── layouts/
   │   │   ├── main.handlebars    # Layout principal
   │   ├── carts.handlebars       # Vista listado de carritos
   │   ├── error.handlebars       # Vista error
   │   ├── home.handlebars        # Página principal
   │   ├── product.handlebars     # Vista de productos
   │   ├── singleCart.handlebars  # Vista de carrito individual
   │
   ├── package.json
   ├── README.md
```

---

<a id="5"></a>
## 💡 Endpoints Principales

### 📦 Productos

| Método   | Endpoint             | Descripción                                  |
| -------- | -------------------- | -------------------------------------------- |
| `GET`    | `/api/products`      | Obtiene todos los productos con paginacion   |
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
| `PUT`  | `/api/carts/:cid/products/:pid` | Actualiza la cantida de un producto en el carrito |
| `DELETE` | `/api/carts/:cid/products/:pid` | Elimina un producto de un carrito     |
| `DELETE` | `/api/carts/:cid/products/`   | Vacia el carrito                        |
| `DELETE` | `/api/carts/:cid/delete`      | Elimina un carrito                      |

Nota: Los endpoints para carritos se utilizan en Postman.

---

<a id="6"></a>
## 💬 Vistas disponibles

### Home
  * Muestra todos los productos activos.
  * Sección principal de la aplicación.

### Products/id
  * Muestra el detalle de un producto.
  * Contiene formulario para agregar al carrito.

### Carts
  * Lista todos los carritos.
  * Permite crear carritos con un botón.

### Carts/id
  * Muestra el detalle de un carrito y sus productos agregados.
  * Permite eliminar un producto del carrito.
  * Cuenta con botón para vaciar el carrito.

---

<a id="7"></a>
### 🧠 Autor

**Ernesto Morsucci**.<br>
[Repositorio](https://github.com/ernesmorsucci/product-manager).<br>
📍 Mendoza, Argentina.<br>
🔗 [GitHub](https://github.com/ernesmorsucci).
