const Website = require("../website.js");

test('normal URL with slash at the end', async () => {
    let site = new Website("https://www.github.com/");
    expect(site.root).toEqual("github.com");
});
test('normal URL', async () => {
    let site = new Website("https://www.github.com");
    expect(site.root).toEqual("github.com");
})
test('missing slash at the start', async () => {
    let site = new Website("https:/github.com");
    expect(site.root).toEqual("github.com");
});
test('http only', async () => {
    let site = new Website("http://github.com");
    expect(site.root).toEqual("github.com");
});
test('only github uppercase', async () => {
    let site = new Website("http://GITHUB.com");
    expect(site.root).toEqual("github.com");
});
test('all the hostname uppercase', async () => {
    let site = new Website("http://GITHUB.COM");
    expect(site.root).toEqual("github.com");
});
test('all the hostname uppercase with slash at the end', async () => {
    let site = new Website("http://GITHUB.COM/");
    expect(site.root).toEqual("github.com");
});
test('invalid URLs', async () => {
    let site = new Website("Invalid");
    expect(site.root).toEqual(undefined);
});