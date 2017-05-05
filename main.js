$('#addButton').on('click', addRecipeCard);
var $recipes = $('#recipes');
var recipeCounter = 1;

function addRecipeCard(event) {
  if (recipeCounter < 6) {
    var $clone = $("#cardClone").clone();
    $clone.toggle();
    $clone.removeAttr("id");
    $clone.appendTo($recipes);
    recipeCounter++;
    if(recipeCounter === 6) {
      $("#addButton").toggle();
    }
  }

}
