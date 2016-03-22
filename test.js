var $ = require('jquery');
var Curl = require( 'node-libcurl' ).Curl;
var cheerio = require('cheerio');
 
var websitetitle = "manhua.fzdm.com/25/155/index_14.html";
var result = [];
function getPage (page){
    websitetitle = "manhua.fzdm.com/25/155/index_"+ page +".html";
    var curl = new Curl();
    curl.setOpt( 'URL', websitetitle );
    curl.setOpt( 'FOLLOWLOCATION', true );

    curl.on( 'end', function( statusCode, body, headers ) {
        
        $ = cheerio.load(body);

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
                if(images[comic_num] !== undefined){
                    console.info("hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
                    // result.push({ titles: titles[comic_num], hrefs: hrefs[comic_num], images: images[comic_num], times: 0});
                    comic_num++;
              // }
                }
            }
        });
        this.close();
        // return result;
        if(comic_num==0){
            return;
        }
        getPage(page+1);
    });

    curl.on( 'error', curl.close.bind( curl ) );
    curl.perform();
    // console.log(result);
}
getPage(0);