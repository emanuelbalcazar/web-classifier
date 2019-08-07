const natural = require('natural');
const textract = require('textract');
const stopword = require('stopword');

const bayesModel = require('./classifiers/NaiveBayes');
const logisticModel = require('./classifiers/LogisticRegression');
const config = require('./config/config');

var Spider = require('node-spider');

var spider = new Spider({
    // How many requests can be run in parallel
    concurrent: 5,
    // How long to wait after each request
    delay: 0,
    // A stream to where internal logs are sent, optional
    logs: process.stderr,
    // Re-visit visited URLs, false by default
    allowDuplicates: false,
    // If `true` all queued handlers will be try-catch'd, errors go to `error` callback
    catchErrors: true,
    // If `true` the spider will set the Referer header automatically on subsequent requests
    addReferrer: false,
    // If `true` adds the X-Requested-With:XMLHttpRequest header
    xhr: false,
    // If `true` adds the Connection:keep-alive header and forever option on request module
    keepAlive: false,
    // Called when there's an error, throw will be used if none is provided
    error: function (err, url) {
        console.log('[classify] - error al ejecutar el spider: ', err);
    },
    // Called when there are no more requests
    done: function () {
    },

    //- All options are passed to `request` module, for example:
    headers: { 'user-agent': 'node-spider' },
    encoding: 'utf8'
});

var handleRequest = async function (doc) {

    // atach natural methods
    natural.PorterStemmer.attach();

    // load classifiers
    var bayesClassifier = await bayesModel.load();
    var logisticClassifier = await logisticModel.load();

    // new page crawled
    textract.fromUrl(doc.url, (error, result) => {
        if (error)
            return;

        // tokenize, stem and remove stopwords
        let text = String(result).tokenizeAndStem();
        text = stopword.removeStopwords(text).join(' ');

        console.log('\n- URL:', doc.url);
        console.log('- TEXT:', result);
        console.log('- BAYES:', bayesClassifier.getClassifications(String(result).tokenizeAndStem())[0]);
        console.log('- LOGISTIC:', logisticClassifier.getClassifications(String(result).tokenizeAndStem())[0]);

        // uses cheerio, check its docs for more info
        doc.$('a').each(function (i, elem) {
            // do stuff with element
            var href = doc.$(elem).attr('href');

            if (href) {
                href = href.split('#')[0]
                var url = doc.resolve(href);
                // crawl more
                spider.queue(url, handleRequest);
            }
        });
    });
};

// start the spider
spider.queue(config.START_PAGE, handleRequest);
