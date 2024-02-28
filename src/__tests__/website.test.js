const Website = require("../website.js");

test('normal URL with slash at the end', async () => {
    let site = new Website("https://www.github.com/");
    expect(site.root).toEqual("https://github.com/");
});
test('normal URL', async () => {
    let site = new Website("https://www.github.com");
    expect(site.root).toEqual("https://github.com/");
})
test('missing slash at the start', async () => {
    let site = new Website("https:/github.com");
    expect(site.root).toEqual("https://github.com/");
});
test('http only', async () => {
    let site = new Website("http://github.com");
    expect(site.root).toEqual("http://github.com/");
});
test('only github uppercase', async () => {
    let site = new Website("http://GITHUB.com");
    expect(site.root).toEqual("http://github.com/");
});
test('all the hostname uppercase', async () => {
    let site = new Website("http://GITHUB.COM");
    expect(site.root).toEqual("http://github.com/");
});
test('all the hostname uppercase with slash at the end', async () => {
    let site = new Website("http://GITHUB.COM/");
    expect(site.root).toEqual("http://github.com/");
});
test('all the hostname uppercase with slash at the end and missing slash in the front', async () => {
    let site = new Website("http:/GITHUB.COM/");
    expect(site.root).toEqual("http://github.com/");
});
test('invalid URLs', async () => {
    let site = new Website("Invalid");
    expect(site.root).toEqual(undefined);
});
test('URL in tests', async () => {
    let site = new Website('https://mohamed-amr7.github.io/Movie-Search-App/');
    expect(site.root).toEqual('https://mohamed-amr7.github.io/Movie-Search-App/');
});