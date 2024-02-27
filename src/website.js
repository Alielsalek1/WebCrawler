class Website {
    constructor(root) {
        this.root = this.getHostname(root);    
    }
    getHostname(root) {
        try {
            const siteRoot = new URL(root);
            
            //converting the URL to string to remove 'www.'
            let rootStr = siteRoot.href;

            //remove 'www.' if present
            if (rootStr.includes('www.')) 
                rootStr = rootStr.replace('www.', '');

            return rootStr
        }
        catch(err) {
            console.log(`Error: ${err}`);
            return undefined;
        }
    }
}

module.exports = Website;