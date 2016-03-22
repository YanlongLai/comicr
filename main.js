var $ = require('jquery');
var Curl = require( 'node-libcurl' ).Curl;
var cheerio = require('cheerio');
 
// var curl = new Curl();
var websitetitle = "manhua.fzdm.com/";
var result = [];
var volumn = [];
var page = [];
  
module.exports = {
    _run: function (setJson) {
        var curl = new Curl();
        curl.setOpt( 'URL', websitetitle );
        curl.setOpt( 'FOLLOWLOCATION', true );
        //curl.setOpt( 'CURLOPT_CONNECTTIMEOUT', 2 );
        //curl.setOpt( 'CURLOPT_RETURNTRANSFER', 1 );
        //curl.setOpt( 'CURLOPT_USERAGENT', 'Comic' );
       
        curl.on( 'end', function( statusCode, body, headers ) {
            /*
            console.info( statusCode );
            console.info( '---' );
            console.info( headers );
            console.info( '---' );
            console.info( body );
            console.info( '---' );
            console.info( this.getInfo( 'TOTAL_TIME' ) );
            */
            //console.info( body );
            $ = cheerio.load(body);
            //$('h2.href').text('Hello there!');
            //$('h2').addClass('welcome');
            var fruits = [];
            var newTitles = [];
            var newHrefs = [];
            var newTimes = [];
            var titles = [];
            var hrefs = [];
            var images = [];
            var comic_num = 0;
            $('li').each(function(i, elem) {
                var href = $(this).find('a').attr('href');
                if(href !== undefined){
                    // logic to parese html dom
                    fruits[comic_num] = $(this).text();
                    newTitles[comic_num] = $(this).find('a').text();
                    newHrefs[comic_num] = $(this).find('a').attr('href');
                    newTimes[comic_num] = $(this).find('span').text();
                    titles[comic_num] = $(this).find('a').attr('title');
                    hrefs[comic_num] = $(this).find('a').attr('href');
                    images[comic_num] = $(this).find('img').attr('src');

                // newest comic data
                if(newTimes[comic_num]!==""){
                    // console.info("newTitles: " + newTitles[comic_num]+ ", newHrefs: " + newHrefs[comic_num] + ", newTimes: " + newTimes[comic_num]);
                    result.push({ titles: newTitles[comic_num], hrefs: newHrefs[comic_num], images: 0, times: newTimes[comic_num]});
                    comic_num++;
                }

                // all comic data
                else if(images[comic_num]!=="" && titles[comic_num]!==undefined) {
                    // Trcae code example
                    // console.info("i: "+i+", elem: "+$(this)+ ", titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    // console.info("titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    result.push({ titles: titles[comic_num], hrefs: hrefs[comic_num], images: images[comic_num], times: 0});
                    comic_num++;
                  }
                }
            });
            setJson(result);
            result = [];
            // return result;
            this.close();
        });
            curl.on( 'error', curl.close.bind( curl ) );
            curl.perform();
            return result;
    }

    , _getVolumn: function (comic_href, setJson) {
        var websitetitle = "manhua.fzdm.com/" + comic_href;
        var curl = new Curl();
        curl.setOpt( 'URL', websitetitle );
        curl.setOpt( 'FOLLOWLOCATION', true );
       
        curl.on( 'end', function( statusCode, body, headers ) {
            /*
            console.info( statusCode );
            console.info( '---' );
            console.info( headers );
            console.info( '---' );
            console.info( body );
            console.info( '---' );
            console.info( this.getInfo( 'TOTAL_TIME' ) );
            */
            //console.info( body );
            $ = cheerio.load(body);
            //$('h2.href').text('Hello there!');
            //$('h2').addClass('welcome');
            var fruits = [];
            var newTitles = [];
            var newHrefs = [];
            var newTimes = [];
            var titles = [];
            var hrefs = [];
            var images = [];
            var comic_num = 0;
            $('li').each(function(i, elem) {
                var href = $(this).find('a').attr('href');
                if(href !== undefined){
                    // logic to parese html dom
                    fruits[comic_num] = $(this).text();
                    newTitles[comic_num] = $(this).find('a').text();
                    newHrefs[comic_num] = $(this).find('a').attr('href');
                    newTimes[comic_num] = $(this).find('span').text();
                    titles[comic_num] = $(this).find('a').attr('title');
                    hrefs[comic_num] = $(this).find('a').attr('href');
                    images[comic_num] = $(this).find('img').attr('src');

                // newest comic data
                if(newTimes[comic_num]!==""){
                    // console.info("newTitles: " + newTitles[comic_num]+ ", newHrefs: " + newHrefs[comic_num] + ", newTimes: " + newTimes[comic_num]);
                    volumn.push({ titles: newTitles[comic_num], hrefs: newHrefs[comic_num], images: 0, times: newTimes[comic_num]});
                    comic_num++;
                }

                // all comic data
                else if(images[comic_num]!=="" && titles[comic_num]!==undefined) {
                    // Trcae code example
                    // console.info("i: "+i+", elem: "+$(this)+ ", titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    // console.info("titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    volumn.push({ titles: titles[comic_num], hrefs: hrefs[comic_num]});
                    comic_num++;
                  }
                }
            });
            setJson(volumn);
            volumn = [];
            // return result;
            this.close();
        });
            curl.on( 'error', curl.close.bind( curl ) );
            curl.perform();
            // return volumn;
    }
   , _getPage: function (comic_href, volumn_href, page_num, setJson) {
        var websitetitle = "manhua.fzdm.com/" + comic_href + "/" + volumn_href + "/index_" + page_num + ".html";
        var curl = new Curl();
        var self = this;
        curl.setOpt( 'URL', websitetitle );
        curl.setOpt( 'FOLLOWLOCATION', true );
       
        curl.on( 'end', function( statusCode, body, headers ) {
            /*
            console.info( statusCode );
            console.info( '---' );
            console.info( headers );
            console.info( '---' );
            console.info( body );
            console.info( '---' );
            console.info( this.getInfo( 'TOTAL_TIME' ) );
            */
            //console.info( body );
            $ = cheerio.load(body);
            //$('h2.href').text('Hello there!');
            //$('h2').addClass('welcome');
            var fruits = [];
            var newTitles = [];
            var newHrefs = [];
            var newTimes = [];
            var titles = [];
            var hrefs = [];
            var images = [];
            var comic_num = 0;
            $('li').each(function(i, elem) {
                var href = $(this).find('a').attr('href');
                if(href !== undefined){
                    // logic to parese html dom
                    fruits[comic_num] = $(this).text();
                    newTitles[comic_num] = $(this).find('a').text();
                    newHrefs[comic_num] = $(this).find('a').attr('href');
                    newTimes[comic_num] = $(this).find('span').text();
                    titles[comic_num] = $(this).find('a').attr('title');
                    hrefs[comic_num] = $(this).find('a').attr('href');
                    images[comic_num] = $(this).find('img').attr('src');

                    if(images[comic_num] !== undefined){
                        console.info("hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                        page.push({ hrefs: hrefs[comic_num], images: images[comic_num] });
                        comic_num++;
                    }
                }
            });
            this.close();
            // return result;
            if(comic_num==0){
                setJson(page);
                page = [];
                return;
            }
            self._getPage(comic_href, volumn_href, page_num+1, setJson);
            // return result;
            // this.close();
        });
            curl.on( 'error', curl.close.bind( curl ) );
            curl.perform();
            // return volumn;
    }
};