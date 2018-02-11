// Create an initial list of superheroes to choose from

var topics = ['Superman', 'Batman', 'Spiderman', 'Thor', 'Green Lantern', 'Wonder Woman', 'Captain America', 'Mr. Fantastic', 'Invisible Woman', 'Human Torch', 'Silver Surfer', 'Wolverine', 'Iron Man', 'Daredevil', 'Hulk', 'Black Panther', 'Dr. Strange', 'Aquaman', 'Hellboy', 'Robin'];

// Create function to display the hero buttons on to the page

function displayHeroInfo() {

    $("#heroes").empty();
    var hero = $(this).attr("data-name");
    hero = hero.replace(/\s/g, '+');
    var APIkey = "WHGVIfZL78URbxv0O7SI3TtGEJq3e0Zi";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&limit=10&api_key=" + APIkey;

    // Creating an AJAX call for the specific superhero button
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    
    // Create a div for the placement of the superhero GIFs

    var heroDiv = $("<div class='hero'>");

    //

    for(var i=0; i < response.data.length; i++) {
    
    var heroInfo = $("<div class='heroInfo'>");
    
    // Storing the rating data
    var rate = response.data[i].rating;

      // Creating an element to have the rating displayed
    var gifRating = $("<p>").html("Rating: " + rate + "<br>");

      // Displaying the rating
    heroInfo.append(gifRating);

      // Retrieving the URL for the image
    var imgURL = response.data[i].images.fixed_height.url;
    var stillImgURL = response.data[i].images.fixed_height_still.url;

      // Creating an element to hold the image
    var image = $("<img>").attr(
      {src: stillImgURL,
      id: imgURL});

      // Appending the image
    heroInfo.append(image);

      // Putting the entire list of gifs within the div
    heroDiv.append(heroInfo);

    }

    // Adding the div to the HTML doc
    $("#heroes").append(heroDiv);

  });

}

// Create function to generate initial buttons

function renderButtons() {

    $("#heroButtons").empty();
    for(var i=0; i<topics.length; i++) {
        var name =  $("<button>");
        name.addClass("btn btn-outline-primary hero-btn");
        name.attr("data-name", topics[i]);
        name.text(topics[i]);
        $("#heroButtons").append(name);
    }
  }

// Generate initial buttons onto the page

renderButtons();

// Function that creates button based on user input

$("#add-hero").on("click", function() {

        $("#heroButtons").empty();
        event.preventDefault();
        var selectHero= $("#hero-input").val().trim();
        topics.push(selectHero);
        $("#hero-input").val("");
        renderButtons();
    
  });

// Creates the field of GIFs once a superhero button is chosen

$(document).on("click", ".hero-btn", displayHeroInfo);

// Create a function to start and stop the GIF

var gifPlay = false;

function toggle () {
  if(!gifPlay) {
    var currentImageSrc = this.src;
    this.setAttribute("src", this.id);
    this.setAttribute("id", currentImageSrc);
    gifPlay = true;
  }
  else{
    var currentImageSrc = this.src;
    this.setAttribute("src", this.id);
    this.setAttribute("id", currentImageSrc);
    gifPlay = false;
  }
}

$(document).on("click", "img", toggle);

