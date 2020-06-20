// Accordion Function
$(".ui.accordion").accordion();

//Creating arrays to organize and store search results
let jobTitles = [];
let jobLocations = [];
let jobTypes = [];
let jobCompanies = [];
let jobDescriptions = [];

$("#submitBtn").click(function (e) {
  e.preventDefault();

  //Empty results div with each new search
  $("#results").empty();

  //Empty job arrays with each new search
  _.remove(jobTitles);
  _.remove(jobLocations);
  _.remove(jobTypes);
  _.remove(jobCompanies);
  _.remove(jobDescriptions);

  //Invoke runSearch function
  runSearch();
});

//Function to run search
function runSearch() {
      //Get Zip API Search
  // let apiKey ="GXiB3oQgyIIViku46eu60JEQfO1mu9Ax59AWgQJ0rj1OEaipR4be6Td8LxBO5SW6";
  let apiKey ="wA8ZMwEvPfkmh3YIT7llqnVsWXSYaNzMZdEmaBDT95B5bQTdszojhHSPsScZ1NMd";
  
  let zipCode = $("#zipCode").val();

  var queryURLZip = "https://cors-anywhere.herokuapp.com/http://www.zipcodeapi.com/rest/" + apiKey +"/info.json/"+ zipCode + "/degrees";

  $.ajax({
    url: queryURLZip,
    method: "GET",
  }).then(function (response) {
    let city = response.city;
  
  //GitHub Jobs

  //Variable will dynamically change based on user input
  let jobType = $("#keywords").val();

  var queryURLJobs = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${jobType}&location=${city}&page=1`;

  //AJAX Call to GitHub Jobs API
  $.ajax({
    url: queryURLJobs,
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    //For loop to run through first five jobs that come up
    for (var i = 0; i < 5; i++) {
      let titles = response[i].title;
      jobTitles.push(titles);

      let location = response[i].location;
      jobLocations.push(location);

      let type = response[i].type;
      jobTypes.push(type);

      let company = response[i].company;
      jobCompanies.push(company);

      let description = response[i].description;
      jobDescriptions.push(description);

      //GNews

      //Take company from GitHub Jobs API and use it to run search on GNews API
      let query = company;

      let token = "561ded44bea85bd1b3058e9aeb6484da";

      let queryURLNews = "https://gnews.io/api/v3/search?q=" + query + "&token=" + token;

      //AJAX Call to GNews API
      $.ajax({
        url: queryURLNews,
        method: "GET",
      }).then(function (response) {
        //console.log(response);
      });
    }

    //Populating HTML elements with data from GitHub Jobs API
    for (var i = 0; i < 5; i++) {
      //Create an h1 for every job title
      let resultTitles = $("<h1>");

      //Create h5 for every job location
      let resultLocation = $("<h5>");

      //Create h5 for every job type
      let resultType = $("<h5>");

      //Create h5 for every job company
      let resultCompany = $("<h5>");

      //Create container div for every job description
      let descriptionContainer = $("<div>");

      //Give the container div a class of "ui styled accordion"
      descriptionContainer.addClass("ui styled fluid accordion");

      //Crate new div for title
      let descriptionTitleDiv = $("<div>");

      //Add class to title div
      descriptionTitleDiv.addClass("title");

      //Append title div to container div
      descriptionContainer.append(descriptionTitleDiv);

      //Create new dropdown icon for each description
      let dropDownIcon = $("<i>");

      dropDownIcon.addClass("dropdown icon");

      dropDownIcon.val("::before");

      descriptionTitleDiv.append(dropDownIcon);

      //Populate title div text with "job description"
      descriptionTitleDiv.append("Job Description");

      //Create new div for content
      let descriptionContentDiv = $("<div>");

      //Give content div class of content
      descriptionContentDiv.addClass("content");

      //Create p for every job description
      let resultDescription = $("<p>");

      //Give each p tag a class of description
      resultDescription.addClass("transition hidden");

      //Populate each h1 with the job titles in jobTitles array
      resultTitles.text(jobTitles[i]);

      //Populate each h5 with the job locations in jobLocations array
      resultLocation.text("Location: " + jobLocations[i]);

      //Populate each h5 with the job type in jobTypes array
      resultType.text("Type: " + jobTypes[i]);

      //Populate each h5 with the job company in jobCompanies array
      resultCompany.text("Company: " + jobCompanies[i]);

      //Populate each p with the job description in jobDescriptions array
      resultDescription.append(jobDescriptions[i]);

      //Append resultDescription to content div
      descriptionContentDiv.append(resultDescription);

      //Append content div to container div
      descriptionContainer.append(descriptionContentDiv);

      //Append to the results div
      $("#results").append(resultTitles);
      $("#results").append(resultLocation);
      $("#results").append(resultType);
      $("#results").append(resultCompany);
      $("#results").append(descriptionContainer);
      $("#results").accordion("refresh");
    }
    });

    });

};
