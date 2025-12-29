# 🚀 GUÍA MAESTRA: NEON EXCHANGE (DOP ANALYTICS)

![Banner](https://img.shields.io/badge/NIVEL-PRINCIPIANTE%20%2F%20INTERMEDIO-green?style=for-the-badge&logo=codecademy)
![Stack](https://img.shields.io/badge/Tecnologías-HTML%20%2B%20JS%20%2B%20NODE-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/TUTORIAL-ACTIVO-orange?style=for-the-badge)

> **"Aprende a crear un Dashboard Financiero Profesional desde cero."**
> Este manual te guiará paso a paso para construir una aplicación que consulta el precio del dólar en tiempo real y muestra gráficos interactivos.

---

## 📚 Tabla de Contenidos

1.  [🛠️ Fase 1: Tu Caja de Herramientas (Prerrequisitos)](#-fase-1-tu-caja-de-herramientas-prerrequisitos)
2.  [🔑 Fase 2: Consigue tu Llave Maestra (API Key)](#-fase-2-consigue-tu-llave-maestra-api-key)
3.  [🧬 Fase 3: Anatomía del Proyecto (Estructura)](#-fase-3-anatomía-del-proyecto-estructura)
4.  [🚀 Fase 4: Instalación (Elige tu camino)](#-fase-4-instalación-elige-tu-camino)
5.  [🧠 Fase 5: Entendiendo el Cerebro (Explicación de Código)](#-fase-5-entendiendo-el-cerebro-explicación-de-código)
6.  [✨ Fase 6: Ejecución y Uso](#-fase-6-ejecución-y-uso)
7.  [🚑 Solución de Problemas (Troubleshooting)](#-solución-de-problemas-troubleshooting)

---

## 🛠️ Fase 1: Tu Caja de Herramientas (Prerrequisitos)

Antes de empezar, necesitas instalar los programas que usan los programadores profesionales. ¡Es gratis!

| Herramienta | ¿Para qué sirve? | Enlace de Descarga |
| :--- | :--- | :--- |
| **Node.js** | El motor que hace funcionar tu servidor. | [Descargar Node.js (LTS)](https://nodejs.org/es/) |
| **Git** | Para guardar tu progreso y descargarlo. | [Descargar Git](https://git-scm.com/) |
| **VS Code** | El editor de texto donde escribiremos código. | [Descargar VS Code](https://code.visualstudio.com/) |

> **Verificación:** Abre tu terminal (CMD o PowerShell) y escribe `node -v`. Si salen números (ej: v18.16.0), ¡estás listo!

---

## 🔑 Fase 2: Consigue tu Llave Maestra (API Key)

Necesitamos datos reales. Usaremos **ExchangeRate-API**, que nos regala 1,500 consultas al mes.

1.  Ve a [ExchangeRate-API](https://www.exchangerate-api.com/).
2.  Ingresa tu correo y haz clic en **"Get Free Key"**.
3.  Te enviarán un correo. Confírmalo y entra al panel.
4.  Verás un código largo como: `a1b2c3d4e5f6...`. **¡Cópialo! Esa es tu API Key.**

---

## 🧬 Fase 3: Anatomía del Proyecto (Estructura)

Así organizaremos nuestras carpetas. Imagina que es una casa:

```plaintext
MI-PROYECTO/
├── .env                <-- La caja fuerte (Aquí guardamos la API Key secreta)
├── .gitignore          <-- Lista de cosas que NO subimos a internet
├── package.json        <-- El DNI del proyecto (Dice qué librerías usa)
├── server.js           <-- El COCINERO (Backend). Busca los datos.
└── public/             <-- El COMEDOR (Frontend). Lo que ve el cliente.
    ├── index.html      <-- La estructura de la página.
    ├── style.css       <-- La pintura y decoración (Diseño Neon).
    └── script.js       <-- El camarero (Mueve los datos a la mesa).
```

---

## 🚀 Fase 4: Instalación (Elige tu camino)

### 🛣️ Camino A: "Quiero clonarlo y correrlo YA" (Rápido)

Si solo quieres ver cómo funciona el proyecto de Juancito:

1.  Abre tu terminal y escribe:
    ```bash
    git clone https://github.com/JUANCITOPENA/CAMBIOS_DIVISAS_RD_JPV.git
    cd CAMBIOS_DIVISAS_RD_JPV
    ```
2.  Instala las librerías automáticas:
    ```bash
    npm install
    ```
3.  Crea un archivo llamado `.env` y pega tu clave:
    ```env
    API_KEY=PEGAR_TU_CLAVE_AQUI
    PORT=3001
    ```
4.  ¡Listo! Salta a la **Fase 6**.

### 🛣️ Camino B: "Quiero aprender y hacerlo yo mismo" (Recomendado)

1.  Crea una carpeta nueva en tu PC.
2.  Abre la terminal en esa carpeta y escribe:
    ```bash
    npm init -y
    ```
    *(Esto crea el archivo package.json)*.
3.  Instala las herramientas necesarias:
    ```bash
    npm install express dotenv node-fetch
    ```
    *   `express`: Para crear el servidor web.
    *   `dotenv`: Para leer el archivo .env (seguridad).
    *   `node-fetch`: Para que el servidor pueda "navegar" y buscar datos.

---

## 🧠 Fase 5: Entendiendo el Cerebro (Explicación de Código)

### 1. El Servidor (`server.js`)
¿Por qué necesitamos esto? Porque si pones tu API Key en el HTML, ¡cualquiera podría robártela! El servidor actúa de **Escudo**.

```javascript
// Carga las librerías
const express = require('express'); 
const app = express();

// Ruta secreta: Cuando el frontend pida "/api/get-rates"...
app.get('/api/get-rates', async (req, res) => {
    // ...el servidor usa la llave secreta para pedir los datos reales
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    const data = await response.json();
    res.json(data); // Y se los entrega al frontend
});
```

### 2. El Frontend (`public/script.js`)
Aquí ocurre la magia visual.

*   **Lógica de Compra/Venta:**
    Como la API nos da un precio "promedio" (ej: 62.70), simulamos una casa de cambio real:
    ```javascript
    // Le bajamos 0.5% para decir "Te lo compro a este precio"
    const buyRate = midRate * 0.995; 
    
    // Le subimos 0.5% para decir "Te lo vendo a este precio"
    const sellRate = midRate * 1.005; 
    ```

*   **Gráficos (ECharts):**
    Usamos una librería llamada Apache ECharts. Configuramos el eje X (fechas) y el eje Y (valores) para dibujar las líneas de tendencia.

---

## ✨ Fase 6: Ejecución y Uso

1.  En tu terminal, dentro de la carpeta del proyecto:
    ```bash
    npm start
    ```
2.  Verás un mensaje: `✅ Servidor corriendo en http://localhost:3001`.
3.  Abre tu navegador (Chrome, Edge, etc.) y entra a:
    👉 **http://localhost:3001**

### ¿Qué puedes hacer?
*   **Multiplicador:** Escribe "100" arriba y verás cuánto son 100 dólares en pesos.
*   **Gráficos:** Pasa el mouse sobre las líneas para ver el historial.
*   **Comparar:** Mira el valor "Ref (Google)" en el centro y compáralo con los precios de Compra/Venta.

---

## 🚑 Solución de Problemas (Troubleshooting)

**🔴 Error: "Command not found: npm"**
*   *Solución:* No instalaste Node.js. Ve a la Fase 1 e instálalo.

**🔴 Error: "404 Not Found" o Gráficos vacíos**
*   *Solución:* Revisa tu archivo `.env`. ¿Pusiste la API Key correcta? ¿El archivo se llama exactamente `.env`?

**🔴 Error: "Port 3001 already in use"**
*   *Solución:* Ya tienes el programa abierto en otra terminal. Ciérrala o cambia el puerto en el archivo `.env`.

---

## 🤝 Contribución

¿Quieres mejorar esto? ¡Genial!

1.  Haz un **Fork** (Copia) del proyecto en GitHub.
2.  Mejora el código (ej: añade más monedas).
3.  Envía un **Pull Request** explicando tu mejora.

---
<div align="center">
    <p>Hecho con fines educativos 🎓 por <b>Juancito Peña</b></p>
    <p>
        <a href="https://github.com/JUANCITOPENA"><img src="https://img.shields.io/badge/GitHub-Ver_Perfil-black?logo=github" alt="Github"></a>
    </p>
</div>
