const JSDOM = require("jsdom");
const fetch = require("node-fetch");

class CrawlManager {
    constructor(website) {
        this.title = "";
        this.root = website;
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

        //requesting the HTML from the page
        const resp = await fetch(root);
        const htmlText = await resp.text();
        
        //setting the page title with dom
        const dom = new JSDOM(htmlText);
        this.title = dom.title;

        //crawling!!!
        this.crawlPage(root);
    }
    async crawlPage(page) {
        console.log(`Actively crawling ${page}`);

        //setting the visited to true to not infinetly crawl
        this.visited.set(root, true);

    }
    countWords() {

    }
    countImgs() {

    }
    checkPage() {

    }
}