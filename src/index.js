const Website = require('./website.js');
const CrawlManager = require('./crawlManager.js');

async function main() {
    console.log("App Start");

    const site = new Website('https://stackoverflow.com/');
    const crawler = new CrawlManager(site);
    await crawler.crawl();
}

main();