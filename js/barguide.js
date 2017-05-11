var currentParty = JSON.parse(localStorage.getItem('sessionPersistance'));
recipeList = currentParty.recipes;
var $tableBody = $("#tableBody");
populateGuide();

function populateGuide() {
  recipeList.forEach(function(recipe) {
    let $recipeTr = $("<tr>");
    let $recipeTd = $("<td>");
    $recipeTr.append($recipeTd);
    let $recipeNameDiv = $("<div>");
    let $recipeNameH = $("<h2>");
    $recipeNameH.html(recipe.name);
    $recipeNameDiv.append($recipeNameH);
    $recipeTd.append($recipeNameDiv);
    //ingredients
    let $table = $("<table>");
    $table.addClass("table-striped");
    $table.addClass("table-styling");
    let $tbody = $("<tbody>");
    $table.append($tbody);
    $(recipe.ingredients).each(function() {
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
    $instP.text(recipe.instructions);
    $instructions.append($instH);
    $instructions.append($instP);
    $recipeTd.append($instructions);
    //description
    // let $description = $("<div>");
    // let $descH = $("<h5>");
    // $descH.html("Description:");
    // let $descP = $("<p>");
    // $descP.text(recipe.description);
    // $description.append($descH);
    // $description.append($descP);
    // $recipeTd.append($description);
    $tableBody.append($recipeTr);
  });
}
