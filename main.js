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
    var new_titles = [];
    var new_hrefs = [];
    var comic_num = 0;
    $('li').each(function(i, elem) {
        var href = $(this).find('a').attr('href');
        if(href !== undefined){
          fruits[comic_num] = $(this).text();
          new_titles[comic_num] = $(this).find('a').text();
          new_hrefs[comic_num] = $(this).find('a').attr('href');
          console.info("i: "+i+", elem: "+$(this)+ ", new_titles: " + new_titles[comic_num]+ ", new_hrefs: " + new_hrefs[comic_num]);
          comic_num++;
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
