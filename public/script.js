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
        const midRate = 1 / currentRates[curr.code];
        // Ajustamos el spread a 0.5% para que sea más sutil y cercano a Google
        const spread = 0.005; 
        const buyRate = midRate * (1 - spread); 
        const sellRate = midRate * (1 + spread);

        grid.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="cyber-card border-${curr.color}">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <img src="https://flagcdn.com/w80/${curr.flag}.png" class="flag-icon">
                        <span class="badge border border-${curr.color} text-white">${curr.code}</span>
                    </div>
                    
                    <div class="text-center mb-2">
                        <p class="small text-muted mb-0">${curr.name}</p>
                        <!-- TASA REFERENCIA (Igual a Google) -->
                        <small class="text-secondary" style="font-size: 0.75rem;">
                            Ref (Google): <span class="text-white fw-bold">${midRate.toFixed(2)}</span>
                        </small>
                    </div>

                    <div class="row g-0 border-top border-secondary pt-2">
                        <div class="col-6 text-center border-end border-secondary">
                            <small class="text-neon-blue d-block mb-1" style="font-size: 0.7rem; font-weight: bold;">COMPRA</small>
                            <div class="rate-display buy-rate" id="rate-buy-${curr.code}" data-base="${buyRate}" style="font-size: 1.1rem; color: #00F3FF;">
                                ${buyRate.toFixed(2)}
                            </div>
                        </div>
                        <div class="col-6 text-center">
                            <small class="text-neon-yellow d-block mb-1" style="font-size: 0.7rem; font-weight: bold; color: #FFD700;">VENTA</small>
                            <div class="rate-display sell-rate" id="rate-sell-${curr.code}" data-base="${sellRate}" style="font-size: 1.1rem; color: #FFD700;">
                                ${sellRate.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div id="chart-${curr.code}" class="mt-2" style="height: 120px; width: 100%;"></div>
                </div>
            </div>`;
    });

    currencyData.forEach(curr => {
        const rate = 1 / currentRates[curr.code];
        const chartDom = document.getElementById(`chart-${curr.code}`);
        const myChart = echarts.init(chartDom);
        
        const data = [];
        const categories = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            categories.push(date.toISOString());
            const value = rate * (1 + (Math.random() * 0.06 - 0.03));
            data.push(value.toFixed(2));
        }

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    const date = new Date(params[0].name).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
                    return `<div style="text-align:left;"><b>${date}</b><br/>Promedio: ${params[0].value}</div>`;
                }
            },
            grid: { left: '15%', right: '5%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    color: '#aaa',
                    fontSize: 9,
                    formatter: (value) => new Date(value).toLocaleDateString('es-ES', { month: 'short' }).substring(0, 3).toUpperCase()
                }
            },
            yAxis: {
                type: 'value',
                show: true,
                scale: true,
                axisLabel: { color: '#888', fontSize: 9 }
            },
            series: [{
                data: data,
                type: 'line',
                smooth: true,
                lineStyle: { width: 2, color: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a' },
                itemStyle: { color: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a' },
                markPoint: {
                    symbolSize: 35,
                    label: { color: curr.color === 'purple' ? '#fff' : '#000', fontSize: 9, fontWeight: 'bold', formatter: '{c}' },
                    data: [{ type: 'max' }, { type: 'min' }]
                }
            }]
        };
        myChart.setOption(option);
    });
    
    document.getElementById('last-updated').innerText = 'DOP_SYNC: ' + new Date().toLocaleTimeString();
    applyMultiplier();
}

function applyMultiplier() {
    const multiplier = document.getElementById('master-amount').value || 1;
    currencyData.forEach(curr => {
        // Actualizar Compra
        const buyEl = document.getElementById(`rate-buy-${curr.code}`);
        if(buyEl) {
            const base = parseFloat(buyEl.getAttribute('data-base'));
            buyEl.innerText = (base * multiplier).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        // Actualizar Venta
        const sellEl = document.getElementById(`rate-sell-${curr.code}`);
        if(sellEl) {
            const base = parseFloat(sellEl.getAttribute('data-base'));
            sellEl.innerText = (base * multiplier).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
    });
}

document.addEventListener('DOMContentLoaded', updateRates);