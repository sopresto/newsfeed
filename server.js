var express = require("express");
var mongojs = require("mongojs");
// var ejs = require("ejs");
// Require request and cheerio. This makes the scraping possible
//make a request to the url and get a response.
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

var app = express();

//Database configuration
var databaseUrl = "newspaper";
var collections = ["articles", "saved", "comments"];

app.use(express.static("public"));

//Hook monjojs configuration to the db variable:
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//should I add in a route for the button clicked.

app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.vice.com").then(function(response) {
    //   console.log(response);
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      console.log('sanity check');
      // Now, we grab every h2 within an article tag, and do the following:
      $(".standard-unit").each(function(i, element) {
          
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();




          //Still working on the ability to scrape the page.
        // result.link = $(this)
        //   .children("a")
        //   .attr("href");
  
        // // Create a new Article using the `result` object built from scraping
        // db.Article.create(result)
        //   .then(function(dbArticle) {
        //     // View the added result in the console
        //     console.log(dbArticle);
        //   })
        //   .catch(function(err) {
        //     // If an error occurred, send it to the client
        //     return res.json(err);
        //   });
        console.log("result", result);
      });

     
  
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });

// app.get("/scrape", function(req, res){
//   axios.get("http://www.google.com").then(function(response){
//       console.log("response from body",response.body);
//     var $ = cheerio.load(response.body);
//     console.log($(".standard-unit"));
//     $(".unit standard-unit").each(function(i, element){
          
//         //   var url = a.attr("href");
//         //   var link = $(element).children("a").attr("href");
//         // console.log(element)

//           console.log(link);
//         db.scrapedData.insert({
//             h2: h2,
//             link:link
//         },
//         function(err, inserted) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(inserted);
//             }
//         });
//       });
//       res.send("Scrape Complete");
//   });
  
//   });
    
   
//     //   console.log($.html());
//       console.log($(".unit standard-unit _vwljry").children().length);
//       $(".unit standard-unit _vwljry").each(function(i, element){
          
//         //   var url = a.attr("href");
//         //   var link = $(element).children("a").attr("href");
//         // console.log(element)

//           console.log(link);
//         db.scrapedData.insert({
//             h2: h2,
//             link:link
//         },
//         function(err, inserted) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(inserted);
//             }
//         });
//       });
//   });
// res.send("Scrape Complete");
// });

app.listen(3000, function(){
    console.log("App listening on port 3000");
});


