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
                    <div id="chart-${curr.code}" style="height: 200px; width: 100%;"></div>
                </div>
            </div>`;
    });

    currencyData.forEach(curr => {
        const rate = 1 / currentRates[curr.code];
        const chartDom = document.getElementById(`chart-${curr.code}`);
        const myChart = echarts.init(chartDom);
        
        // Generar datos simulados para los últimos 6 meses
        const data = [];
        const categories = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            categories.push(date.toISOString()); // Guardar fecha completa
            // Variación aleatoria basada en la tasa actual
            const value = rate * (1 + (Math.random() * 0.1 - 0.05));
            data.push(value.toFixed(2));
        }

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    const date = new Date(params[0].name).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
                    return `<div style="text-align:left;"><b>${date}</b><br/>Tasa: ${params[0].value}</div>`;
                }
            },
            grid: {
                left: '12%', // Más espacio para el eje Y
                right: '5%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    color: '#aaa',
                    fontSize: 10,
                    formatter: (value) => {
                        // Obtener las 3 primeras letras del mes en mayúsculas
                        const date = new Date(value);
                        return date.toLocaleDateString('es-ES', { month: 'short' }).substring(0, 3).toUpperCase();
                    }
                },
                axisLine: { show: true, lineStyle: { color: '#333' } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value',
                show: true,
                scale: true, // No empezar en 0, adaptar a los datos
                axisLabel: {
                    color: '#aaa',
                    fontSize: 10,
                    formatter: '{value}'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#222', // Líneas de guía muy sutiles
                        type: 'dashed'
                    }
                }
            },
            series: [
                {
                    data: data,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        color: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a'
                    },
                    itemStyle: {
                        color: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a'
                    },
                    areaStyle: {
                         opacity: 0.2,
                         color: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a'
                    },
                    markPoint: {
                        symbolSize: 50, // Burbuja más grande para legibilidad
                        label: {
                            show: true,
                            // Lógica de contraste: Verde/Azul neon son claros -> Texto negro. Morado es oscuro -> Texto blanco.
                            color: curr.color === 'purple' ? '#ffffff' : '#000000',
                            fontSize: 11,
                            fontWeight: 'bold',
                            formatter: '{c}'
                        },
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ],
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: curr.color === 'blue' ? '#00f3ff' : curr.color === 'purple' ? '#bc13fe' : '#0aff0a'
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);
        
        // Redimensionar gráfico si cambia el tamaño de la ventana
        window.addEventListener('resize', function() {
            myChart.resize();
        });
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