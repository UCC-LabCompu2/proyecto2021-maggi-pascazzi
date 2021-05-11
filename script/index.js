var tipoDeUso;
var curExplicacion;
var value = 'exp-game';

window.onload = function () {
  tipoDeUso = document.getElementById('uso');
  tipoDeUso.onchange = change;

  curExplicacion = document.getElementById('exp-game');
};

function change() {
  curExplicacion.hidden = true;
  value = tipoDeUso.value;
  document.getElementById('exp-' + value).hidden = false;
  curExplicacion = document.getElementById('exp-' + value);
}
