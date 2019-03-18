const natural = require('natural');
const classifier = new natural.LogisticRegressionClassifier;
const config = require('../config/config');

/**
 * @class LogisticRegression
 */
class LogisticRegression {

    /**
     * Creates an instance of LogisticRegression.
     * @memberof LogisticRegression
     */
    constructor() { }

    /**
     * @returns algorithm name.
     */
    name() {
        return 'Regresion Logistica';
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
        return classifier.classify(text);
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
            classifier.save(__dirname + '/..' + config.LOGISTIC_CLASSIFIER_FILE, (error, result) => {
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
            natural.LogisticRegressionClassifier.load(__dirname + '/..' + config.LOGISTIC_CLASSIFIER_FILE, null, (error, classifier) => {
                if (error)
                    return reject(error);

                return resolve(classifier);
            });
        });
    }
}

module.exports = new LogisticRegression();
