# 🖤 BLACKSTORE — Aplicación Web Modularizada

> Tienda de moda urbana oscura. Todo en negro, sin excepciones.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)
![GitHub](https://img.shields.io/badge/GitHub-Repositorio-181717?style=flat&logo=github)

---

## 📌 Descripción general del negocio

**BLACKSTORE** es una tienda de ropa urbana especializada en prendas de color negro. Ofrece hoodies, camisetas, pantalones y chaquetas con estética streetwear y minimalista. La aplicación web permite gestionar el inventario de productos de forma modular, con operaciones CRUD completas simuladas mediante LocalStorage.

**Objetivo de la aplicación:** Construir una plataforma de gestión interna para BLACKSTORE usando Vue 3 y Bootstrap 5, aplicando principios de modularización, componentización y buenas prácticas de desarrollo web.

---

## 👥 Integrantes del equipo

| Rol | Nombre| Codigo | Responsabilidad principal |
|-----|--------|--------------------------|
| 🧑‍💻 Desarrollador 1 | **Josue Garcia Rodriguez ** |** 0192525 **| Login, view, router |
| 🧑‍💻 Desarrollador 2 | **Gabriel Garcia Rodriguez ** |** 0192524 **| Component,product, services |

---

## 🗂️ Estructura del proyecto

```
segundo-parcial-des-app-web/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/                        # Recursos estáticos (imágenes, fuentes)
│   │
│   ├── components/                    # Componentes reutilizables
│   │   ├── NavbarComponent.vue        # Encabezado superior con logo BLACKSTORE
│   │   ├── SidebarComponent.vue       # Menú lateral con rutas y filtros
│   │   ├── FooterComponent.vue        # Pie de página con derechos reservados
│   │   └── ProductCardComponent.vue   # Tarjeta individual de producto
│   │
│   ├── views/                         # Vistas principales de la aplicación
│   │   ├── LoginView.vue              # Vista de inicio de sesión
│   │   ├── DashboardView.vue          # Vista contenedora del dashboard
│   │   └── ProductView.vue            # Vista de gestión de productos (CRUD)
│   │
│   ├── router/
│   │   └── index.js                   # Configuración de rutas con vue-router
│   │
│   ├── services/
│   │   └── productService.js          # Servicio CRUD con LocalStorage
│   │
│   ├── data/
│   │   ├── usuarios.json              # Credenciales de prueba (educativo)
│   │   └── products.json              # Catálogo inicial de 10 productos
│   │
│   ├── App.vue                        # Punto de entrada — contiene <router-view>
│   └── main.js                        # Inicialización de Vue + Bootstrap
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Instalación y ejecución

### Requisitos previos
- Node.js v18 o superior → [nodejs.org](https://nodejs.org)
- Git → [git-scm.com](https://git-scm.com)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/segundo-parcial-des-app-web.git

# 2. Entrar a la carpeta
cd segundo-parcial-des-app-web

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

### Credenciales de prueba

```
Email:      admin@blackstore.com
Contraseña: black2024
```

> ⚠️ **AVISO EDUCATIVO:** Las credenciales están almacenadas en `usuarios.json` y se validan en el frontend. Esto se hace **únicamente con fines de aprendizaje** y **no representa un sistema de autenticación real ni seguro**. En producción, la autenticación debe manejarse en un servidor backend con contraseñas encriptadas (bcrypt, Argon2) y comunicación HTTPS.

---

## 🧩 Modularización — Cómo se implementó

La aplicación sigue el principio de **separación de responsabilidades**, dividiendo el código en módulos independientes con funciones específicas:

### Componentes (`src/components/`)
Fragmentos de interfaz reutilizables que se integran en múltiples vistas sin duplicar código.

| Componente | Función |
|---|---|
| `NavbarComponent.vue` | Muestra el logo BLACKSTORE, nombre del usuario y botón de logout |
| `SidebarComponent.vue` | Menú lateral con navegación y filtros por categoría. Emite eventos al padre |
| `FooterComponent.vue` | Pie de página estático con derechos reservados |
| `ProductCardComponent.vue` | Tarjeta visual de producto. Recibe datos via `props` y emite el evento `details` |

### Vistas (`src/views/`)
Páginas completas que se cargan según la ruta activa.

| Vista | Ruta | Función |
|---|---|---|
| `LoginView.vue` | `/login` | Formulario de autenticación con validación contra JSON |
| `DashboardView.vue` | `/dashboard` | Contenedor principal: integra Navbar, Sidebar, Footer y `<router-view>` |
| `ProductView.vue` | `/dashboard/productos` | CRUD completo de productos con tabla y modales Bootstrap |

### Rutas (`src/router/index.js`)
Configuradas con `vue-router`. El guard `beforeEach` protege las rutas privadas redirigiendo al login si no hay sesión activa.

```
/                        → redirige a /login
/login                   → LoginView
/dashboard               → DashboardView (protegida)
  └── /dashboard/productos → ProductView (vista hija)
```

### Servicios (`src/services/productService.js`)
Capa de abstracción para el manejo de datos. Centraliza todas las operaciones con LocalStorage.

---

## 💾 CRUD simulado con LocalStorage

Los productos se cargan inicialmente desde `products.json` y se almacenan en `localStorage` para persistir los cambios durante la sesión.

### Flujo de datos

```
products.json  →  productService.init()  →  localStorage
                                               ↕
                          getAll() / create() / update() / delete()
                                               ↕
                                         ProductView.vue
```

### Ejemplo del servicio

```js
// src/services/productService.js

import productosJSON from '../data/products.json'

const KEY = 'blackstore_products'

export const productService = {

  // Carga el JSON en LocalStorage si aún no existe
  init() {
    if (!localStorage.getItem(KEY)) {
      localStorage.setItem(KEY, JSON.stringify(productosJSON))
    }
  },

  // Leer todos los productos
  getAll() {
    return JSON.parse(localStorage.getItem(KEY)) || []
  },

  // Crear un producto nuevo
  create(product) {
    const all = this.getAll()
    product.id = Date.now()          // ID único basado en timestamp
    all.push(product)
    localStorage.setItem(KEY, JSON.stringify(all))
  },

  // Actualizar un producto existente
  update(updated) {
    const all = this.getAll().map(p => p.id === updated.id ? updated : p)
    localStorage.setItem(KEY, JSON.stringify(all))
  },

  // Eliminar por ID
  delete(id) {
    const all = this.getAll().filter(p => p.id !== id)
    localStorage.setItem(KEY, JSON.stringify(all))
  }
}
```

---

## 📡 Consumo de datos JSON (simulación de API)

Aunque no se consume una API REST externa, se simula el patrón de consumo cargando los datos desde un archivo JSON local, tal como se haría con `fetch()` a un endpoint real.

### Ejemplo de cómo se cargaría con una API real

```js
// Equivalente con API REST externa (referencia)
async function fetchProducts() {
  const response = await fetch('https://api.blackstore.com/products')
  const data = await response.json()
  localStorage.setItem('blackstore_products', JSON.stringify(data))
}
```

### Cómo se hace actualmente (simulado)

```js
// En ProductView.vue — mounted()
mounted() {
  productService.init()                    // Carga JSON → LocalStorage
  this.products = productService.getAll()  // Lee desde LocalStorage
}
```

---

## 🔗 Comunicación entre componentes

### Props — de padre a hijo

El `DashboardView` pasa el filtro activo a `ProductView` mediante una prop:

```vue
<!-- DashboardView.vue -->
<router-view :filter="activeFilter" />
```

```vue
<!-- ProductView.vue -->
<script>
export default {
  props: {
    filter: { type: String, default: 'Todos' }
  }
}
</script>
```

### Eventos — de hijo a padre

`SidebarComponent` emite el evento `filter` cuando el usuario selecciona una categoría:

```vue
<!-- SidebarComponent.vue -->
<button @click="$emit('filter', cat)">{{ cat }}</button>
```

```vue
<!-- DashboardView.vue — escucha el evento -->
<SidebarComponent @filter="handleFilter" />

<script>
methods: {
  handleFilter(categoria) {
    this.activeFilter = categoria  // Actualiza el filtro y lo pasa a ProductView
  }
}
</script>
```

### Props — ProductCardComponent

```vue
<!-- Uso en ProductView.vue -->
<ProductCardComponent
  v-for="p in filteredProducts"
  :key="p.id"
  :product="p"
  @details="openDetail"
/>
```

```vue
<!-- ProductCardComponent.vue — recibe la prop -->
<script>
export default {
  props: {
    product: { type: Object, required: true }
  },
  emits: ['details']
}
</script>
```

---

## 🎨 Estilos y coherencia visual

- **Framework principal:** Bootstrap 5.3
- **Iconos:** Bootstrap Icons (`bi bi-*`)
- **Paleta de colores:** Negro (`#000000`), gris oscuro (`#212529`), blanco (`#ffffff`)
- **Tipografía:** Sistema nativo de Bootstrap con letter-spacing personalizado
- **Tema:** Oscuro — todas las tarjetas, tablas y modales usan `bg-dark text-white border-secondary`

### Variables Bootstrap usadas

```css
--bs-dark: #212529;
--bs-secondary: #6c757d;
--bs-light: #f8f9fa;
--bs-danger: #dc3545;
```

---

## 🛣️ Rutas configuradas

```js
// src/router/index.js
const routes = [
  { path: '/',          redirect: '/login' },
  { path: '/login',     component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: 'productos', component: ProductView }
    ]
  }
]

// Guard de autenticación
router.beforeEach((to, from, next) => {
  const isLogged = sessionStorage.getItem('bs_session')
  if (to.meta.requiresAuth && !isLogged) next('/login')
  else next()
})
```

---





<div align="center">
  <strong>🖤 BLACKSTORE © 2024 — Todos los derechos reservados</strong><br/>
  <em>Desarrollado por Nombre Uno y Nombre Dos</em>
</div>