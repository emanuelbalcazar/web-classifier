const natural = require('natural');
const classifier = new natural.BayesClassifier();
const config = require('../config/config');

class NaiveBayes {

    constructor() { }

    name() {
        return 'Naive Bayes';
    }

    addDocument(data, label) {
        classifier.addDocument(data, label);
    }

    classify(text) {
        return classifier.getClassifications(text);
    }

    train() {
        classifier.train();
    }

    async save() {
        return new Promise((resolve, reject) => {
            classifier.save(__dirname + '/..' + config.BAYES_CLASSIFIER_FILE, (error, result) => {
                if (error)
                    return reject(error);

                return resolve(result);
            });
        });
    }

    async load() {
        return new Promise((resolve, reject) => {
            natural.LogisticRegressionClassifier.load(__dirname + '/..' + config.BAYES_CLASSIFIER_FILE, null, (error, classifier) => {
                if (error)
                    return reject(error);

                return resolve(classifier);
            });
        });
    }
}

module.exports = new NaiveBayes();
