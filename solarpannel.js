document.getElementById('choice').addEventListener('change', function () {
    const choice = this.value;
    if (choice === '1') {
        document.getElementById('area-container').style.display = 'block';
        document.getElementById('power-container').style.display = 'none';
    } else if (choice === '2') {
        document.getElementById('area-container').style.display = 'none';
        document.getElementById('power-container').style.display = 'block';
    }
});

function calculate() {
    const choice = document.getElementById('choice').value;
    const energyKwh = parseFloat(document.getElementById('energy').value);
    let area = 0, powerSupply = 0, panelSizeWatts, numPanels, batteryAh, chargeControllerAmp, inverterVa, totalCost;
    const sunlightHours = 6;
    const energyWh = energyKwh * 1000;

    if (isNaN(energyKwh) || energyKwh <= 0) {
        alert("Please enter a valid energy value in kWh.");
        return;
    }

    if (choice === '1') {
        area = parseFloat(document.getElementById('area').value);
        if (isNaN(area) || area <= 0) {
            alert("Please enter a valid area in square meters.");
            return;
        }
        panelSizeWatts = calculatePanelSize(area);
        totalCost = (area * 6202) + 10000;
    } else if (choice === '2') {
        powerSupply = parseFloat(document.getElementById('power').value);
        if (isNaN(powerSupply) || powerSupply <= 0) {
            alert("Please enter a valid power supply in kW.");
            return;
        }
        panelSizeWatts = calculatePanelSizeFromPower(powerSupply);
        totalCost = 10000; // Since area is not provided, set the base cost.
    } else {
        alert('Invalid choice.');
        return;
    }

    numPanels = panelSizeWatts / 300;
    batteryAh = Math.max(energyWh / 12, 200);
    chargeControllerAmp = panelSizeWatts / 12;
    inverterVa = batteryAh + (20 / 100) * batteryAh;

    const governmentEarnings = (energyKwh * 3) * 1000;
    const privateCompanyEarnings = (energyKwh * 7) * 1000;

    const earningsPerDayGovernment = governmentEarnings / 365;
    const earningsPerMonthGovernment = governmentEarnings / 12;
    const earningsPerYearGovernment = governmentEarnings;

    const earningsPerDayPrivate = privateCompanyEarnings / 365;
    const earningsPerMonthPrivate = privateCompanyEarnings / 12;
    const earningsPerYearPrivate = privateCompanyEarnings;

    document.getElementById('results').innerHTML = `
        <h2>Results:</h2>
        <p>Panel Size: ${panelSizeWatts.toFixed(2)} watts</p>
        <p>Number of Panels: ${numPanels.toFixed(2)}</p>
        <p>Battery: ${batteryAh.toFixed(2)} AH</p>
        <p>Charge Controller: ${chargeControllerAmp.toFixed(2)} Amperes</p>
        <p>Inverter: ${inverterVa.toFixed(2)} VA</p>
        <p>Total Cost: Rs. ${totalCost.toFixed(2)}</p>
        <h2>Earnings from Government:</h2>
        <p>Per Day: Rs. ${earningsPerDayGovernment.toFixed(2)}</p>
        <p>Per Month: Rs. ${earningsPerMonthGovernment.toFixed(2)}</p>
        <p>Per Year: Rs. ${earningsPerYearGovernment.toFixed(2)}</p>
        <h2>Earnings from Private Company:</h2>
        <p>Per Day: Rs. ${earningsPerDayPrivate.toFixed(2)}</p>
        <p>Per Month: Rs. ${earningsPerMonthPrivate.toFixed(2)}</p>
        <p>Per Year: Rs. ${earningsPerYearPrivate.toFixed(2)}</p>
    `;
}

function calculatePanelSize(area) {
    return area * 150;
}

function calculatePanelSizeFromPower(powerSupply) {
    return (powerSupply * 1000) / 6;
}
