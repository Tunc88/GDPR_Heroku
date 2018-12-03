const request = require("request");
const cheerio = require("cheerio");

request("https://privacypatterns.org/patterns/", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $("ul[id=patterns_listing]").each((i, element) => {
      const title = $(element)
        .children()
        .children()
        .children("h3")
        .text();

      const summary = $(element)
        .children()
        .children()
        .children("p")
        .text();

      const url = $(element)
        .children()
        .children()
        .attr("href");

      console.log(title);
      console.log(summary);
      console.log(url);
    });
    // const title = $("ul[id=patterns_listing]")
    // .children()
    // .children()
    // .children("h3");

    /* const summary = $("ul[id=patterns_listing]")
      .children()
      .children()
      .children("p");*/
  }
});
