const { JSDOM } = require("jsdom");
const puppeter = require('puppeteer');

class CrawlManager {
    constructor(website) {
        this.maxDepth = 1;
        this.title = "";
        this.website = website.root;
        this.totalWordCount = 0;
        this.totalImgCount = 0;
        this.totalLinks = 0;
        this.totalCrawlTime = 0;
        this.linkCnt = new Map();
        this.pageCrawlTime = new Map();
        this.browser = null;
    }
    async getHtml(link) {
        try {
            //generating a new tab
            const page = await this.browser.newPage();
    
            //going to the website
            await page.goto(link);
    
            // Wait for the network to be idle (indicating substantial page load completion)
            await page.waitForNetworkIdle({ idle: 200 });
    
            //wait for the page to load completely (As JS generates some HTML)
            await page.waitForSelector('script');
    
            //get the HTML
            const htmlContent = await page.content();
    
            //close the page to free up resources
            await page.close();
    
            return htmlContent;
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
    }
    async sumWords(dom) {
        /*getting all HTMl tags as each element is a single instance.
        EX: if we have 3 <p> then the 3 instances of P will be included each as an element */
        const allElements = dom.window.document.querySelectorAll("*");
        for (const element of allElements) {
            const text = element.textContent; //Get text content
            const words = text.split(/\s+/); //Split into words using regex for whitespace
            this.totalWordCount += words.length; //Count words
        }
    }
    async crawl() {
        console.log(`Starting Business!!`);

        //launching the browser
        this.browser = await puppeter.launch();

        //crawling!!!
        await this.crawlPage(this.website);
    }
    async crawlPage(page, depth = 0) {
        //check if the current page is visited
        if (this.linkCnt.has(page)) {
            // Increment the Link count by 1
            let currCnt = this.linkCnt.get(page);
            this.linkCnt.set(currCnt + 1);
            return;
        }

        //assigning the start date to calculate the crawl time for each page
        const startTime = Date.now();
        console.log(`Actively crawling ${page} with depth ${depth}`);

        //setting the link counter to 1 to prevent infinite Crawl
        this.linkCnt.set(page, 1);
        //incrementing totalLinks
        this.totalLinks++;

        try {
            //getting the page HTML
            const htmlText = await this.getHtml(page);

            if (!htmlText) 
                throw new Error("no HTML retrieved");

            //declaring the DOM
            const dom = new JSDOM(htmlText);

            //getting the page's title
            if (depth === 0)
                this.title = dom.window.document.title; 

            //adding to the variables computing total attributes in the Website
            this.totalImgCount += dom.window.document.querySelectorAll('img').length;

            console.log(`updating values`)
            let crawlTime = Date.now() - startTime; //page CrawlTime
            this.totalCrawlTime += crawlTime; //adding the page crawlTime to the totalCrawlTime
            this.pageCrawlTime.set(page, crawlTime) //mapping the page to its crawlTime
            // adding all the words in the page to the counter
            await this.sumWords(dom)

            //getting the all links from the DOM
            let links = dom.window.document.querySelectorAll('a');

            //return if you are at max depth
            if (depth == this.maxDepth) return;

            //looping to crawl each page if it is internal
            for (let link of links) {
                //get the new path
                const href = link.getAttribute('href');

                if (href) {
                    //concatonate the path with the original website
                    let l1 = new URL(this.website + href.slice(1));
                    //convert the base website to a URL to make it comparable with l1
                    let l2 = new URL(this.website);
                    
                    // if the the current URL has the same hostname as the root hostname then they are on the same page
                    if (l1.hostname === l2.hostname)
                       await this.crawlPage(l1.href, depth + 1);
                }  
            }
        }
        catch (err) {
            console.log(`Error: ${err} with page ${page}`);
        }
    }
}

module.exports = CrawlManager;