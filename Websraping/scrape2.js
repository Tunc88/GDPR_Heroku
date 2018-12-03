const request = require("request");
const cheerio = require("cheerio");
var fs = require("fs");

request("https://privacypatterns.org/patterns/", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $("ul[id=patterns_listing]").each((i, el) => {
      const title = $(el)
        .find("h3")
        .text();

      const url = $(el)
        .find("a")
        .attr("href");

      const desc = $(el)
        .find("p")
        .text();
      console.log(title, desc);
    });
  }
});
