'use strict';

var $ = require('jquery');
var Curl = require('node-libcurl').Curl;
var cheerio = require('cheerio');

var websitetitle = "https://www.google.com.tw/search?q=%E6%B5%B7%E8%B4%BC%E7%8E%8B%E6%BC%AB%E7%94%BB&tbas=0&tbs=islt:qsvga,isz:i,ic:color&tbm=isch&source=lnt&sa=X&ved=0ahUKEwiv1PeEhtfLAhWJFJQKHfbkC5gQpwUIEg&dpr=2.2&biw=1309&bih=707";
var result = [];
function getImage(name) {
    // websitetitle = "https://www.google.com.tw/search?q="+ name +"&tbas=0&tbs=islt:qsvga,isz:i,ic:color&tbm=isch&source=lnt&sa=X&ved=0ahUKEwiv1PeEhtfLAhWJFJQKHfbkC5gQpwUIEg&dpr=2.2&biw=1309&bih=707";
    // websitetitle = "https://www.google.com.tw/search?q=" + name + "&tbas=0&tbs=ic:color&tbm=isch&source=lnt&sa=X&ved=0ahUKEwip3YOHhtfLAhUCKZQKHVz8Bx4QpwUIEg&dpr=2.2&biw=752&bih=707";
    websitetitle = "https://www.google.com.tw/search?q=" + name + "&hl=en&biw=1309&bih=707&site=webhp&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi-5vjxi9fLAhVBvpQKHY1KCOwQ_AUIBigB";
    var curl = new Curl();
    curl.setOpt('URL', websitetitle);
    curl.setOpt('FOLLOWLOCATION', true);

    curl.on('end', function (statusCode, body, headers) {

        $ = cheerio.load(body);

        var fruits = [];
        var newTitles = [];
        var newHrefs = [];
        var newTimes = [];
        var titles = [];
        var hrefs = [];
        var images = [];
        var comic_num = 0;
        $('div').each(function (i, elem) {
            // console.info(elem.attribs.src);
            console.info(elem);
            var href = $(this).find('a').attr('href');
            if (href !== undefined) {
                // logic to parese html dom
                fruits[comic_num] = $(this).text();
                newTitles[comic_num] = $(this).find('a').text();
                newHrefs[comic_num] = $(this).find('a').attr('href');
                newTimes[comic_num] = $(this).find('span').text();
                titles[comic_num] = $(this).find('a').attr('title');
                hrefs[comic_num] = $(this).find('a').attr('href');
                images[comic_num] = $(this).find('img').attr('src');

                // // newest comic data
                // if(newTimes[comic_num]!==""){
                //     console.info("newTitles: " + newTitles[comic_num]+ ", newHrefs: " + newHrefs[comic_num] + ", newTimes: " + newTimes[comic_num]);
                //     // result.push({ titles: newTitles[comic_num], hrefs: newHrefs[comic_num], images: 0, times: newTimes[comic_num]});
                //     comic_num++;
                // }

                // all comic data
                // else if(images[comic_num]!=="" && titles[comic_num]!==undefined) {
                // Trcae code example
                // console.info("i: "+i+", elem: "+$(this)+ ", titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                if (images[comic_num] !== undefined) {
                    console.info("hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    // result.push({ titles: titles[comic_num], hrefs: hrefs[comic_num], images: images[comic_num], times: 0});
                    comic_num++;
                    // }
                }
            }
        });
        this.close();
        // return result;
        // if(comic_num==0){
        //     return;
        // }
        // getPage(page+1);
    });

    curl.on('error', curl.close.bind(curl));
    curl.perform();
    // console.log(result);
}
getImage("海賊王");