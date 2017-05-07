$("#addRecipeButton").on("click", addRecipeCard);
$("#addIngButton").on("click", addIngredient);
$("#recipeBox").on("click", updateRecipe);
var $recipes = $("#recipes");
$recipes.on("click", recipeCardClick);
var $ingredients = $("#ingredients");
var $recipeBox = $(".recipeBox");
var recipeCounter = 1;

function addRecipeCard(event) {
  if (recipeCounter < 6) {
    let $clone = $("#cardClone").clone();
    $clone.toggle();
    $clone.removeAttr("id");
    $clone.appendTo($recipes);
    recipeCounter++;
    if(recipeCounter === 6) {
      $("#addRecipeButton").toggle();
    }
  }
}

function addIngredient(event) {
  let $clone = $("#ingClone").clone();
  $clone.toggle();
  $clone.removeAttr("id");
  $clone.appendTo($ingredients);
}

function recipeCardClick(event) {
  if($(event.target).hasClass("deleteButton")){
    removeCard(event);
  }
  if($(event.target).hasClass("updateRecipe")) {
    selectRecipeCard(event);
  }
}

function removeCard(event) {
  let $target = $(event.target).parent().parent().parent().parent();
  $target.remove();
  recipeCounter--;
}

function selectRecipeCard(event){
  let $target = $(event.target).parent().parent().parent();
  $target.removeClass("panel-default");
  $target.addClass("panel-primary");
  $($recipeBox).toggle();
  $(event.target).toggle();
}

function updateRecipe(event){
  if($(event.target).hasClass("updateRecipeButton")){
    let $selectedCard = $recipes.find(".panel-primary");
    $selectedCard.find(".updateRecipe").toggle();
    let recipe = buildRecipeObject();
    populateCard(recipe);
  }
}

function buildRecipeObject(){
  let recipeObj = {};
  recipeObj.name = $("#drinkName").val();
  recipeObj.instructions = $("#instructions").val();
  recipeObj.description = $("#description").val();
  recipeObj.ingredients = [];
  let $ingredients = $("#ingredients").children();
  // $($ingredients).each(function(){
  //   let ingredientObj = {};
  //   ingredientObj.measure = $(this).find(".measure").val();
  //   ingredientObj.ingredientName = $(this).find(".ingName").val();
  //   ingredientObj.unit = "oz";
  //   recipeObj.ingredients.push(ingredientObj);
  // });
  for(let i = 0; i < $ingredients.length; i++){
    let ingredientObj = {};
    ingredientObj.measure = $($ingredients[i]).find(".measure").val();
    ingredientObj.ingredientName = $($ingredients[i]).find(".ingName").val();
    ingredientObj.unit = "oz";
    recipeObj.ingredients.push(ingredientObj);
  }
  return recipeObj;
}

function populateCard(recipe){
  
}
