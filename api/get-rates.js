export default async function handler(req, res) {
    const API_KEY = process.env.EXCHANGE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/DOP`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error en servidor" });
    }
}