$("#pdfButton").on("click", getPdf);
var currentParty = JSON.parse(localStorage.getItem('sessionPersistance'));
var recipeList = currentParty.recipes;
var masterList = [];
calculateMasterList();
buildTable();
// sample ingredient object
//      { measure:1.5,
//       unit: "oz",
//       ingredientName: "Cruzan Blackstrap Rum" }

function calculateMasterList(array) {
  for(let i = 0; i < recipeList.length; i++) {
    for(let j = 0; j < recipeList[i].ingredients.length; j++) {
      let ingredient = recipeList[i].ingredients[j];
      ingredient.measure *= currentParty.guestCount;
      masterList.push(ingredient);
    }
  }
  for(let k = 0; k < masterList.length; k++) {
    for(let l = k + 1; l < masterList.length; l++) {
      if(masterList[k].ingredientName.toLowerCase() === masterList[l].ingredientName.toLowerCase() && masterList[k].unit === masterList[l].unit) {
        masterList[k].measure += masterList[l].measure;
        masterList.splice(l, 1);
       }
    }
  }
}

function buildTable() {
  for(let i = 0; i < masterList.length; i++) {
    let $tbody = $("#tableBody");
    let $tr = $("<tr>");
    let $measure = $("<td>");
    $measure.text(masterList[i].measure);
    let $unit = $("<td>");
    $unit.text(masterList[i].unit);
    let $ingredientName = $("<td>");
    $ingredientName.text(masterList[i].ingredientName);
    $tr.append($measure);
    $tr.append($unit);
    $tr.append($ingredientName);
    $tbody.append($tr);
  }
}

function getPdf() {
  
}
