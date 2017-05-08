$("#addRecipeButton").on("click", addRecipeCard);
$("#addIngButton").on("click", addIngredient);
$("#recipeBox").on("click", updateRecipe);
$(".loadButton").on("click", loadRecipes);
$(".saveButton").on("click", saveRecipes);
var $recipes = $("#recipes");
$recipes.on("click", recipeCardClick);
var $ingredients = $("#ingredients");
var $recipeBox = $(".recipeBox");
var recipeCounter = 1;
var recipeObjectArray = [];
var removedCardNumbers =[];

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
  let cardNumber = $target[0].dataset.recipe;
  removedCardNumbers.push(cardNumber);
  recipeObjectArray.splice(cardNumber-1, 1);
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
    let recipeNumber = $selectedCard.parent()[0].dataset.recipe;
    buildRecipeObject();
    populateCard(recipeNumber);
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
      ingredientObj.unit = $(this).find(".unit").val();
      recipeObj.ingredients.push(ingredientObj);
    }
  });
  saveObject(recipeObj);
}

function populateCard(num){
  let $selectedCard = $recipes.find("[data-recipe='" + num + "']");
  let recipeNumber = $selectedCard[0].dataset.recipe;
  let recipe = recipeObjectArray[recipeNumber - 1];
  let $recipeBody = $selectedCard.find(".recipeBody");
  $recipeBody.empty();
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
  recipeObjectArray[recipeNumber - 1] = recipeObj;
}

function initializePage(array){
  let numRecipies = array.length;
  for(let i = 0; i < numRecipies; i++){
    if (i === 0) {
      populateCard(1);
    } else {
      addRecipeCard();
      populateCard(i+1);
    }
  }
  //test local storage
  // localStorage.setItem('recipes', JSON.stringify(recipeObjectArray));
  // let recipies = JSON.parse(localStorage.getItem('recipes'));
}

function loadRecipes() {
  // var jungleBird = {
  //   name: "Jungle Bird",
  //   ingredients: [
  //     { measure:1.5,
  //       unit: "oz",
  //       ingredientName: "Cruzan Blackstrap Rum" },
  //     { measure:1.5,
  //       unit: "oz",
  //       ingredientName: "Pineapple Juice" },
  //     { measure:1.0,
  //       unit: "oz",
  //       ingredientName: "Campari" },
  //     { measure:0.5,
  //       unit: "oz",
  //       ingredientName: "Lime Juice" },
  //     { measure:0.5,
  //       unit: "oz",
  //       ingredientName: "Simple Syrup" }
  //   ],
  //   instructions: "shake and serve over ice",
  //   description: "the best tiki drink ever"
  // };
  // var oldFashioned = {
  //   name: "Old Fashioned",
  //   ingredients: [
  //     { measure:2.0,
  //       unit: "oz",
  //       ingredientName: "Rittenhouse Rye" },
  //     { measure:0.3,
  //       unit: "oz",
  //       ingredientName: "Simple Syrup" },
  //     { measure:2.0,
  //       unit: "dash",
  //       ingredientName: "Angostura Bitters" },
  //     { measure:1.0,
  //       unit: "each",
  //       ingredientName: "Luxardo Cherry" }
  //   ],
  //   instructions: "Build in glass over ice",
  //   description: "the old classic"
  // };
  // recipeObjectArray = [];
  // recipeObjectArray.push(jungleBird);
  // recipeObjectArray.push(oldFashioned);
  recipeObjectArray = JSON.parse(localStorage.getItem('recipes'));
  initializePage(recipeObjectArray);
}

function saveRecipes(){
  localStorage.setItem('recipes', JSON.stringify(recipeObjectArray));
}
