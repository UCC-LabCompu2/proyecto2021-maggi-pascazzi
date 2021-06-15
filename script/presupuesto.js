var usos = {
    "game": [0.3, 0.4, 0.15, 0.15],
    "diseno": [0.3, 0.4, 0.2, 0.1],
    "edicion": [0.25, 0.4, 0.25, 0.10],
    "programming": [0.4, 0.1, 0.25, 0.25],
    "ligero": [0.4, 0.1, 0.1, 0.4]
}

const componentes = {
    cpus: {
        "Intel i3": {precio: 15500, rendimiento: "bajo"},
        "Intel i5": {precio: 26760, rendimiento: "medio"},
        "Intel i7": {precio: 49020, rendimiento: "med+"},
        "AMD 5900X": {precio: 77870, rendimiento: "alto"},
        "AMD 5950X": {precio: 106920, rendimiento: "max"}
    },

    gpus: { 
        "Integrados": {precio: 0, rendimiento: "bajo"},
        "Nvidia gtx 1650": {precio: 79785, rendimiento: "medio"},
        "Nvidia rtx 3060": {precio: 168999, rendimiento: "medio+"},
        "Nvidia rtx 3070": {precio: 264991, rendimiento: "alto"},
        "Nvidia rtx 3080": {precio: 448999, rendimiento: "max"}
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

let resultados = {
    cpu: "AMD 5950X",
    gpu: "Nvidia rtx 3080",
    ram: "64gb",
    ssd: "2tb"
}
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

    document.getElementById("cpu").innerHTML = resultados.cpu; // default
    document.getElementById("gpu").innerHTML = resultados.gpu;
    document.getElementById("ram").innerHTML = resultados.ram;
    document.getElementById("ssd").innerHTML = resultados.ssd;

    for (const key of Object.keys(componentes.cpus)) {
        if (p_cpu * presupuesto <= componentes.cpus[key].precio) {
            resultados.cpu = key;

            document.getElementById("cpu").innerHTML = key;
            break;
        }
    }

    for (const key of Object.keys(componentes.gpus)) {
        if (p_gpu * presupuesto <= componentes.gpus[key].precio) {
            resultados.gpu = key;

            document.getElementById("gpu").innerHTML = key;
            break;
        }
    }

    for (const key of Object.keys(componentes.rams)) {
        if (p_ram * presupuesto <= componentes.rams[key].precio) {
            resultados.ram = key;

            document.getElementById("ram").innerHTML = key;
            break;
        }
    }

    for (const key of Object.keys(componentes.ssds)) {
        if (p_ssd * presupuesto <= componentes.ssds[key].precio) {
            resultados.ssd = key;

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
    var i = 1;
    for (const key of Object.keys(componentes.cpus)) {
        if (key !== resultados.cpu) {
            ubicar("cpu", key, i);
            i++;
        }
    }

    i = 1;
    for (const key of Object.keys(componentes.gpus)) {
        if (key !== resultados.gpu) {
            ubicar("gpu", key, i);
            i++;
        }
    }

    i = 1;
    for (const key of Object.keys(componentes.rams)) {
        if (key !== resultados.ram) {
            ubicar("ram", key, i);
            i++;
        }
    }

    i = 1;
    for (const key of Object.keys(componentes.ssds)) {
        if (key !== resultados.ssd) {
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

    resultados[componente] = curr.innerHTML;

    ubicar(componente, key, indice);
    dibujar();
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

/**
 * Dibuja el grafico en el canvas
 * @method dibujar
 */
function dibujar() {

}
