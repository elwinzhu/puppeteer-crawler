//this file is the common configurations of the crawler
//for items such as Chrome behaviour etc that are applied in all platforms

const puppeteer = require('puppeteer');
const chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const chromeUserDataDir = "D:\\G\\ApnData\\User Data";
const browserLaunchArgs = [
    '--disable-infobars',
    '--start-maximized',
    `--user-data-dir=${chromeUserDataDir}`,
    //'--auto-open-devtools-for-tabs'
];

//a data dictionary to set the particular configuration of the platform
const platforms = {
    liepin: {
        minIndustryId: 1,
        maxIndustryId: 15,
        //keywordsCount: 20,
        maxPages: 1
    },
    linkedIn: { }
};

//*
//* the exported config to run the crawler
//*
const config = {
    puppeteer,
    chromePath,
    browserLaunchArgs,
    
    //specify the platform to run this crawler
    //the value is actually the config corresponding to the particular platform
    platform: platforms.liepin
};

module.exports = {
    config, platforms
};