const currencyData = [
    { code: 'USD', name: 'Dólar USA', flag: 'us', color: 'blue' },
    { code: 'EUR', name: 'Euro', flag: 'eu', color: 'purple' },
    { code: 'GBP', name: 'Libra Esterlina', flag: 'gb', color: 'green' },
    { code: 'CAD', name: 'Dólar Canadiense', flag: 'ca', color: 'blue' },
    { code: 'CHF', name: 'Franco Suizo', flag: 'ch', color: 'purple' },
    { code: 'JPY', name: 'Yen Japonés', flag: 'jp', color: 'green' },
    { code: 'CNY', name: 'Yuan Chino', flag: 'cn', color: 'blue' },
    { code: 'BRL', name: 'Real Brasileño', flag: 'br', color: 'purple' },
    { code: 'MXN', name: 'Peso Mexicano', flag: 'mx', color: 'green' },
    { code: 'COP', name: 'Peso Colombiano', flag: 'co', color: 'blue' },
    { code: 'ARS', name: 'Peso Argentino', flag: 'ar', color: 'purple' },
    { code: 'CLP', name: 'Peso Chileno', flag: 'cl', color: 'green' }
];

let currentRates = {};

async function updateRates() {
    console.log("[INFO] Iniciando actualización segura...");
    const loader = document.getElementById('loader-overlay');
    loader.style.display = 'flex';
    loader.style.opacity = '1';

    try {
        // LLAMADA AL ENDPOINT SEGURO DE VERCEL
        const response = await fetch('/api/get-rates');
        const data = await response.json();

        if (data.result === 'success') {
            console.log("[SUCCESS] Datos recibidos.");
            currentRates = data.conversion_rates;
            renderGrid();
        } else {
            throw new Error(data.message || "Error en la API");
        }
    } catch (error) {
        console.error("[ERROR]", error.message);
        alert("Error: " + error.message);
    } finally {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 800);
    }
}

function renderGrid() {
    const grid = document.getElementById('currency-grid');
    grid.innerHTML = '';
    
    currencyData.forEach(curr => {
        const rateToDop = 1 / currentRates[curr.code];
        grid.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="cyber-card border-${curr.color}">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <img src="https://flagcdn.com/w80/${curr.flag}.png" class="flag-icon">
                        <span class="badge border border-${curr.color} text-white">${curr.code}</span>
                    </div>
                    <div class="text-center">
                        <div class="rate-display" id="rate-${curr.code}" data-base="${rateToDop}">
                            ${rateToDop.toFixed(2)}
                        </div>
                        <p class="small text-muted mb-2">${curr.name}</p>
                    </div>
                    <div id="chart-${curr.code}"></div>
                </div>
            </div>`;
    });

    currencyData.forEach(curr => {
        const rate = 1 / currentRates[curr.code];
        new ApexCharts(document.querySelector(`#chart-${curr.code}`), {
            series: [{ data: Array.from({length: 10}, () => rate * (1 + (Math.random()*0.02-0.01))) }],
            chart: { type: 'area', height: 80, sparkline: { enabled: true } },
            colors: [curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a'],
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } }
        }).render();
    });
    
    document.getElementById('last-updated').innerText = 'DOP_SYNC: ' + new Date().toLocaleTimeString();
    applyMultiplier();
}

function applyMultiplier() {
    const multiplier = document.getElementById('master-amount').value || 1;
    currencyData.forEach(curr => {
        const el = document.getElementById(`rate-${curr.code}`);
        if(el) {
            const base = parseFloat(el.getAttribute('data-base'));
            el.innerText = (base * multiplier).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
    });
}

document.addEventListener('DOMContentLoaded', updateRates);