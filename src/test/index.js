const natural = require('natural');

// classifiers
const bayesModel = require('../classifiers/NaiveBayes');
const logisticModel = require('../classifiers/LogisticRegression');

// draft text
const texts = require('./texts');

natural.LancasterStemmer.attach();

// tokenize and stem text
let animalText = texts.animals.tokenizeAndStem();
let geographyText = texts.geography.tokenizeAndStem();

async function run() {
    let bayesClassifier = await bayesModel.load();
    let logisticClassifier = await logisticModel.load();

    console.log('> [bayes] Animal Text:', bayesClassifier.classify(animalText));
    console.log('> [logistic] Animal Text:', logisticClassifier.classify(animalText));
    console.log('');
    console.log('> [bayes] Geography Text:', bayesClassifier.classify(geographyText));
    console.log('> [logistic] Geography Text:', logisticClassifier.classify(geographyText));
}

run();
