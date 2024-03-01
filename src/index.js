const Website = require('./website.js');
const CrawlManager = require('./crawlManager.js');

async function main() {
    console.log("App Start");

    const site = new Website('https://mohamed-amr7.github.io/Movie-Search-App/');
    const crawler = new CrawlManager(site);
    await crawler.crawl();
}

main();