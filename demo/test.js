var writer;
var isCharVisible;
var isOutlineVisible;

function printStrokePoints(data) {
  var pointStrs = data.drawnPath.points.map((point) => `{x: ${point.x}, y: ${point.y}}`);
  console.log(`[${pointStrs.join(', ')}]`);
}

function updateCharacter() {
  document.querySelector('#target').innerHTML = '';

  var character = document.querySelector('.js-char').value;
  window.location.hash = character;
  writer = HanziWriter.create('target', character, {
    width: 400,
    height: 400,
    renderer: 'svg',
    radicalColor: '#166E16',
    onCorrectStroke: printStrokePoints,
    onMistake: printStrokePoints,
    showCharacter: false,
  });
  isCharVisible = true;
  isOutlineVisible = true;
  var colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6'];
  writer.getCharacterData().then(function (char) {
    var strokeColors = char.strokes.map(function (_, i) {
      return colors[i % colors.length];
    });
    writer.setStrokeColors(strokeColors);
  });
  window.writer = writer;
}

window.onload = function () {
  var char = decodeURIComponent(window.location.hash.slice(1));
  if (char) {
    document.querySelector('.js-char').value = char;
  }

  updateCharacter();

  // document.querySelector('.js-char-form').addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   updateCharacter();
  // });

  // document.querySelector('.js-toggle').addEventListener('click', function () {
  //   isCharVisible ? writer.hideCharacter() : writer.showCharacter();
  //   isCharVisible = !isCharVisible;
  // });
  // document.querySelector('.js-toggle-hint').addEventListener('click', function () {
  //   isOutlineVisible ? writer.hideOutline() : writer.showOutline();
  //   isOutlineVisible = !isOutlineVisible;
  // });
  document.querySelector('.js-animate').addEventListener('click', function () {
    writer.animateCharacter();
  });
  // document.querySelector('.js-quiz').addEventListener('click', function () {
  //   writer.quiz({
  //     showOutline: true,
  //   });
  // });
  // document.querySelector('.js-stroke-colors').addEventListener('click', function () {
  //   // Assign a rainbow palette cycling through strokes
  //   var colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6'];
  //   writer.getCharacterData().then(function (char) {
  //     var strokeColors = char.strokes.map(function (_, i) {
  //       return colors[i % colors.length];
  //     });
  //     writer.setStrokeColors(strokeColors);
  //   });
  // });
  // document.querySelector('.js-stroke-colors-reset').addEventListener('click', function () {
  //   writer.setStrokeColors(null);
  // });
};
