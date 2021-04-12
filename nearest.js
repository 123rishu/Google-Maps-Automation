const puppeteer = require("puppeteer");
console.log("Started developing ...");
const id = "xyzpixel308@gmail.com";
const pw = "Pixel123@";
const locationName = "Punjabi Bagh";
const destName = "Punjabi Bagh";
let hospitalVar = "Hospital";
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




(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.google.com/maps/");
    await tab.waitForSelector('input[autofocus="autofocus"]', {visible:true});
    await tab.waitForTimeout(1000);
    await tab.type('input[autofocus="autofocus"]', destName);
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('#searchbox-searchbutton', {visible:true});
    //await tab.waitForNavigation();
    await tab.click('#searchbox-searchbutton');
    await tab.waitForSelector('button[aria-label="Search nearby Punjabi Bagh"]');
    await tab.click('button[aria-label="Search nearby Punjabi Bagh"]');
    await tab.waitForSelector('input[autofocus="autofocus"]', {visible:true});
    await tab.waitForTimeout(1000);
    await tab.type('input[autofocus="autofocus"]', hospitalVar);
    await tab.waitForSelector('#searchbox-searchbutton', {visible:true});
    await tab.click('#searchbox-searchbutton');
    await tab.waitForSelector('div[aria-label="Results for Hospital"] .sJKr7qpXOXd__result-container.sJKr7qpXOXd__two-actions.sJKr7qpXOXd__wide-margin');
    let allHospitalTags = await tab.$$('.place-result-container-place-link');
    let firstHospTag = allHospitalTags[0];
    let links = [];
    for(let i=0;i<allHospitalTags.length;i++){
        let link = await tab.evaluate( function(elem){
            return elem.getAttribute("href");
        }   , allHospitalTags[i] );
        links.push(link);
    }

    for(let i=0;i<links.length;i++){
        await bringDetails(links[i] , browser);
    }

    // let link = await tab.evaluate( function(elem){
    //     return elem.getAttribute("href");
    // }   , firstHospTag );
    // //console.log(link);
    // await tab.goto(link);
    // await tab.waitForSelector('.section-hero-header-title-title.gm2-headline-5 span');
    // let hospNameTag = await tab.$('.section-hero-header-title-title.gm2-headline-5 span');
    // let hospName = await tab.evaluate( function(elem){
    //     return elem.textContent;
    // }   , hospNameTag );
    // console.log(hospName);
    // let hospinfoTags = await tab.$$('.ugiz4pqJLAG__primary-text.gm2-body-2');
    // let hospAddTag = hospinfoTags[1];
    // let hospAddress = await tab.evaluate( function(elem){
    //     return elem.textContent;
    // }   , hospAddTag);
    // console.log(hospAddress);
    // let hospContactTag = hospinfoTags[3];
    // let hospContactDetail = await tab.evaluate( function(elem){
    //     return elem.textContent;
    // }   , hospContactTag );
    // console.log(hospContactDetail);
    // let hospitalFilePath = `./${hospName}.json`;
    // let hospFile = [];
    // let obj = {
    //     HospitalName : hospName , 
    //     HospitalAddress : hospAddress , 
    //     HospitalContactDetails : hospContactDetail
    // }
    // hospFile.push(obj);
    // let stringifiedData = JSON.stringify(hospFile); // [object] => [ {}]
    // fs.writeFileSync(hospitalFilePath , stringifiedData  );

})();


async function bringDetails(link, browser ){
    
    let tab = await browser.newPage();
    await tab.goto(link);
    await tab.waitForSelector('.section-hero-header-title-title.gm2-headline-5 span');
    let hospNameTag = await tab.$('.section-hero-header-title-title.gm2-headline-5 span');
    let hospName = await tab.evaluate( function(elem){
        return elem.textContent;
    }   , hospNameTag );
    //console.log(hospName);
    let hospinfoTags = await tab.$$('.ugiz4pqJLAG__primary-text.gm2-body-2');
    let hospAddTag = hospinfoTags[1];
    let hospAddress = await tab.evaluate( function(elem){
        return elem.textContent;
    }   , hospAddTag);
    //console.log(hospAddress);
    let hospContactTag = hospinfoTags[3];
    let hospContactDetail = await tab.evaluate( function(elem){
        return elem.textContent;
    }   , hospContactTag );
    //console.log(hospContactDetail);
    let hospitalFilePath = `./allHospitalFolders/${hospName}.json`;
    let hospFile = [];
    let obj = {
        HospitalName : hospName , 
        HospitalAddress : hospAddress , 
        HospitalContactDetails : hospContactDetail
    }
    hospFile.push(obj);
    let stringifiedData = JSON.stringify(hospFile); // [object] => [ {}]
    fs.writeFileSync(hospitalFilePath , stringifiedData  );

    await tab.close();

}