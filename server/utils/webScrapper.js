const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeCodeWars = async () => {
  try {
    const response = await axios.get(
      "https://www.codewars.com/kata/search/?q=&order_by=sort_date+desc&sample=true"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    let ids = [];
    $(".list-item-kata").each((_idx, el) => ids.push($(el).attr("id")));
    return ids;
  } catch (error) {
    console.log(error);
  }
};
const storeID = async () => {
  fs.readFile("./data/codeWarsIDs.json", ())
};

module.exports = scrapeCodeWars;
