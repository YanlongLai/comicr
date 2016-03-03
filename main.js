var $ = require('jquery');
var Curl = require( 'node-libcurl' ).Curl;
var cheerio = require('cheerio');
 
var curl = new Curl();
var websitetitle = "manhua.fzdm.com/";
  
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
            fruits[comic_num] = $(this).text();
            newTitles[comic_num] = $(this).find('a').text();
            newHrefs[comic_num] = $(this).find('a').attr('href');
            newTimes[comic_num] = $(this).find('span').text();
            titles[comic_num] = $(this).find('a').attr('title');
            hrefs[comic_num] = $(this).find('a').attr('href');
            images[comic_num] = $(this).find('img').attr('src');
        if(newTitles[comic_num]!==""){
            console.info("newTitles: " + newTitles[comic_num]+ ", newHrefs: " + newHrefs[comic_num] + ", newTimes: " + newTimes[comic_num]);
            comic_num++;
          }
        else {
            // console.info("i: "+i+", elem: "+$(this)+ ", titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
            console.info("titles: " + titles[comic_num]+ ", hrefs: " + hrefs[comic_num] + ", images: " + images[comic_num]);
            comic_num++;
          }
        }
    });
    //fruits.join(', ');
    //$('.round').data();

    //console.info($.html());
    //console.info(fruits);
    this.close();
});

curl.on( 'error', curl.close.bind( curl ) );
curl.perform();
