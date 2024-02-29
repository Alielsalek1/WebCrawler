const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");
const puppeter = require('puppeteer');

class CrawlManager {
    constructor(website) {
        this.maxDepth = 3;
        this.title = "";
        this.website = website.root;
        this.totalWordCount = 0;
        this.totalImgCount = 0;
        this.totalLinks = 0;
        this.totalCrawlTime = 0;
        this.internalLinks = [];
        this.externalLinks = [];
        this.brokenLinks = [];
        this.linkCnt = new Map();
        this.pageCrawlTime = new Map();
    }
    async getHtml(link) {
        try {
            //launching the browser
            const browser = await puppeter.launch();
    
            //generating a new tab
            const page = await browser.newPage();
    
            //going to the website
            await page.goto(link);
    
            // Wait for the network to be idle (indicating substantial page load completion)
            await page.waitForNetworkIdle({ idle: 200 });
    
            //wait for the page to load completely (As JS generates some HTML)
            await page.waitForSelector('script');
    
            //get the HTML
            const htmlContent = await page.content();
    
            //close the browser to free up resources
            await browser.close();
    
            return htmlContent;
        }
        catch(err) {
            console.log(`Error: ${err}`);
            return undefined;
        }
    }
    async crawl() {
        console.log(`Starting Business!!`);
        try {
            //getting the HTML text
            const htmlText = await this.getHtml(this.website);

            //setting the page title with dom
            const dom = new JSDOM(htmlText);

            //setting the page Title
            this.title = dom.title; 
        } catch(err) {
            console.log(`Error: ${err}`);
        }

        //crawling!!!
        this.crawlPage(this.website);
    }
    async crawlPage(page, depth = 0) {
        if (depth > this.maxDepth) return;

        console.log(`Actively crawling ${page}`);

        //assigning the start date to calculate the crawl time for each page
        const startTime = Date.now();

        //check if the current page is visited
        if (this.linkCnt.get(page) > 0) {
            // Increment the Link count by 1
            let currCnt = this.linkCnt.get(page);
            this.linkCnt.set(currCnt + 1);
            return;
        }

        //setting the link counter to 1 to prevent infinite Crawl
        this.linkCnt.set(page, 1);

        //incrementing totalLinks
        this.totalLinks++;

        try {
            //getting the page HTML
            const htmlText = await this.getHtml(page);

            //declaring the DOM
            const dom = new JSDOM(htmlText);

            //adding to the variables computing total attributes in the Website
            this.totalImgCount += dom.window.document.querySelectorAll('img').length;
            this.totalWordCount += 0;

            //getting the all links from the DOM
            let links = dom.window.document.querySelectorAll('a');

            //looping to crawl each page if it is internal
            links.forEach(link => {
                if (link.getAttribute('href')) {
                    let l1 = new URL(link.getAttribute('href')), l2 = new URL(this.website);

                    // if the the current URL has the same hostname as the root hostname then they are on the same page
                    if (l1.hostname === l2.hostname) {
                        this.crawlPage(l1);
                    }
                    else
                        this.externalLinks.push(link.getAttribute('href'));
                }  
            });
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }

        let crawlTime = Date.now() - startTime; //page CrawlTime
        this.totalCrawlTime += crawlTime; //adding the page crawlTime to the totalCrawlTime
        this.pageCrawlTime.set(page, crawlTime) //mapping the page to its crawlTime

        console.log(this.totalCrawlTime)
        console.log(this.totalImgCount)
        console.log(this.totalLinks)
        console.log(this.totalWordCount)
        console.log(this.externalLinks)
        console.log("_________________")
    }
}

module.exports = CrawlManager;