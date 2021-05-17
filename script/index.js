var tipoDeUso;
var curExplicacion;

window.onload = function () {
  tipoDeUso = document.getElementById('uso');
  tipoDeUso.onchange = change;

  curExplicacion = document.getElementById('exp-' + tipoDeUso.value);
};

function change() {
  curExplicacion.hidden = true;
  curExplicacion = document.getElementById('exp-' + this.value);
  curExplicacion.hidden = false;
}
