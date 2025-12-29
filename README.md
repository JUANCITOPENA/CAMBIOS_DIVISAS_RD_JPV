# 🎓 MASTERCLASS: NEON EXCHANGE (DOP ANALYTICS)

![Nivel](https://img.shields.io/badge/NIVEL-ZERO%20TO%20HERO-blueviolet?style=for-the-badge&logo=academic)
![Tipo](https://img.shields.io/badge/PROYECTO-EDUCATIVO-orange?style=for-the-badge)
![Stack](https://img.shields.io/badge/FULLSTACK-NODE%20%2B%20JS-green?style=for-the-badge)

> **"No solo copies código. Entiende cómo funciona el dinero y la tecnología."**

---

## 📑 ÍNDICE DEL CURSO

1.  [🌍 Introducción y Planteamiento](#-introducción-y-planteamiento)
2.  [🧠 Teoría: ¿Qué estamos construyendo?](#-teoría-qué-estamos-construyendo)
3.  [🏗️ Arquitectura del Sistema](#-arquitectura-del-sistema)
4.  [🛠️ Fase 1: Preparación (Setup)](#-fase-1-preparación-setup)
5.  [💻 Fase 2: El Backend (El Servidor)](#-fase-2-el-backend-el-servidor)
6.  [🎨 Fase 3: El Frontend (La Interfaz)](#-fase-3-el-frontend-la-interfaz)
7.  [🧠 Fase 4: La Lógica (El Cerebro)](#-fase-4-la-lógica-el-cerebro)
8.  [🚀 Fase 5: Ejecución y Pruebas](#-fase-5-ejecución-y-pruebas)
9.  [💡 Consejos Pro y Conclusión](#-consejos-pro-y-conclusión)

---

## 🌍 1. INTRODUCCIÓN Y PLANTEAMIENTO

### 🛑 El Problema
Imagina que quieres viajar o comprar algo en Amazon. Necesitas dólares. Buscas en Google y dice "62.70". Vas al banco y te dicen "No, te lo vendemos a 63.50". **¿Por qué?**
Además, los sitios web financieros suelen ser aburridos, llenos de tablas grises y difíciles de entender.

### ✅ La Solución
Vamos a construir **Neon Exchange**: Una aplicación web moderna, con estilo "Cyberpunk" (luces de neón), que:
1.  Obtiene el precio **REAL** del mercado (usando una API profesional).
2.  Calcula automáticamente el precio de **COMPRA** y **VENTA** (como un banco real).
3.  Muestra gráficos históricos interactivos.
4.  Te permite calcular conversiones al instante.

---

## 🧠 2. TEORÍA: ¿QUÉ ESTAMOS CONSTRUYENDO?

Antes de escribir código, definamos los conceptos clave.

### 🔌 ¿Qué es una API? (Application Programming Interface)
Imagina que estás en un restaurante:
*   **Tú (El Cliente):** Eres el Frontend (la página web).
*   **La Cocina (La Base de Datos):** Tiene los ingredientes (los datos del dinero).
*   **El Camarero (La API):** Es el intermediario. Tú le pides "Tráeme el precio del dólar", él va a la cocina, lo busca y te lo trae.

En este proyecto usamos **ExchangeRate-API**, un servicio que monitorea los bancos centrales del mundo y nos da los datos en formato JSON.

### 🛡️ ¿Por qué un Backend (Node.js)?
¿Por qué no pedir los datos directamente desde el navegador? **SEGURIDAD**.
Si pones tu "Llave Secreta" (API Key) en el HTML, cualquiera puede robártela. Por eso creamos un servidor intermedio (Proxy) que guarda el secreto y hace la petición por ti.

---

## 🏗️ 3. ARQUITECTURA DEL SISTEMA

Así se organiza nuestro proyecto en tu computadora. Cada archivo tiene una misión.

```plaintext
MI-PROYECTO/
│
├── .env                🔒 LA CAJA FUERTE (Aquí guardamos la API Key secreta)
├── package.json        📄 EL DOCUMENTO DE IDENTIDAD (Lista de dependencias)
├── server.js           👮 EL GUARDAESPALDAS (Servidor Backend en Node.js)
│
└── public/             🖼️ EL ESCAPARATE (Carpeta pública)
    ├── index.html      🦴 EL ESQUELETO (Estructura de la página)
    ├── style.css       🎨 EL MAQUILLAJE (Colores, neón, fuentes)
    └── script.js       🧠 EL CEREBRO (Lógica, matemáticas y gráficos)
```

---

## 🛠️ 4. FASE 1: PREPARACIÓN (SETUP)

### Paso 1: Instalar Herramientas
Necesitas **Node.js** (el motor) y **VS Code** (el taller).
*   [Descargar Node.js](https://nodejs.org/)
*   [Descargar VS Code](https://code.visualstudio.com/)

### Paso 2: Crear el Proyecto
Abre tu terminal, crea una carpeta y ejecuta:

```bash
npm init -y
```
Esto crea el archivo `package.json`.

### Paso 3: Instalar Dependencias
Instalamos las librerías que harán el trabajo duro:

```bash
npm install express dotenv node-fetch
```
*   `express`: Crea el servidor web fácilmente.
*   `dotenv`: Permite leer el archivo `.env`.
*   `node-fetch`: Permite al servidor "navegar" a la API externa.

### Paso 4: Configurar Variables (.env)
Crea un archivo llamado `.env` en la raíz y pega esto:

```env
# Regístrate en exchangerate-api.com para obtener tu clave
API_KEY=TU_CLAVE_SECRETA_AQUI
PORT=3001
```

---

## 💻 5. FASE 2: EL BACKEND (EL SERVIDOR)

Crea el archivo `server.js` en la raíz. Este script es el "intermediario seguro".

**📂 Archivo: `server.js`**

```javascript
// Importamos las herramientas
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Configuramos las herramientas
dotenv.config(); // Lee el archivo .env
const app = express();
const PORT = process.env.PORT || 3000;

// Servimos los archivos estáticos (HTML, CSS, JS) de la carpeta 'public'
app.use(express.static('public'));

// RUTA SEGURA: El frontend llama aquí, no a la API externa directamente
app.get('/api/get-rates', async (req, res) => {
    try {
        // Importamos 'node-fetch' dinámicamente (compatible con versiones nuevas)
        const fetch = (await import('node-fetch')).default;
        
        // El servidor hace la petición a la API externa usando la CLAVE SECRETA
        const apiResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
        const data = await apiResponse.json();

        // Enviamos los datos limpios al frontend
        res.json(data);
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error al conectar con la API financiera" });
    }
});

// Encendemos el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor Financiero Activo en: http://localhost:${PORT}`);
});
```

---

## 🎨 6. FASE 3: EL FRONTEND (LA INTERFAZ)

Ahora vamos a la carpeta `public/`.

**📂 Archivo: `public/index.html`**
La estructura visual. Usamos **Bootstrap** para que sea responsivo (se vea bien en celular y PC).

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Neon Exchange | JPV</title>
    <!-- Cargamos Bootstrap (Diseño) y FontAwesome (Iconos) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Nuestra hoja de estilo personalizada -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Encabezado con Créditos -->
    <div class="container mt-5 text-center">
        <h1 class="text-white display-4 fw-bold">Cambios de Divisas vs DOP RD$</h1>
        <div class="mt-3 p-2 d-inline-block rounded" style="background: rgba(0,0,0,0.5); border: 1px solid #333;">
            <p class="mb-0 text-light small">
                <i class="fas fa-info-circle text-info"></i> Datos: ExchangeRate-API | Ref: Google Spot
            </p>
        </div>
    </div>

    <!-- Calculadora Maestra -->
    <div class="container mt-4 text-center">
        <label class="text-info small">MULTIPLICADOR (X)</label>
        <input type="number" id="master-amount" class="form-control w-25 mx-auto text-center" value="1" oninput="applyMultiplier()">
    </div>

    <!-- AQUÍ SE DIBUJARÁN LAS TARJETAS AUTOMÁTICAMENTE -->
    <div class="container mt-5">
        <div class="row g-4" id="currency-grid"></div>
    </div>

    <!-- Resumen Ejecutivo -->
    <div class="container mt-5 mb-5">
        <!-- (Código del resumen ejecutivo explicado en secciones anteriores...) -->
    </div>

    <!-- Cargamos ECharts (Gráficos) y nuestro Script -->
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

---

## 🧠 7. FASE 4: LA LÓGICA (EL CEREBRO)

Aquí ocurre la magia matemática y visual.

**📂 Archivo: `public/script.js`**

```javascript
// Definimos las monedas que queremos rastrear
const currencyData = [
    { code: 'USD', name: 'Dólar USA', flag: 'us', color: 'blue' },
    { code: 'EUR', name: 'Euro', flag: 'eu', color: 'purple' },
    // ... más monedas ...
];

let currentRates = {};

// Función Principal: Se ejecuta al cargar la página
async function updateRates() {
    try {
        // Pedimos los datos a NUESTRO servidor (no a la API directa)
        const response = await fetch('/api/get-rates');
        const data = await response.json();
        
        currentRates = data.conversion_rates; // Guardamos las tasas
        renderGrid(); // Dibujamos la interfaz
    } catch (error) {
        alert("Error cargando datos financieros");
    }
}

// Función de Dibujado
function renderGrid() {
    const grid = document.getElementById('currency-grid');
    grid.innerHTML = ''; // Limpiamos la pantalla

    currencyData.forEach(curr => {
        // MATEMÁTICA FINANCIERA
        // La API nos da cuánto vale 1 USD en esa moneda.
        // Invertimos (1 / rate) para saber cuánto vale 1 de esa moneda en USD/DOP.
        const midRate = 1 / currentRates[curr.code]; 
        
        // Aplicamos el MARGEN (Spread) del 0.5%
        const buyRate = midRate * 0.995; // Te pago menos
        const sellRate = midRate * 1.005; // Te cobro más

        // Generamos el HTML de la tarjeta
        // ... (Ver archivo real para el template string completo) ...
        
        // Generamos el Gráfico con ECharts
        // Simulamos un historial basado en la tasa actual para efectos visuales
        // ... (Configuración de ECharts) ...
    });
}
```

---

## 🚀 8. FASE 5: EJECUCIÓN Y PRUEBAS

¡Hora de la verdad!

1.  Abre la terminal en la carpeta del proyecto.
2.  Ejecuta:
    ```bash
    npm start
    ```
3.  Verás el mensaje de éxito.
4.  Abre tu navegador en `http://localhost:3001`.

**🧪 Pruebas que debes hacer:**
*   **Test de Realidad:** Busca en Google "1 Euro a USD". Compara con el valor "Ref (Google)" de tu app. Deben ser casi idénticos.
*   **Test de Spread:** Verifica que el precio de "Venta" sea siempre mayor que el de "Compra". ¡Así ganan los bancos!
*   **Test de Interacción:** Pasa el mouse sobre el gráfico. ¿Aparece el tooltip con la fecha?

---

## 💡 9. CONSEJOS PRO Y CONCLUSIÓN

### 🎓 ¿Por qué este proyecto es importante?
Muchos tutoriales te enseñan a hacer una lista de tareas (To-Do List). Eso es aburrido.
Este proyecto te enseña:
1.  **Consumo de APIs reales:** Datos que cambian segundo a segundo.
2.  **Seguridad Backend:** Ocultar secretos.
3.  **Visualización de Datos:** No solo mostrar números, sino tendencias gráficas.
4.  **Matemática Financiera Básica:** Entender el Spread.

### 🌟 Mensaje Final
> "La programación no se trata solo de escribir código. Se trata de **resolver problemas reales** y hacer que la información compleja sea hermosa y accesible. Hoy has creado una herramienta que podría estar en el lobby de un hotel o en la pantalla de un trader. **¡Sigue construyendo!**"

---
<div align="center">
    <p>Desarrollado con pasión educativa 💙 por <b>Juancito Peña</b></p>
</div>