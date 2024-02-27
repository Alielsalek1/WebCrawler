class Website {
    constructor(root) {
        this.root = this.getHostname(root);    
    }
    getHostname(root) {
        try {
            root = new URL(root);
            let hostname = root.hostname;
            if (hostname[-1] === '/') hostname = hostname.slice(0, -1);
            if (hostname.startsWith('www.')) hostname = hostname.slice(4);
            return hostname;
        }
        catch(err) {
            console.log(err);
            return undefined;
        }
    }
}

module.exports = Website;