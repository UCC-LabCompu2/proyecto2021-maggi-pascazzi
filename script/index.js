var tipoDeUso;
var curExplicacion;

window.onload = loadIndex;
/**
* Carga la view con la informacion necesaria
* @method loadIndex
*/
function loadIndex() {
  tipoDeUso = document.getElementById('uso');
  tipoDeUso.onchange = change;

  curExplicacion = document.getElementById('exp-' + tipoDeUso.value);

  document.getElementById('pres').onchange = checkPresupuesto();
};

/**
* Muestra una breve explicacion de que se necesita para dicho uso
* @method change
*/
function change() {
  curExplicacion.hidden = true;
  curExplicacion = document.getElementById('exp-' + this.value);
  curExplicacion.hidden = false;
}

/**
 * Checkea que el presupuesto sea suficiente para armar una PC
 * @method checkPresupuesto
 */
function checkPresupuesto() {
  if (this.value < 21800) {
    alert("Por menos de 21800 no vas a poder comprar nada");
  }
}
