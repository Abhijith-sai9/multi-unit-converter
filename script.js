const units = {
    length: ["km", "m", "cm"],
    weight: ["kg", "g"],
    temperature: ["C", "F", "K"],
    time: ["sec", "min", "hr", "day"],
    data: ["KB", "MB", "GB", "TB"],
    speed: ["kmh", "ms", "mph"]
};

const input = document.getElementById("inputValue");
const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultBox = document.getElementById("result");

// Load units
window.onload = updateUnits;

// Auto convert on change
input.addEventListener("input", convert);
category.addEventListener("change", () => {
    updateUnits();
    convert();
});
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

function updateUnits() {
    let cat = category.value;
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    units[cat].forEach(u => {
        fromUnit.innerHTML += `<option value="${u}">${u}</option>`;
        toUnit.innerHTML += `<option value="${u}">${u}</option>`;
    });
}

function convert() {
    let value = parseFloat(input.value);

    if (isNaN(value)) {
        resultBox.innerText = "Result: --";
        return;
    }

    let cat = category.value;
    let from = fromUnit.value;
    let to = toUnit.value;
    let result;

    // LENGTH
    if (cat === "length") {
        if (from === "km") value *= 1000;
        if (from === "cm") value /= 100;

        if (to === "km") result = value / 1000;
        else if (to === "cm") result = value * 100;
        else result = value;
    }

    // WEIGHT
    if (cat === "weight") {
        if (from === "kg") value *= 1000;
        if (to === "kg") result = value / 1000;
        else result = value;
    }

    // TEMPERATURE
    if (cat === "temperature") {
        if (from === "F") value = (value - 32) * 5/9;
        if (from === "K") value -= 273.15;

        if (to === "F") result = (value * 9/5) + 32;
        else if (to === "K") result = value + 273.15;
        else result = value;
    }

    // TIME
    if (cat === "time") {
        if (from === "day") value *= 86400;
        if (from === "hr") value *= 3600;
        if (from === "min") value *= 60;

        if (to === "day") result = value / 86400;
        else if (to === "hr") result = value / 3600;
        else if (to === "min") result = value / 60;
        else result = value;
    }

    // DATA
    if (cat === "data") {
        if (from === "TB") value *= 1024**3;
        else if (from === "GB") value *= 1024**2;
        else if (from === "MB") value *= 1024;

        if (to === "TB") result = value / (1024**3);
        else if (to === "GB") result = value / (1024**2);
        else if (to === "MB") result = value / 1024;
        else result = value;
    }

    // SPEED
    if (cat === "speed") {
        if (from === "kmh") value *= (1000/3600);
        if (from === "mph") value *= 0.44704;

        if (to === "kmh") result = value * (3600/1000);
        else if (to === "mph") result = value / 0.44704;
        else result = value;
    }

    resultBox.innerText = `Result: ${result.toFixed(4)} ${to}`;
}
