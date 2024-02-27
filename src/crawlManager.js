class CrawlManager {
    constructor(website) {
        this.pages = new Map();
        this.root = website;
        this.TotalWordCount = 0;
        this.TotalImgCount = 0;
        this.TotalLinks = 0;
        this.Title = website.split['.'][0];
        this.internalLinks = [];
        this.externalLinks = [];
        this.brokenLinks = [];
        this.pageCrawlTime = new Map();
        this.pageDepth = new Map();
        this.totalCrawlTime = 0;
    }
    crawl() {
        
    }
    crawlPage() {

    }
    countWords() {

    }
    countImgs() {

    }
    checkPage() {

    }
}