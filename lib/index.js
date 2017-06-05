var cheerio = require('cheerio');

module.exports = function (args, settings, body) {
  var query = args._.shift();

  if (!query) {
    throw new Error('query required');
  }

  if (!body) {
    throw new Error('please pipe HTML to scrape');
  }

  var $ = cheerio.load(body);

  var method = args.text ? 'text' : 'html';

  return $(query).map((i, el) => {
    let res;
    if (args.text) {
      res = $(el).text();
    } else {
      res = $.html(el);
    }
    return res.replace(/\n/g, '');
  }).get().join('\n');
};
