
// initial buttons
var topics = ["cat","dog"];
topics.forEach(function(item){
    var buttonImg = $("<button>").text(item).click(function(){searchAnimal(item);});
    $("#animal-button").append(buttonImg);
    
})
//*****************************************************************//
// Main Function
function searchAnimal(animal) {

    // Querying the bandsintown api for the selected animal
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kkk1Qksm4LpGXiWiSNpCX58YQnOJXVKa&q=" + animal + "&limit=200&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if(response.pagination.total_count < 10){
          var a =  $("#animal-div").text("Common Man!!!!!!! Choose something realistic!!!!!")
          var b = $("<br>")
           a.append(b).append($("<img>").attr("src", "assets/images/crazy.gif"))
            
        }

        else{
        //  //To clear the page
        //  $("#animal-div").empty();
        //To choose diffrent inames every time we click*******
        var randomNum = Math.floor( Math.random()*50);
        // Constructing HTML containing the animal information
        for (i = randomNum; i < randomNum+10; i++) {
            var divImg = $("<div>").attr("class", "divAnimal");

            var animalRating = $("<h5>").text("Rating: " + response.data[i].rating);
            var animalImage = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("class", "imagAnimal").attr("width", 200).attr("height", 200).val([
                response.data[i].images.fixed_height_still.url,
                response.data[i].images.original.url,
                1
            ]).click(function() {
                var currentVal = $(this).val();
                var numClicks = currentVal[2];
                var currentImage = $(this).val()[numClicks % 2];
                $(this).attr("src", currentImage);
                //to incrase the clickcount
                currentVal[2]++;
                // To store the new clickcount
                $(this).val(currentVal);
            });
          

            divImg.append(animalRating, animalImage, animalLink);
            $("#animal-div").append(divImg);
        }
        if( topics.indexOf(animal) === -1){
            topics.push(animal);
            var buttonImg = $("<button>").text(animal).click(function(){searchAnimal(animal);});
            $("#animal-button").append(buttonImg);
        }
       
    
    
    }



    }
    
    
    );
    
};

//*********************************************************************************//

// Event handler for user clicking the select-animal button
$("#select-animal").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputAnimal = $("#animal-input").val().trim().toLowerCase();
    

    if( topics.indexOf(inputAnimal) === -1){
        searchAnimal(inputAnimal); 

    }
   else{
    alert("already in the list");
   }

    // to clear the input text box
    $("#animal-input").val("");

    
});