var currentParty = JSON.parse(localStorage.getItem('sessionPersistance'));
recipeList = currentParty.recipes;
var $menuBody = $("#menuBody");
populateMenu();

function populateMenu() {
  recipeList.forEach(function(recipe) {
    let $recipeTr = $("<tr>");
    let $recipeTd = $("<td>");
    $recipeTr.append($recipeTd);
    let $recipeNameDiv = $("<div>");
    let $recipeNameH = $("<h3>");
    $recipeNameH.html(recipe.name);
    $recipeNameDiv.append($recipeNameH);
    $recipeTd.append($recipeNameDiv);
    //ingredients
    let $table = $("<table>");
    $table.addClass("table-styling");
    let $tbody = $("<tbody>");
    $table.append($tbody);
    let $tr = $("<tr>");
    let $p = $("<p>");
    let ingredientString = "";
    for(let i = 0; i < recipe.ingredients.length; i++){
      ingredientString += recipe.ingredients[i].ingredientName;
      if(i < recipe.ingredients.length-1){
        ingredientString += ", ";
      }
    }
    $p.text(ingredientString);
    $tr.append($p);
    $tbody.append($tr);
    $recipeTd.append($table);
    //instructions

    //description
    let $description = $("<div>");
    let $descP = $("<p>");
    $descP.text(recipe.description);
    $description.append($descP);
    $recipeTd.append($description);
    $menuBody.append($recipeTr);
  });
}
