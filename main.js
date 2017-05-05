$('#addButton').on('click', addRecipeCard);
$('#addIngButton').on('click', addIngredient);
var $recipes = $('#recipes');
var $ingredients = $('#ingredients');
var recipeCounter = 1;

function addRecipeCard(event) {
  if (recipeCounter < 6) {
    let $clone = $("#cardClone").clone();
    $clone.toggle();
    $clone.removeAttr("id");
    $clone.appendTo($recipes);
    recipeCounter++;
    if(recipeCounter === 6) {
      $("#addButton").toggle();
    }
  }
}

function addIngredient(event) {
  let $clone = $("#ingClone").clone();
  $clone.toggle();
  $clone.removeAttr("id");
  $clone.appendTo($ingredients);
}
