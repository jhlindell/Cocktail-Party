$("#addRecipeButton").on("click", addRecipeCard);
$("#addIngButton").on("click", addIngredient);
$("#recipeBox").on("click", updateRecipe);
$(".loadButton").on("click", callFirebase);
$(".saveButton").on("click", saveRecipes);
$(".clearButton").on("click", clearSession);
var $recipes = $("#recipes");
$recipes.on("click", recipeCardClick);
var $ingredients = $("#ingredients");
var $recipeBox = $(".recipeBox");
var recipeCounter = 1;
var recipeObjectArray = [];
var removedCardNumbers = [];
var partyNames = [];
//load partyNames from firebase
getPartyNames();
var currentParty = {recipes:[]};

//loads session from local storage
clearRecipes();
var tempObj = JSON.parse(localStorage.getItem('sessionPersistance'));
if(tempObj !== null){
  currentParty = tempObj;
}
if(currentParty.recipes === undefined){
  recipeObjectArray = [];
} else {
  recipeObjectArray = currentParty.recipes;
}
if(currentParty.hasOwnProperty('recipes')){
  initializePage();
}

//adds another recipe card to the #recipes row
function addRecipeCard(event) {
  if (recipeCounter < 6) {
    recipeCounter++;
    let $clone = $("#cardClone").clone();
    $clone.toggle();
    $clone.removeAttr("id");
    $clone.addClass("recipeCards");
    if (removedCardNumbers.length) {
      removedCardNumbers.sort();
      let cardNum = removedCardNumbers.shift();
      $clone.attr("data-recipe", cardNum);
      $clone.find(".panel-title").html("Recipe " + cardNum);
    } else {
      $clone.attr("data-recipe", recipeCounter);
      $clone.find(".panel-title").html("Recipe " + recipeCounter);
    }
    $clone.appendTo($recipes);
    if (recipeCounter === 6) {
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
  if ($(event.target).hasClass("deleteButton")) {
    removeCard(event);
  }
  if ($(event.target).hasClass("updateRecipe")) {
    selectRecipeCard(event);
  }
}

//removes a recipe card from the #recipes row
function removeCard(event) {
  let $target = $(event.target).parent().parent().parent().parent();
  let cardNumber = $target[0].dataset.recipe;
  removedCardNumbers.push(cardNumber);
  recipeObjectArray.splice(cardNumber - 1, 1);
  $target.remove();
  recipeCounter--;
}

//makes a recipe card active after its update recipe button was clicked
function selectRecipeCard(event) {
  let $target = $(event.target).parent().parent().parent();
  $target.removeClass("panel-default");
  $target.addClass("panel-primary");
  $($recipeBox).toggle();
  populateRecipeBox();
  let $buttons = $("#recipes .updateRecipe");
  $buttons.toggle();
}

//once recipe info is entered in #recipeBox, it is saved to object and sent back to the active recipe card
function updateRecipe(event) {
  if ($(event.target).hasClass("updateRecipeButton")) {
    let $selectedCard = $recipes.find(".panel-primary");
    let recipeNumber = $selectedCard.parent()[0].dataset.recipe;
    buildRecipeObject();
    populateCard(recipeNumber);
    $selectedCard.removeClass("panel-primary");
    $selectedCard.addClass("panel-default");
    $($recipeBox).toggle();
    let $buttons = $("#recipes .updateRecipe");
    $buttons.toggle();
    persistRecipes();
  }
}

//builds a recipe object from entered information and saves it to array
function buildRecipeObject() {
  let recipeObj = {};
  recipeObj.name = $("#drinkName").val();
  recipeObj.instructions = $("#instructions").val();
  recipeObj.description = $("#description").val();
  recipeObj.ingredients = [];
  let $ingredients = $("#ingredients").children();
  $($ingredients).each(function() {
    if (!$(this).hasClass("ingClone")) {
      let ingredientObj = {};
      ingredientObj.measure = $(this).find(".measure").val();
      ingredientObj.ingredientName = $(this).find(".ingName").val();
      ingredientObj.unit = $(this).find(".unit").val();
      recipeObj.ingredients.push(ingredientObj);
    }
  });
  saveObject(recipeObj);
}

function populateCard(num) {
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

function initializePage() {
  let numRecipies = currentParty.recipes.length;
  for (let i = 0; i < numRecipies; i++) {
      addRecipeCard();
      populateCard(i + 1);
  }
  $("#partyName").val(currentParty.name);
  $("#partyDate").val(currentParty.date);
  $("#guestCount").val(currentParty.guestCount);
}

//loading from local storage
function loadRecipes(party) {
  clearRecipes();
  currentParty = party;
  recipeObjectArray = currentParty.recipes;
  initializePage();
  persistRecipes();
}

function callFirebase(){
  let loadName = prompt(printPartyNames());
  let firebaseGetString = "https://cocktails-bfa89.firebaseio.com/" + loadName + ".json";
  $.getJSON(firebaseGetString, function(data){
    currentParty = data;
    loadRecipes(currentParty);
  });
}

function getPartyNames(){
  let firebaseGetString = "https://cocktails-bfa89.firebaseio.com/.json";
  $.getJSON(firebaseGetString, function(data){
      for (var key in data) {
        partyNames.push(key);
      }
    });

}

function printPartyNames() {
  let namesString = "";
  partyNames.forEach(function(element) {
    namesString += element + "\n";
  });
  namesString += "\n";
  namesString += "Please enter a party name to load:";
  return namesString;
}

//simple persistance to local storage
function saveRecipes() {
  currentParty.name = $("#partyName").val();
  currentParty.date = $("#partyDate").val();
  currentParty.guestCount = $("#guestCount").val();
  currentParty.recipes = recipeObjectArray;
  partyNames.push(currentParty.name);
  let sessionString = JSON.stringify(currentParty);
  let firebaseString = "https://cocktails-bfa89.firebaseio.com/" + currentParty.name + ".json";
  $.ajax({
    url: firebaseString, // your api url
    method: 'PUT', // method is any HTTP method
    data: sessionString, // data as js object
    success: function() {}
});
}

//populates recipebox with object info
function populateRecipeBox() {
  let $selectedCard = $recipes.find(".panel-primary").parent();
  let recipeNumber = $selectedCard[0].dataset.recipe;
  if (recipeNumber <= recipeObjectArray.length){
  let recipe = recipeObjectArray[recipeNumber - 1];
  if (recipe) {
    $("#drinkName").val(recipe.name);
    $("#instructions").val(recipe.instructions);
    $("#description").val(recipe.description);
    $ingredients.find("#staticIngredient").remove();
    for (let j = 0; j < recipe.ingredients.length; j++) {
      let $clone = $(".ingClone").clone();
      $clone.removeClass("ingClone");
      $clone.find(".measure").val(recipe.ingredients[j].measure);
      $clone.find(".ingName").val(recipe.ingredients[j].ingredientName);
      $clone.toggle();
      $clone.appendTo($ingredients);
    }
  }
}
}

function persistRecipes() {
  localStorage.setItem('sessionPersistance', JSON.stringify(currentParty));
}

function clearSession() {
  $("#recipes .recipeCards").remove();
  recipeCounter = 0;
  recipeObjectArray = [];
  currentParty = {};
  $("#partyName").val('');
  $("#partyDate").val('');
  $("#guestCount").val('');
  persistRecipes();
}

function clearRecipes(){
  $("#recipes .recipeCards").remove();
  recipeCounter = 0;
  recipeObjectArray = [];
}