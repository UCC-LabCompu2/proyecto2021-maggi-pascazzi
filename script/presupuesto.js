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

var ram = {
    "4gb": {},
    "8gb": {},
    "16gb": {},
    "32gb": {},
    "64gb": {}
}

var ssd = {
    "128gb": {},
    "256gb": {},
    "512gb": {},
    "1tb": {},
    "2tb": {}
}

var usuario;
var presupuesto;
var uso;
window.onload = function () {
    let params = new URLSearchParams(location.search);
    usuario = params.get("usuario");
    presupuesto = params.get("presupuesto");
    uso = params.get("uso");

    document.getElementById("header").innerHTML = usuario + " ya tenemos tu PC!"
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