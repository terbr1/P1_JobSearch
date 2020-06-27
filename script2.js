$(".ui.accordion").accordion();

$("#submitBtn").click(function (e) {
  e.preventDefault();

  //Empty results div with each new search
  $("#results").empty();

  //Invoke runSearch function
  runSearch();
});

async function runSearch() {
  const city = await getCity();
  const jobList = await getJobPostings(city);
  jobList.forEach(renderJobInfo);
}

async function renderJobInfo(job) {
  //const companyNews = await getNews(job.company);

  const companyNews = { articleCount: 0 };

  const firstNewsArticle =
    companyNews.articleCount > 0 ? companyNews.articles[0] : undefined;

  console.log("company News is: ", companyNews);
  const $searchResults = $("#results");

  $searchResults.append(`<div>Title: ${job.title}</div>`);
  $searchResults.append(`<div>Location: ${job.location}</div>`);
  $searchResults.append(`<div>Type: ${job.type}</div>`);
  $searchResults.append(`<div>Company: ${job.company}</div>`);
  $searchResults.append(`<div>Description: ${job.description}</div>`);
  console.log("first article: ", firstNewsArticle);
  if (firstNewsArticle) {
    $searchResults.append(
      `<br><br><div>Mostly Relevant News Article: <a href="${firstNewsArticle.url}">${firstNewsArticle.title}</a> </div><br><br>`
    );
  } else {
    $searchResults.append(
      `<br><br><div>Mostly Relevant News Article: No News Article Found for ${job.company}</div><br><br>`
    );
  }
}

async function getJobPostings(city) {
  let jobType = $("#keywords").val();

  var queryURLJobs = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${jobType}&location=${city}&page=1`;

  //AJAX Call to GitHub Jobs API
  return $.ajax({
    url: queryURLJobs,
    method: "GET",
  });
}

async function getCity() {
  let apiKey =
    "wA8ZMwEvPfkmh3YIT7llqnVsWXSYaNzMZdEmaBDT95B5bQTdszojhHSPsScZ1NMd";

  let zipCode = $("#zipCode").val();

  var queryURLZip =
    "https://cors-anywhere.herokuapp.com/http://www.zipcodeapi.com/rest/" +
    apiKey +
    "/info.json/" +
    zipCode +
    "/degrees";

  return $.ajax({
    url: queryURLZip,
    method: "GET",
  });
}

function getNews(company) {
  const token = "561ded44bea85bd1b3058e9aeb6484da";

  const queryURLNews =
    "https://gnews.io/api/v3/search?q=" + company + "&token=" + token;

  //AJAX Call to GNews API
  return $.ajax({
    url: queryURLNews,
    method: "GET",
  });
}
