$("#pdfButton").on("click", getPdf);
let $tbody = $("#tableBody");
var currentParty = JSON.parse(localStorage.getItem('sessionPersistance'));
var recipeList = currentParty.recipes;
var masterList = [];
calculateMasterList();
var numIngredients;
var counterIndex = 0;
var tableBuilder = window.setInterval(buildTable, 300);
// sample ingredient object
//      { measure:1.5,
//       unit: "oz",
//       ingredientName: "Cruzan Blackstrap Rum" }

function calculateMasterList(array) {
  for (let i = 0; i < recipeList.length; i++) {
    for (let j = 0; j < recipeList[i].ingredients.length; j++) {
      let ingredient = recipeList[i].ingredients[j];
      ingredient.measure *= currentParty.guestCount;
      masterList.push(ingredient);
    }
  }
  for (let k = 0; k < masterList.length; k++) {
    for (let l = k + 1; l < masterList.length; l++) {
      if (masterList[k].ingredientName.toLowerCase() === masterList[l].ingredientName.toLowerCase() && masterList[k].unit === masterList[l].unit) {
        masterList[k].measure += masterList[l].measure;
        masterList.splice(l, 1);
      }
    }
  }
  numIngredients = masterList.length;
}

function buildTable() {
  let $tr = $("<tr>");
  $tr.addClass("animated");
  $tr.addClass("slideInDown");
  let $measure = $("<td>");
  $measure.text(masterList[counterIndex].measure.toFixed(1));
  let $unit = $("<td>");
  $unit.text(masterList[counterIndex].unit);
  let $ingredientName = $("<td>");
  $ingredientName.text(masterList[counterIndex].ingredientName);
  $tr.append($measure);
  $tr.append($unit);
  $tr.append($ingredientName);
  $tbody.append($tr);
  counterIndex++;
  if (counterIndex === numIngredients) {
    clearInterval(tableBuilder);
  }
}

function getPdf() {
  var urlString = 'http://api.pdflayer.com/api/convert?access_key=[nokey]&document_url=https%3A%2F%2Fjhlcocktails.surge.sh%2Fmstringr.html';

}
