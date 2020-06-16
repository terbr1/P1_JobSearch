console.log("hello");

//GNews API Call
let query = "genesis%20financial%20solutions";

let token = "561ded44bea85bd1b3058e9aeb6484da";

let queryURL = "https://gnews.io/api/v3/search?q=" + query + "&token=" + token;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});