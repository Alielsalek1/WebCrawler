const Website = require('./website.js');
const CrawlManager = require('./crawlManager.js');

async function main() {
    console.log("App Start");

    const site = new Website('https://blog.boot.dev/');
    const crawler = new CrawlManager(site);
    await crawler.crawl();

    console.log(`---------------------------------------`)
    console.log(crawler.linkCnt);
    console.log(crawler.pageCrawlTime);
    console.log(crawler.title);
    console.log(crawler.totalCrawlTime);
    console.log(crawler.totalImgCount);
    console.log(crawler.totalLinks);
    console.log(crawler.totalWordCount);
}

main();