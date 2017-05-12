var currentParty = JSON.parse(localStorage.getItem('sessionPersistance'));
recipeList = currentParty.recipes;
var $tableBody = $("#tableBody");
var numRecipes = currentParty.recipes.length;
var counterIndex = 0;
var tableBuilder = window.setInterval(populateGuide, 500);

function populateGuide() {
    let $recipeTr = $("<tr>");
    $recipeTr.addClass("animated");
    $recipeTr.addClass("slideInDown");
    let $recipeTd = $("<td>");
    $recipeTr.append($recipeTd);
    let $recipeNameDiv = $("<div>");
    let $recipeNameH = $("<h1>");
    $recipeNameH.html(recipeList[counterIndex].name);
    $recipeNameDiv.append($recipeNameH);
    $recipeTd.append($recipeNameDiv);
    //ingredients
    let $table = $("<table>");
    $table.addClass("table-striped");
    $table.addClass("table-barStyle");
    let $tbody = $("<tbody>");
    $table.append($tbody);
    $(recipeList[counterIndex].ingredients).each(function() {
      let $tr = $("<tr>");
      let $measure = $("<td>");
      $measure.text(this.measure);
      let $unit = $("<td>");
      $unit.text(this.unit);
      let $ingredientName = $("<td>");
      $ingredientName.text(this.ingredientName);
      $tr.append($measure);
      $tr.append($unit);
      $tr.append($ingredientName);
      $tbody.append($tr);
    });
    $recipeTd.append($table);
    //instructions
    let $instructions = $("<div>");
    let $instH = $("<h3>");
    $instH.html("Instructions:");
    let $instP = $("<p>");
    $instP.text(recipeList[counterIndex].instructions);
    $instructions.append($instH);
    $instructions.append($instP);
    $recipeTd.append($instructions);
    //let $hr = $("<hr>");
    $tableBody.append($recipeTr);
    //$tableBody.append($hr);
    counterIndex++;
    if(counterIndex === numRecipes){
      clearInterval(tableBuilder);
    }
}
