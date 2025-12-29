const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const path = require("path");

dotenv.config();

const app = express();

// Servir archivos estáticos desde la carpeta 'public' usando ruta absoluta
app.use(express.static(path.join(__dirname, "public")));

// Ruta explícita para el root (por seguridad)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/get-rates", async (req, res) => {
    const API_KEY = process.env.EXCHANGE_API_KEY;
    if (!API_KEY) return res.status(500).json({ result: "error", message: "Falta configurar EXCHANGE_API_KEY en .env" });
    
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/DOP`);
        const data = await response.json();
        
        if (data.result !== 'success') {
             return res.status(500).json({ result: "error", message: "Error de la API externa: " + (data["error-type"] || "Desconocido") });
        }

        res.json(data);
    } catch (e) {
        res.status(500).json({ result: "error", message: e.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📂 Sirviendo archivos estáticos desde: ${path.join(__dirname, "public")}`);
});
