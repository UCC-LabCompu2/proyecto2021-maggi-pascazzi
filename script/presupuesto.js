var usos = {
    "game": [0.3, 0.4, 0.15, 0.15],
    "diseno": [0.3, 0.4, 0.2, 0.1],
    "edicion": [0.25, 0.4, 0.25, 0.10],
    "programming": [0.4, 0.1, 0.25, 0.25],
    "ligero": [0.4, 0.1, 0.1, 0.4]
}

const componentes = {
    cpus: {
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
    },

    gpus: {
        tier1: {
    
        },
        tier2: {
    
        },
        tier3: {
    
        }
    },

    rams: {
        "4gb": {precio: 2000, rendimiento: "bajo"},
        "8gb": {precio: 7000, rendimiento: "medio"},
        "16gb": {precio: 14000, rendimiento: "med+"},
        "32gb": {precio: 30000, rendimiento: "alto"},
        "64gb": {precio: 67000, rendimiento: "max"}
    },

    ssds: {
        "128gb": {precio: 4300, rendimiento: "bajo"},
        "256gb": {precio: 6400, rendimiento: "medio"},
        "512gb": {precio: 10000, rendimiento: "med+"},
        "1tb": {precio: 20000, rendimiento: "alto"},
        "2tb": {precio: 67000, rendimiento: "max"}
    }        
}

window.onload = loadPresupuesto;
let presupuesto;
/**
* Carga la view con la informacion necesaria
* @method loadPresupuesto
*/
function loadPresupuesto() {
    let params = new URLSearchParams(location.search);
    let usuario = params.get("usuario");
    presupuesto = params.get("presupuesto");
    let uso = params.get("uso");

    document.getElementById("header").innerHTML = usuario + " ya tenemos tu PC!"

    ubicarComponentes(presupuesto, uso);
    ubicarOpciones();
}

let resultados = ["tier3", "tier3", "64gb", "2tb"];
/**
* Ubica los componentes en la view dependiendo del presupuesto y uso del usuario
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

    for (const key of Object.keys(componentes.cpus)) {
        if (p_cpu * presupuesto <= key) {
            resultados[0] = key;

            var cpu = Object.keys(componentes.cpus[key])[0];
            document.getElementById("cpu").innerHTML = cpu;
            break;
        }
    }

    for (const key of Object.keys(componentes.gpus)) {
        if (p_gpu * presupuesto <= key) {
            resultados[1] = key;

            var gpu = Object.keys(componentes.gpus[key])[0];
            document.getElementById("gpu").innerHTML = gpu;
            break;
        }
    }

    for (const key of Object.keys(componentes.rams)) {
        if (p_ram * presupuesto <= componentes.rams[key].precio) {
            resultados[2] = key;

            document.getElementById("ram").innerHTML = key;
            break;
        }
    }

    for (const key of Object.keys(componentes.ssds)) {
        if (p_ssd * presupuesto <= componentes.ssds[key].precio) {
            resultados[3] = key;

            document.getElementById("ssd").innerHTML = key;
            break;
        }
    }
}

/**
 * Ubica las opciones en el options-holder
 * @method ubicarOpciones
 */
function ubicarOpciones() {
    var i;

    i = 1;
    for (const key of Object.keys(componentes.rams)) {
        if (key !== resultados[2]) {
            ubicar("ram", key, i);
            i++;
        }
    }

    i = 1;
    for (const key of Object.keys(componentes.ssds)) {
        if (key !== resultados[3]) {
            ubicar("ssd", key, i);
            i++;
        }
    }
}

/**
 * Ubica el componente en su celda
 * @param {string} componente Tipo de componente (cpu, gpu, ram o ssd)
 * @param {string} key Llave del componente a ubicar
 * @param {number} indice Indice de la celda donde ubicarla
 */
function ubicar(componente, key, indice) {
    var seleccionado = document.getElementById(componente + "-" + indice.toString());
    console.log(componente + "-" + indice.toString(), seleccionado);

    var title = seleccionado.children[0];
    var opcion = title.children[0];

    var more = seleccionado.children[1];
    var precio = more.children[0];
    var rendimiento = more.children[1];

    var object = componentes[componente + "s"][key];

    opcion.innerHTML = key;
    precio.innerHTML = "Precio: " + object.precio;
    rendimiento.innerHTML = "Rendmiento: " + object.rendimiento;
}

/**
* Cambia el componente actual por el seleccionado y calcula el nuevo grafico
* @method cambiar
* @param {string} componente - componente de la pc (cpu, gpu, ram o ssd)
* @param {string} indice - indice del boton clickeado
*/
function cambiar(componente, indice) {
    var curr = document.getElementById(componente);
    var seleccionado = document.getElementById(componente + "-" + indice.toString());
    var title = seleccionado.children[0];
    var opcion = title.children[0];

    var key = curr.innerHTML;
    curr.innerHTML = opcion.innerHTML;

    ubicar(componente, key, indice);
}

var currMostrado = "cpu-options";
/**
* Muestra las opciones para el componente clickeado (cpu, gpu, ram o ssd)
* @method mostrar
* @param {string} id - id del componente a mostrar
*/
function mostrar(id) {
    document.getElementById(currMostrado).classList.add("hidden");
    document.getElementById(id + "-options").classList.remove("hidden");
    currMostrado = id + "-options";
}