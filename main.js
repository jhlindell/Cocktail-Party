$("#addRecipeButton").on("click", addRecipeCard);
$("#addIngButton").on("click", addIngredient);
$("#recipeBox").on("click", updateRecipe);
var $recipes = $("#recipes");
$recipes.on("click", recipeCardClick);
var $ingredients = $("#ingredients");
var $recipeBox = $(".recipeBox");
var recipeCounter = 1;
var recipeObjectArray = [];
var removedCardNumbers =[];
var jungleBird = {
  name: "Jungle Bird",
  ingredients: [
    { measure:1.5,
      unit: "oz",
      ingredientName: "Cruzan Blackstrap Rum" },
    { measure:1.5,
      unit: "oz",
      ingredientName: "Pineapple Juice" },
    { measure:1.0,
      unit: "oz",
      ingredientName: "Campari" },
    { measure:0.5,
      unit: "oz",
      ingredientName: "Lime Juice" },
    { measure:0.5,
      unit: "oz",
      ingredientName: "Simple Syrup" }
  ],
  instructions: "shake and serve over ice",
  description: "the best tiki drink ever"
};
recipeObjectArray.push(jungleBird);

//adds another recipe card to the #recipes row
function addRecipeCard(event) {
  if (recipeCounter < 6) {
    recipeCounter++;
    let $clone = $("#cardClone").clone();
    $clone.toggle();
    $clone.removeAttr("id");
    if(removedCardNumbers.length){
      removedCardNumbers.sort();
      let cardNum = removedCardNumbers.shift();
      $clone.attr("data-recipe", cardNum);
      $clone.find(".panel-title").html("Recipe " + cardNum);
    } else {
      $clone.attr("data-recipe", recipeCounter);
      $clone.find(".panel-title").html("Recipe " + recipeCounter);
    }
    $clone.appendTo($recipes);
    if(recipeCounter === 6) {
      $("#addRecipeButton").toggle();
    }
    recipeObjectArray.push({});
  }
}

//dynamically adds an ingredient to the ingredient list in the #recipeBox
function addIngredient(event) {
  let $clone = $(".ingClone").clone();
  $clone.toggle();
  $clone.removeClass("ingClone");
  $clone.appendTo($ingredients);
}

//triggers the click event on a recipe card for the update or delete buttons
function recipeCardClick(event) {
  if($(event.target).hasClass("deleteButton")){
    removeCard(event);
  }
  if($(event.target).hasClass("updateRecipe")) {
    selectRecipeCard(event);
  }
}

//removes a recipe card from the #recipes row
function removeCard(event) {
  let $target = $(event.target).parent().parent().parent().parent();
  removedCardNumbers.push($target[0].dataset.recipe);
  $target.remove();
  recipeCounter--;
}

//makes a recipe card active after its update recipe button was clicked
function selectRecipeCard(event){
  let $target = $(event.target).parent().parent().parent();
  $target.removeClass("panel-default");
  $target.addClass("panel-primary");
  $($recipeBox).toggle();
  $(event.target).toggle();
}

//once recipe info is entered in #recipeBox, it is saved to object and sent back to the active recipe card
function updateRecipe(event){
  if($(event.target).hasClass("updateRecipeButton")){
    let $selectedCard = $recipes.find(".panel-primary");
    let $button = $selectedCard.find(".updateRecipe");
    buildRecipeObject();
    populateCard();
    $selectedCard.removeClass("panel-primary");
    $selectedCard.addClass("panel-default");
    $($recipeBox).toggle();
    $button.toggle();
  }
}

//builds a recipe object from entered information and saves it to array
function buildRecipeObject(){
  let recipeObj = {};
  recipeObj.name = $("#drinkName").val();
  recipeObj.instructions = $("#instructions").val();
  recipeObj.description = $("#description").val();
  recipeObj.ingredients = [];
  let $ingredients = $("#ingredients").children();
  //console.log($ingredients);
  $($ingredients).each(function(){
    if(!$(this).hasClass("ingClone")){
      let ingredientObj = {};
      ingredientObj.measure = $(this).find(".measure").val();
      ingredientObj.ingredientName = $(this).find(".ingName").val();
      ingredientObj.unit = "oz";
      recipeObj.ingredients.push(ingredientObj);
    }
  });
  //saveObject(recipeObj);
  return recipeObj;
}

function populateCard(){
  let $selectedCard = $recipes.find(".panel-primary");
  let recipeNumber = $selectedCard.parent()[0].dataset.recipe;
  let recipe = recipeObjectArray[recipeNumber - 1];
  let $recipeBody = $selectedCard.find(".recipeBody");
  //drink name
  let $recipeNameDiv = $("<div>");
  let $recipeNameH4 = $("<h4>");
  $recipeNameH4.html(recipe.name);
  $recipeNameDiv.append($recipeNameH4);
  $recipeBody.append($recipeNameDiv);
  //ingredients
  let $table = $("<table>");
  $table.addClass("table-striped");
  //$table.addClass("table-bordered");
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
  $recipeBody.append($table);
  //instructions
  let $instructions = $("<div>");
  let $instH = $("<h5>");
  $instH.html("Instructions:");
  let $instP = $("<p>");
  $instP.text(recipe.instructions);
  $instructions.append($instH);
  $instructions.append($instP);
  $recipeBody.append($instructions);
  //description
  let $description = $("<div>");
  let $descH = $("<h5>");
  $descH.html("Description");
  let $descP = $("<p>");
  $descP.text(recipe.description);
  $description.append($descH);
  $description.append($descP);
  $recipeBody.append($description);
}

function saveObject(recipeObj) {
  let $selectedCard = $recipes.find(".panel-primary").parent();
  let recipeNumber = $selectedCard[0].dataset.recipe;
  recipeObjectArray[recipeNumber] = recipeObj;
}
