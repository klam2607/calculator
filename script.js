var buttonLists = document.getElementsByClassName('grid-item');
var textBox = document.getElementById('text-box');
for (let button of buttonLists) {
  button.onclick = function() {
    console.log(button.innerHTML);
    textBox.value = button.innerHTML;
  }
}