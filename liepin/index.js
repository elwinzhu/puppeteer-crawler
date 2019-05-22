const configModule = require('../config');
const {
    puppeteer,
    chromePath,
    browserLaunchArgs
} = configModule.config;
const config = configModule.config.platform;
const {keywords, industries} = require('./constants');
const fs = require('fs');
const {insertJob} = require('./db');


//each time run will be for one industry and all keyword
const liepin = () => {
    console.log('crawling jobs from Lie Pin...');
    
    //check configuration
    (() => {
        if (!config.maxIndustryId) {
            config.maxIndustryId = Math.max.apply(Math,
                industries.map(i => {
                    return i.id;
                })
            );
        }
        if (!config.keywordsCount) {
            config.keywordsCount = keywords.length;
        }
    })();
    
    //-----------------------------------------------------------------------------------
    
    //the log file has logged the industry and keyword that have been
    //crawled, current running continues from the current industry
    //and next keyword
    let currentProcessInfo = {
        industryId: -1,
        keywordIndex: -1,
        currentIndustry: null,
        currentKeyword: null
    };
    
    const readLog = () => {
        let log;
        try {
            log = JSON.parse(fs.readFileSync('./liepin/log.json').toString());
            console.log('log content: ', log);
            
            let i = industries.find(i => i.id === log.industryId);
            let k = keywords[log.keywordIndex + 1];
            
            currentProcessInfo = {
                industryId: log.industryId,
                keywordIndex: log.keywordIndex,
                currentIndustry: i,
                currentKeyword: k
            }
        }
        catch {
            currentProcessInfo = {
                industryId: 1,
                
                //-1 means no key has been crawled. so it will start from the first
                //keyword of which the index is 0
                keywordIndex: -1,
                
                currentIndustry: industries.find(i => i.id === 1),
                currentKeyword: keywords[0]
            };
        }
    };
    
    //each keyword will write to log in case the crawler crashed
    //so next running will continue from the industry and keyword
    //the industryId: next run will start from this id
    //keywordIndex: all those keywords have done, so the next run will start from next keyword
    const writeLog = (industryId, keywordIndex) => {
        if (keywordIndex === keywords.length - 1) {
            //last keyword has done. industryId increase 1,
            //and the keywordIndex starts from 0
            keywordIndex = -1;
            industryId = industryId + 1;
            if (industryId > config.maxIndustryId)
            //set the industry id back to min as configuration
                industryId = config.minIndustryId;
        }
        
        let log = {industryId, keywordIndex};
        fs.writeFileSync('./liepin/log.json', JSON.stringify(log));
    };
    
    //-----------------------------------------------------------------------------------
    
    let browser;
    let searchPage;
    const launchChrome = async () => {
        browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: false,
            defaultViewport: null,
            args: browserLaunchArgs
        });
        
        //set the default page as the search page
        const pages = await browser.pages();
        searchPage = pages[0];
        
        //prepare the events
        //bind the event before opening the job detail page
        browser.on('targetcreated', handlerTargetCreated);
        
        //bind the load event for the search page to wait
        //until the page is loaded completely
        searchPage.on('load', searchPageLoaded);
    };
    
    let baseUrl = `https://www.liepin.com/zhaopin/?isAnalysis=&dqs=&pubTime=&salary=&subIndustry=&industryType=&compscale=&init=-1&searchType=1&flushckid=1&compkind=&fromSearchBtn=2&sortFlag=15&degradeFlag=0&jobKind=&clean_condition=&d_sfrom=search_sub_site&d_curPage=0&d_pageSize=40&curPage=0`;
    //&key=客户经理&industries=110&curPage=0
    
    let nextKey = 0;
    const searchIndustryKey = async () => {
        //attempt to crawl one keywords for the one industry
        let url = `${baseUrl}&industries=${currentProcessInfo.currentIndustry.code}&key=${currentProcessInfo.currentKeyword}`;
        console.log(`### crawl industry key >> industry:${currentProcessInfo.currentIndustry.name}, key=${currentProcessInfo.currentKeyword}`);
        
        url = "https://www.liepin.com/zhaopin/?isAnalysis=&dqs=&pubTime=&salary=&subIndustry=&industryType=industry_02&compscale=&key=ruby&init=-1&searchType=1&headckid=d8253d43e77fbf25&compkind=&fromSearchBtn=2&sortFlag=15&ckid=d8253d43e77fbf25&degradeFlag=0&jobKind=&industries=050&clean_condition=&siTag=WOU9EyTu9iZf25ewjtmq3w~zvU2C1lgLGbpL8vtBhrYig&d_sfrom=search_prime&d_ckId=50072e1d2029b70ff8043de9b5d3094a&d_curPage=0&d_pageSize=40&d_headId=50072e1d2029b70ff8043de9b5d3094a&curPage=2";
        
        try {
            //initialize the pager info
            await searchPageGotoNext(url);
            nextKey++;
            //-------------------------------------------------------------
            //write log for the keyword index and the industry for next run
            //this log will be written immediately before actually crawling the data
            writeLog(currentProcessInfo.industryId, currentProcessInfo.keywordIndex + 1);
        }
        catch (ex) {
            //log an error. the keyword index has increased so next run starts
            //from next keyword
            let error = `${new Date().toString()}\n\n${ex.message}\n\nUrl: ${url}\nKey: ${currentProcessInfo.currentKeyword}, Industry: ${currentProcessInfo.currentIndustry.name}\n-------------------------------------------------------------\n`;
            fs.appendFileSync('./liepin/error.txt', error);
            
            console.log('XX error occurred and logged XX');
            await browser.close();
            process.exit();
        }
    };
    
    let searchCurrentPageNum = 0;
    const searchPageGotoNext = async (url) => {
        console.log(`>>> --searchPageGotoNext...`);
        
        if (searchCurrentPageNum < config.maxPages) {
            console.log('>>> --page num: ', searchCurrentPageNum);
            
            if (searchCurrentPageNum === 0) {
                await searchPage.goto(url);
                //searchCurrentPageNum++;
            }
            else {
                //find button next and click
                let next = await searchPage.$('div.pager div.pagerbar span.ellipsis +a');
                if (next) {
                    await clickSearchNextPage(next);
                }
                else {
                    console.log('>>> --pages no more than 5. will find the next from current pager');
                    next = await searchPage.$('div.pager div.pagerbar a.current +a');
                    if (next) {
                        let classProperty = await next.getProperty('class');
                        let classValue = await classProperty.jsonValue();
                        if (classValue === 'disabled') {
                            //this keyword has completed
                            await gotoNextSearch(true);
                        }
                        else
                            await clickSearchNextPage(next);
                    }
                    else {
                        //skip the keyword and go to next key
                        await gotoNextSearch(true);
                    }
                }
            }
        }
        else if (nextKey < config.keywordsCount) {
            //next key
            await gotoNextSearch(true);
        }
        else {
            //the industryId is checked and increase in writeLog function
            //so the readLog has to be applied to get the id
            readLog();
            
            //check industry id
            if (currentProcessInfo.industryId < config.maxIndustryId) {
                //go to next industry
                await gotoNextSearch(false);
            }
            else {
                console.log('>>> --keys and the industries crawled. exiting...');
                await browser.close();
                process.exit();
            }
        }
    };
    
    const clickSearchNextPage = async (next) => {
        console.log('>>> --next page clicked');
        await next.click();
    };
    
    const gotoNextSearch = async (isNextKey = true) => {
        console.log(`>>> --going to next ${isNextKey ? "key" : "industry"}`);
        searchCurrentPageNum = 0;
        if (isNextKey) {
            readLog();
        }
        else
            nextKey = 0;
        
        await searchIndustryKey();
    };
    
    let jobAnchors, curAnchorIndex = 0;
    const searchPageLoaded = async () => {
        console.log('>>> -- --searchPageLoaded...');
        await checkIpBanned(searchPage);
        
        jobAnchors = await searchPage.$$('div.sojob-result ul.sojob-list li div.job-info h3 a');
        //let jobAnchors = await searchPage.evaluate(() => document.querySelectorAll('div.sojob-result ul.sojob-list li div.job-info h3 a'));
        //log the anchors for audit purpose
        // jobAnchors.map(async a => {
        //     let hrefO = await a.getProperty('href');
        //     let href = await hrefO.jsonValue();
        //     console.log(href);
        //     fs.appendFileSync('./liepin/anchors.txt', `${href}\n------------------------------\n`);
        // });
        // fs.appendFileSync('./liepin/anchors.txt', `##################################\n`);
        
        //a target(page) will create once the anchor is clicked
        //it comes to the 'targetcreated' handler to do the rest
        // ** initialize the current anchor index for all anchors of each page
        curAnchorIndex = 0;
        await clickJobAnchorChain();
    };
    
    const handlerTargetCreated = async (target) => {
        if (target.type() === 'page') {
            //console.log(target.url());
            let url = target.url();
            if (url.indexOf('zhaopin') >= 0) return;
            
            //bind event handler for the page to wait for
            //it to completely loaded and the rest will be done
            //in the load event
            let page = await target.page();
            //await page.authenticate({password: 'ohssr666'});
            page.on('load', pageLoad(page, url));
        }
    };
    
    const pageLoad = (page, url) => () => {
        return handlePageDetails(page, url);
    };
    
    const handlePageDetails = async (page, url) => {
        console.log('>>> -- -- -- --detail page loaded, to handle details, url: ', url);
        
        try {
            await checkIpBanned(page);
            
            let path = url.replace("https://www.liepin.com/", "");
            let arrInfo = path.split('/');
            let id = arrInfo[1].substring(0, arrInfo[1].indexOf('.'));
            let type = arrInfo[0];
            
            let title, company, salary, location, education, experience, description, department;
            if (type === 'a') {
                title = await page.evaluate(() => document.querySelector('div.about-position div.title-info h1').innerText);
                company = await page.evaluate(() => document.querySelector('div.about-position div.title-info h3').innerText);
                salary = await page.evaluate(() => document.querySelector('div.about-position div.job-main div.job-title-left p.job-main-title').innerText);
                location = await page.evaluate(() => document.querySelector('div.about-position div.job-main div.job-title-left p.basic-infor span').innerText);
                education = await page.evaluate(() => document.querySelectorAll('div.about-position div.job-main div.job-title-left div.resume span')[0].innerText);
                experience = await page.evaluate(() => document.querySelectorAll('div.about-position div.job-main div.job-title-left div.resume span')[1].innerText);
                description = await page.evaluate(() => document.querySelector('div.about-position div.job-description div.content').innerText);
                department = await page.evaluate(() => {
                    let liElement = document.querySelectorAll('div.about-position div.main-message div.content ul li')[3];
                    if (liElement) {
                        let node = liElement.querySelector('span');
                        if (node) {
                            liElement.removeChild(node);
                        }
                        
                        return liElement.innerText;
                    }
                });
            }
            else if (type === 'job') {
                title = await page.evaluate(() => document.querySelector('div.about-position div.title-info h1').innerText);
                company = await page.evaluate(() => document.querySelector('div.about-position div.title-info h3').innerText);
                salary = await page.evaluate(() => {
                    let innderTxt = document.querySelector('div.about-position div.job-item p.job-item-title').innerText;
                    if (innderTxt)
                        return innderTxt.split(' ')[0];
                    else
                        return null;
                });
                location = await page.evaluate(() => document.querySelector('div.about-position p.basic-infor span a').innerText);
                education = await page.evaluate(() => document.querySelectorAll('div.about-position div.job-qualifications span')[0].innerText);
                experience = await page.evaluate(() => document.querySelectorAll('div.about-position div.job-qualifications span')[1].innerText);
                description = await page.evaluate(() => document.querySelector('div.about-position div.main-message div.content').innerText);
                department = await page.evaluate(() => document.querySelector('div.about-position div.job-item.main-message div.content ul li:first-child label').innerText);
            }
            else {
                //nothing for now, skip this job
                return;
            }
            
            let jobDetail = {
                _id: id,
                title,
                company,
                salary,
                location,
                education,
                experience,
                description,
                department,
                industry: currentProcessInfo.currentIndustry.name,
                keyword: currentProcessInfo.currentKeyword,
                url,
                count: 1
            };
            //console.log(jobDetail);
            insertJob(jobDetail, jobInsertedHandler);
        }
        catch (ex) {
            let error = `**** One job skipped ****\n${ex.message}\n\nUrl: ${url}\n*************************\n`;
            fs.appendFileSync('./liepin/error.txt', error);
        }
        finally {
            //close this page to the next job detail triggered
            page.close();
            
            await clickJobAnchorChain();
            //await searchPage.bringToFront();
        }
    };
    
    const clickJobAnchorChain = async () => {
        if (curAnchorIndex < jobAnchors.length) {
            console.log('>>> -- -- --to click one job detail: ', curAnchorIndex);
            await jobAnchors[curAnchorIndex++].click();
            //await clickAnchorChain(anchors, length, currentNum + 1);
        }
        else {
            console.log('>>> -- --all job anchors clicked for current page: ', searchCurrentPageNum);
            //set the search page to next here when all job anchors
            //clicked for the current page
            
            searchCurrentPageNum++;
            await searchPageGotoNext();
        }
    };
    
    //-----------------------------------------------------------------------------------
    
    const jobInsertedHandler = (error, code) => {
        if (code !== 0) {
            console.log("job insert error, output from handler: ", error);
        }
    };
    
    const checkIpBanned = async (page) => {
        let warning = await page.evaluate(() => document.querySelector('div.wrap h1.warning-msg'));
        if (warning) {
            await browser.close();
            
            console.log('######proxy ip banned#######');
            let error = `${new Date().toString()}\nProxy Ip banned.\n-------------------------------------------------------------\n`;
            fs.appendFileSync('./liepin/error.txt', error);
            
            process.exit();
        }
    };
    
    //-----------------------------------------------------------------------------------
    
    const doWork = async () => {
        //start from the logged industry
        readLog();
        
        await launchChrome();
        //crawl data of one industry one keyword per run
        await searchIndustryKey();
    };
    
    doWork();
};

module.exports = liepin;