const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

class CrawlManager {
    constructor(website) {
        this.title = "";
        this.website = website;
        this.totalWordCount = 0;
        this.totalImgCount = 0;
        this.totalLinks = 0;
        this.totalCrawlTime = 0;
        this.internalLinks = [];
        this.externalLinks = [];
        this.brokenLinks = [];
        this.visited = new Map();
        this.pageCrawlTime = new Map();
        this.pageDepth = new Map();
    }
    async crawl() {
        console.log(`Starting Business!`);

        try {
            //requesting the HTML from the page
            const resp = await fetch(this.website.root);
            const htmlText = await resp.text();

            //setting the page title with dom
            const dom = new JSDOM(htmlText);
            this.title = dom.title;

        } catch(err) {
            console.log(`Error: ${err}`);
        }
        
        //crawling!!!
        this.crawlPage(this.website.root);
    }
    async crawlPage(page) {
        console.log(`Actively crawling ${page}`);

        //setting the visited to true to not infinetly crawl
        this.visited.set(page, true);

    }
    countWords() {

    }
    countImgs() {

    }
    checkPage() {

    }
}

module.exports = CrawlManager;