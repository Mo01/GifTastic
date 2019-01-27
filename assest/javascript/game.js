
// initial buttons
var topics = ["cat","dog"];
topics.forEach(function(item){
    var buttonImg = $("<button>").text(item).click(function(){searchAnimal(item);});
    $("#animal-button").append(buttonImg);
    
})

// Main Function
function searchAnimal(animal) {

    // Querying the bandsintown api for the selected animal
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kkk1Qksm4LpGXiWiSNpCX58YQnOJXVKa&q=" + animal + "&limit=200&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
         //To clear
         $("#animal-div").empty();
        //To choose diffrent inames every time we click*******
        var randomNum = Math.floor( Math.random()*50);
        console.log(randomNum);
        // Constructing HTML containing the animal information
        for (i = randomNum; i < randomNum+10; i++) {
            var divImg = $("<div>").attr("class", "divAnimal");
            var animalRating = $("<h5>").text("Rating: " + response.data[i].rating);
            var animalImage = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("class", "imagAnimal").attr("width", 200).attr("height", 200);
            divImg.append(animalRating, animalImage);
            $("#animal-div").append(divImg);
        }
        



    });
    
};




// Event handler for user clicking the select-animal button
$("#select-animal").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputAnimal = $("#animal-input").val().trim().toLowerCase();
    

   if( topics.indexOf(inputAnimal) === -1){
    searchAnimal(inputAnimal);
    topics.push(inputAnimal);
    var buttonImg = $("<button>").text(inputAnimal).click(function(){searchAnimal(inputAnimal);});
    $("#animal-button").append(buttonImg);
    
   }
   else{
    alert("already in the list");
   }


    // to clear the input text box
    $("#animal-input").val("");

    
});