var usos = {
    "game": [0.3, 0.4, 0.15, 0.15],
    "diseno": [0.3, 0.4, 0.2, 0.1],
    "edicion": [0.25, 0.4, 0.25, 0.10],
    "programming": [0.4, 0.1, 0.25, 0.25],
    "ligero": [0.4, 0.1, 0.1, 0.4]
}

var cpus = {
    tier1: {
        "Intel i3": {precio: 1, rendimiento: 1},
        "Amd Athlon": {},
        "Intel Pentium": {},
        "Amd Ryzen3": {}
    },
    tier2: {
        "Intel i5": {},
        "Amd Ryzen5":{},
        "Intel i7": {},
        "Amd Ryzen7": {}
    },
    tier3: {
        "Intel i9": {},
        "Intel Xeon": {},
        "Amd Ryzen9": {},
        "Amd Threadripper": {}
    }
}

var gpus = {
    tier1: {

    },
    tier2: {

    },
    tier3: {

    }
}

var rams = {
    "4gb": {},
    "8gb": {},
    "16gb": {},
    "32gb": {},
    "64gb": {}
}

var ssds = {
    "128gb": {},
    "256gb": {},
    "512gb": {},
    "1tb": {},
    "2tb": {}
}

/*
*
* @method window.onload
*/
window.onload = function () {
    let params = new URLSearchParams(location.search);
    let usuario = params.get("usuario");
    let presupuesto = params.get("presupuesto");
    let uso = params.get("uso");

    document.getElementById("header").innerHTML = usuario + " ya tenemos tu PC!"

    ubicarComponentes(presupuesto, uso);
}

/*
*
* @method ubicarComponentes
* @param {number} presupuesto - presupuesto del usuario
* @param {string} uso - uso que el usuario le va a dar a la PC
*/
function ubicarComponentes(presupuesto, uso) {
    let porcentajes = usos[uso];
    let p_cpu = porcentajes[0];
    let p_gpu = porcentajes[1];
    let p_ram = porcentajes[2];
    let p_ssd = porcentajes[3];
    let resultados = [cpus.tier3, gpus.tier3, rams["64gb"], ssds["2tb"]];

    for (const key of Object.keys(cpus)) {
        if (p_cpu * presupuesto <= key) {
            resultados[0] = key;

            var cpu = Object.keys(cpus[key])[0]
            document.getElementById("cpu").innerHTML = cpu;
            break;
        }
    }

    for (const key of Object.keys(gpus)) {
        if (p_gpu * presupuesto <= key) {
            resultados[1] = key;

            var gpu = Object.keys(gpus.key)[0]
            document.getElementById("gpu").innerHTML = gpu;
            break;
        }
    }

    for (const key of Object.keys(rams)) {
        if (p_ram * presupuesto <= rams[key].precio) {
            resultados[2] = key;

            var ram = Object.keys(rams[key])
            document.getElementById("ram").innerHTML = ram;
            break;
        }
    }

    for (const key of Object.keys(ssds)) {
        if (p_ssd * presupuesto <= ssds[key].precio) {
            resultados[3] = key;

            var ssd = Object.keys(ssds[key])
            document.getElementById("ssd").innerHTML = ssd;
            break;
        }
    }
}

function cambiar(componente, indice) {
    document.getElementById(componente).innerHTML = indice;
    var seleccionado = document.getElementById(componente + "-" + indice.toString());
}

var currMostrado = "cpu-options";
function mostrar(id) {
    document.getElementById(currMostrado).classList.add("hidden");
    document.getElementById(id + "-options").classList.remove("hidden");
    currMostrado = id + "-options";
}