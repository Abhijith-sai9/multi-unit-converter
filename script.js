const units = {
    length: ["km", "m", "cm"],
    weight: ["kg", "g"],
    temperature: ["C", "F", "K"],   // Added Kelvin
    time: ["sec", "min", "hr", "day"], // Added days
    data: ["KB", "MB", "GB", "TB"], // Added TB
    speed: ["kmh", "ms", "mph"]     // Added mph
};

window.onload = updateUnits;

function updateUnits() {
    let category = document.getElementById("category").value;
    let from = document.getElementById("fromUnit");
    let to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

    units[category].forEach(unit => {
        from.innerHTML += `<option value="${unit}">${unit}</option>`;
        to.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

function convert() {
    let value = parseFloat(document.getElementById("inputValue").value);

    if (isNaN(value)) {
        document.getElementById("result").innerText = "Enter valid number!";
        return;
    }

    let category = document.getElementById("category").value;
    let from = document.getElementById("fromUnit").value;
    let to = document.getElementById("toUnit").value;

    let result;

    // ================= LENGTH =================
    if (category === "length") {
        if (from === "km") value *= 1000;
        if (from === "cm") value /= 100;

        if (to === "km") result = value / 1000;
        else if (to === "cm") result = value * 100;
        else result = value;
    }

    // ================= WEIGHT =================
    if (category === "weight") {
        if (from === "kg") value *= 1000;

        if (to === "kg") result = value / 1000;
        else result = value;
    }

    // ================= TEMPERATURE =================
    if (category === "temperature") {
        // Convert everything to Celsius first
        if (from === "F") value = (value - 32) * 5/9;
        if (from === "K") value = value - 273.15;

        // Convert Celsius to target
        if (to === "F") result = (value * 9/5) + 32;
        else if (to === "K") result = value + 273.15;
        else result = value;
    }

    // ================= TIME =================
    if (category === "time") {
        // Convert to seconds
        if (from === "day") value *= 86400;
        if (from === "hr") value *= 3600;
        if (from === "min") value *= 60;

        // Convert to target
        if (to === "day") result = value / 86400;
        else if (to === "hr") result = value / 3600;
        else if (to === "min") result = value / 60;
        else result = value;
    }

    // ================= DATA =================
    if (category === "data") {
        // Convert to KB
        if (from === "TB") value *= 1024 * 1024 * 1024;
        else if (from === "GB") value *= 1024 * 1024;
        else if (from === "MB") value *= 1024;

        // Convert to target
        if (to === "TB") result = value / (1024 * 1024 * 1024);
        else if (to === "GB") result = value / (1024 * 1024);
        else if (to === "MB") result = value / 1024;
        else result = value;
    }

    // ================= SPEED =================
    if (category === "speed") {
        // Convert to m/s
        if (from === "kmh") value = value * (1000/3600);
        if (from === "mph") value = value * 0.44704;

        // Convert to target
        if (to === "kmh") result = value * (3600/1000);
        else if (to === "mph") result = value / 0.44704;
        else result = value;
    }

    document.getElementById("result").innerText =
        "Result: " + result.toFixed(4) + " " + to;
}