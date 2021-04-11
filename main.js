const puppeteer = require("puppeteer");
console.log("Started developing ...");
const id = "xyzpixel308@gmail.com";
const pw = "Pixel123@";
const placeName = "Eod adventure Park";
const path = require('path');
const fs = require('fs');
const pathFile = __dirname;
//console.log(pathFile);
const picFolderName = "EOD_ADVENTURE_PARK";
const picName = "i1.jpeg";
const picPathName = "C:/Users/Hp/Desktop/Google-mapsA/EOD_ADVENTURE_PARK/i1.jpeg";
//console.log(picPathName);
const fileExitst = fs.existsSync(`${picPathName}`);
if (fileExitst) {
    console.log("Yes it exists");
}

//const fileExitst = fs.existsSync(`${pathFile}/travis_1.png`)


(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://stackoverflow.com/users/login");
    await tab.waitForSelector('.universal-auth-page.unified-theme.floating-content' , {visible:true});
    await tab.waitForTimeout(5000);
    await tab.click('.grid--cell.s-btn.s-btn__icon.s-btn__google.bar-md.ba.bc-black-100');
    await tab.waitForSelector('.nyoS7c.UzCXuf.EIlDfe');
    await tab.type('input[type="email"]', id);
    await tab.click("#identifierNext");
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('input[type="password"]', { visible: true });
    await tab.type('input[type="password"]', pw);
    await tab.waitForSelector("#passwordNext", { visible: true });
    await tab.click("#passwordNext");
    await tab.waitForTimeout(2000);
    await tab.goto("https://www.google.com/maps/");
    await tab.waitForSelector('input[autofocus="autofocus"]', {visible:true});
    await tab.waitForTimeout(1000);
    await tab.type('input[autofocus="autofocus"]', placeName);
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('#searchbox-searchbutton', {visible:true});
    await tab.click('#searchbox-searchbutton');
    await tab.waitForSelector('img[alt="Add a photo"]', {visible:true});
    //await tab.click('img[alt="Add a photo"]');
    //let newTab = allPages[1]; 
    await tab.waitForTimeout(2000);
    





    
    
    

})();


