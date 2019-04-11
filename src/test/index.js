const natural = require('natural');

// classifiers
const bayesModel = require('../classifiers/NaiveBayes');
const logisticModel = require('../classifiers/LogisticRegression');

// draft text
const texts = require('./texts');

//natural.LancasterStemmer.attach();
natural.PorterStemmer.attach()

// tokenize and stem text
let animalText = texts.animals.tokenizeAndStem();
let geographyText = texts.geography.tokenizeAndStem();

async function run() {
    let bayesClassifier = await bayesModel.load();
    let logisticClassifier = await logisticModel.load();

    console.log('> [bayes] Animal Text:', bayesClassifier.getClassifications(animalText)[0]);
    console.log('> [logistic] Animal Text:', logisticClassifier.getClassifications(animalText)[0]);
    console.log('');
    console.log('> [bayes] Geography Text:', bayesClassifier.getClassifications(geographyText)[0]);
    console.log('> [logistic] Geography Text:', logisticClassifier.getClassifications(geographyText)[0]);
}

run();
