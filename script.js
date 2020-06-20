// Accordion Function
$(".ui.accordion").accordion();

//Creating arrays to organize and store search results
let jobTitles = [];
let jobLocations = [];
let jobTypes = [];
let jobCompanies = [];
let jobDescriptions = [];

let newsTitles = [];
let newsDescriptions = [];
let newsSources = [];

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

  //Empty news arrays with each new search
  _.remove(newsTitles);
  _.remove(newsDescriptions);
  _.remove(newsSources);

  //Invoke runSearch function
  runSearch();
});

//Function to run search
function runSearch() {
  //Get Zip API Search
  // let apiKey = "GXiB3oQgyIIViku46eu60JEQfO1mu9Ax59AWgQJ0rj1OEaipR4be6Td8LxBO5SW6";
  let apiKey ="wA8ZMwEvPfkmh3YIT7llqnVsWXSYaNzMZdEmaBDT95B5bQTdszojhHSPsScZ1NMd";

  let zipCode = $("#zipCode").val();

  var queryURLZip = "https://cors-anywhere.herokuapp.com/http://www.zipcodeapi.com/rest/" + apiKey + "/info.json/" + zipCode + "/degrees";

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
    }).then(async function (response) {
      console.log('response in queryJobs is: ', response);
      //For loop to run through first five jobs that come up
      for (var i = 0; i < response.length; i++) {
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

        //G NEWS ENHANCEMENT COMING SOON

        // //Take company from GitHub Jobs API and use it to run search on GNews API
        let query = company;

        let token = "561ded44bea85bd1b3058e9aeb6484da";

        let queryURLNews = "https://gnews.io/api/v3/search?q=" + query + "&token=" + token;

        //AJAX Call to GNews API
       const newsRespnse = await $.ajax({
          url: queryURLNews,
          method: "GET"
        })
          let newsTitle = newsRespnse.articles[i].title;
          let newsDescription = newsRespnse.articles[i].description;
          let newsSource = newsRespnse.articles[i].url;
          console.log('newsSource: ', newsSource);
          console.log('news response is: ', newsRespnse);
          console.log('news title', newsTitle);

          newsTitles.push(newsTitle);

          console.log('news titles array is: ', newsTitles);

          newsDescriptions.push(newsDescription);

          newsSources.push(newsSource);
      }

      //Populating HTML elements with data from GitHub Jobs API
      for (var i = 0; i < response.length; i++) {
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

        //G NEWS DISPLAY ENHANCEMENT COMING SOON

        //Create container div for news articles on everyjob
        let newsContainer = $("<div>");

        //Give the container div a class of "ui styled accordion"
        newsContainer.addClass("ui styled fluid accordion");

        //Crate new div for title
        let newsTitleDiv = $("<div>");

        //Add class to title div
        newsTitleDiv.addClass("title");

        //Append title div to container div
        newsContainer.append(newsTitleDiv);

        //Create new dropdown icon for each description
        let newsDropDownIcon = $("<i>");

        newsDropDownIcon.addClass("dropdown icon");

        newsDropDownIcon.val("::before");

        newsTitleDiv.append(newsDropDownIcon);

        //Populate title div text with "news on company"
        newsTitleDiv.append("News On Company");

        //Create new div for content
        let newsContentDiv = $("<div>");

        //Give content div class of content
        newsContentDiv.addClass("content");

        //Create p for every news article
        let resultNews = $(`<a href=${newsSources[i]}></a>`);
        resultNews.text(newsTitles[i]);

        //Give each p tag a class of transition hidden
        resultNews.addClass("transition hidden");

        //Populate each h5 with the news article title
        console.log('current news title is:', resultNews);

        //Append newsDescription to content div
        newsContentDiv.append(resultNews);

        //Append content div to container div
        newsContainer.append(newsContentDiv);

        //Append to the results div
        $("#results").append(resultTitles);
        $("#results").append(resultLocation);
        $("#results").append(resultType);
        $("#results").append(resultCompany);
        $("#results").append(descriptionContainer);
        $("#results").append(newsContainer);
        $("#results").accordion("refresh");
      };
    });

  });

};
