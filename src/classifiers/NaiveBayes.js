const natural = require('natural');
const classifier = new natural.BayesClassifier();
const config = require('../config/config');

/**
 * @class NaiveBayes
 */
class NaiveBayes {

    /**
     * Creates an instance of NaiveBayes.
     * @memberof NaiveBayes
     */
    constructor() { }

    /**
     * @returns algorithm name.
     */
    name() {
        return 'Naive Bayes';
    }

    /**
     * Add document to train algorithm.
     * @param {Array} data
     * @param {String} label
     */
    addDocument(data, label) {
        classifier.addDocument(data, label);
    }

    /**
     * Classify text
     * @param {String} text
     */
    classify(text) {
        return classifier.getClassifications(text);
    }

    /**
     * Train algorithm.
     */
    train() {
        classifier.train();
    }

    /**
     * Save the classifier in json file.
     */
    async save() {
        return new Promise((resolve, reject) => {
            classifier.save(__dirname + '/..' + config.BAYES_CLASSIFIER_FILE, (error, result) => {
                if (error)
                    return reject(error);

                return resolve(result);
            });
        });
    }

    /**
     * Load algorithm from json file.
     */
    async load() {
        return new Promise((resolve, reject) => {
            natural.BayesClassifier.load(__dirname + '/..' + config.BAYES_CLASSIFIER_FILE, null, (error, classifier) => {
                if (error)
                    return reject(error);

                return resolve(classifier);
            });
        });
    }
}

module.exports = new NaiveBayes();
