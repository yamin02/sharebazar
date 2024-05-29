const ctx = document.getElementById('myChart').getContext('2d');
const chartData = {
    '3M': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
    '6M': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
    '1Y': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
    '2Y': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
    '3Y': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
    'Max': Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
};

let currentPeriod = '3Y';
const cagrValues = {
    '3': '+10.23%',
    '4': '+11.45%',
    '5': '+12.65%',
};

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'NAV',
            data: chartData[currentPeriod],
            borderColor: '#ff5733',
            borderWidth: 2,
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        animation: false,
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }]
        },
        tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    return ` ${tooltipItem.yLabel}`;
                }
            }
        },
        legend: {
            display: false
        }
    }
});

document.querySelectorAll('.nav button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.nav button.active').classList.remove('active');
        button.classList.add('active');
        currentPeriod = button.getAttribute('data-period');
        myChart.data.datasets[0].data = chartData[currentPeriod];
        myChart.update();
    });
});

document.getElementById('cagr-period').addEventListener('change', (event) => {
    const selectedPeriod = event.target.value;
    document.getElementById('cagr-value').innerText = cagrValues[selectedPeriod];
});

document.querySelectorAll('.info-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
        const infoType = event.target.getAttribute('data-info');
        let infoText = '';
        if (infoType === 'exit-load') {
            infoText = 'Exit load is a fee charged to investors when they redeem their units before a specified period.';
        } else if (infoType === 'expense-ratio') {
            infoText = 'Expense ratio is the fee charged by the fund to manage the investments, expressed as a percentage of the fund\'s average assets.';
        }
        document.getElementById('popup-content').innerText = infoText;
        document.getElementById('popup').style.display = 'block';
        document.querySelector('.popup-overlay').style.display = 'block';
    });
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.popup-overlay').style.display = 'none';
}
