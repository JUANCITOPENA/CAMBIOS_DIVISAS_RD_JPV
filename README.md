# 💹 NEON EXCHANGE | DOP ANALYTICS

![Version](https://img.shields.io/badge/version-1.2.0-blue?style=for-the-badge&logo=git)
![Status](https://img.shields.io/badge/status-OPERATIONAL-success?style=for-the-badge&logo=vercel)
![Tech](https://img.shields.io/badge/stack-NODE%20%7C%20ECHARTS%20%7C%20BOOTSTRAP-neon?style=for-the-badge)

> **"Monitoreo de divisas en tiempo real con estética Cyberpunk y precisión financiera."**

---

## 📑 Índice de Contenidos

1.  [📍 Descripción del Proyecto](#-descripción-del-proyecto)
2.  [✨ Características Clave](#-características-clave)
3.  [🛠️ Protocolo de Instalación](#-protocolo-de-instalación)
4.  [💻 Manual de Uso](#-manual-de-uso)
5.  [🤝 Guía de Contribución](#-guía-de-contribución)
6.  [📄 Licencia & Disclaimer](#-licencia--disclaimer)

---

## 📍 Descripción del Proyecto

**Neon Exchange** es un dashboard financiero interactivo diseñado para el monitoreo del Peso Dominicano (**DOP**) frente a las principales divisas globales. 

A diferencia de los conversores tradicionales, este sistema simula un entorno de **Casa de Cambio Real**, ofreciendo precios de **Compra** y **Venta** calculados con un *spread* operativo, comparándolos transparentemente con tasas de referencia de mercado (tipo Google).

### 🚀 Tecnologías Core
*   **Frontend:** `HTML5` + `Bootstrap 5` + `Vanilla JS`
*   **Visualización:** `Apache ECharts` (Gráficos interactivos de alto rendimiento).
*   **Backend:** `Node.js` + `Express` (Proxy seguro para API).
*   **Datos:** `ExchangeRate-API` + Lógica de Spread Financiero.

---

## ✨ Características Clave

| Característica | Detalle Técnico |
| :--- | :--- |
| **📈 Spread Financiero** | Cálculo automático de **Compra (-0.5%)** y **Venta (+0.5%)** sobre la tasa base. |
| **⚖️ Comparativa Ref** | Visualización de la **Tasa de Referencia (Google)** para transparencia total. |
| **📊 Gráficos Históricos** | Análisis de tendencias de los últimos **6 meses** con detección de Max/Min. |
| **🎨 UI/UX Cyberpunk** | Interfaz de alto contraste (Neon), modo oscuro y **Accesibilidad WCAG AA**. |
| **📱 Responsive** | Diseño adaptativo para móviles, tablets y desktops. |

---

## 🛠️ Protocolo de Instalación

Sigue estos pasos para desplegar el sistema en tu entorno local.

### 1️⃣ Prerrequisitos
*   **Node.js** (v14 o superior) instalado.
*   **Git** instalado.
*   Una **API Key** gratuita de [ExchangeRate-API](https://www.exchangerate-api.com/).

### 2️⃣ Clonación del Repositorio
Abre tu terminal y ejecuta:

```bash
git clone https://github.com/JUANCITOPENA/CAMBIOS_DIVISAS_RD_JPV.git
cd CAMBIOS_DIVISAS_RD_JPV
```

### 3️⃣ Instalación de Dependencias
Instala los paquetes necesarios definidos en `package.json`:

```bash
npm install
```

### 4️⃣ Configuración de Entorno
Crea un archivo `.env` en la raíz del proyecto y agrega tu clave:

```env
API_KEY=tu_clave_secreta_aqui
PORT=3001
```

### 5️⃣ Ejecución
Inicia el servidor de desarrollo:

```bash
npm start
```
> 🔹 El sistema estará disponible en: `http://localhost:3001`

---

## 💻 Manual de Uso

1.  **Dashboard Principal:**
    *   Visualiza las tarjetas de cada moneda (USD, EUR, GBP, etc.).
    *   Observa los valores en **Cian (Compra)** y **Amarillo (Venta)**.
    
2.  **Calculadora Maestra:**
    *   En la parte superior, ingresa un monto en el campo **"MULTIPLICADOR (X)"**.
    *   *Efecto:* Todos los precios de la grilla se actualizarán automáticamente multiplicados por ese valor.

3.  **Análisis Gráfico:**
    *   Pasa el cursor sobre los gráficos para ver el **Tooltip** con la fecha y tasa exacta.
    *   Las "burbujas" indican los puntos **Máximos** y **Mínimos** del periodo.

4.  **Resumen Ejecutivo:**
    *   Al final de la página, consulta el informe narrativo sobre el estado del dólar y proyecciones 2025/2026.

---

## 🤝 Guía de Contribución

¡Las contribuciones son bienvenidas! Sigue este flujo estándar:

1.  **Fork** este repositorio.
2.  Crea una rama para tu característica (`git checkout -b feature/NuevaCaracteristica`).
3.  Realiza tus cambios siguiendo **Conventional Commits** (ej: `feat: agregar gráfico de pastel`).
4.  Haz **Push** a la rama (`git push origin feature/NuevaCaracteristica`).
5.  Abre un **Pull Request**.

---

## 📄 Licencia & Disclaimer

### ⚖️ MIT License
Este proyecto es de código abierto y está disponible bajo la licencia **MIT**.

### ⚠️ Disclaimer Financiero
> Los datos mostrados provienen de APIs de terceros y contienen simulaciones de márgenes (spreads). **No deben utilizarse como única fuente para toma de decisiones financieras reales.** El desarrollador no se hace responsable por pérdidas derivadas del uso de esta información.

---
<div align="center">
    <p>Desarrollado con 💻 y ☕ por <b>Juancito Peña</b></p>
    <p>
        <a href="https://github.com/JUANCITOPENA"><img src="https://img.shields.io/badge/GitHub-Profile-black?logo=github" alt="Github"></a>
    </p>
</div>