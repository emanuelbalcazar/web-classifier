const async = require('async');
const natural = require('natural');
const classifier = new natural.BayesClassifier();

const parser = require('./parser/fileParser');
const config = require('./config/config');

const DATASET_FOLDER = __dirname + config.DATASET_FOLDER;
const CLASSIFIER_FILE = __dirname + config.CLASSIFIER_FILE;

async function train() {
    let files = await parser.readDir(DATASET_FOLDER);
    let results = [];

    async.each(files, async (file, callback) => {
        console.log('[train] - Leyendo archivo: ', file);

        let data = await parser.getData(DATASET_FOLDER + file);
        results.push({ name: file.replace('.txt', ''), data: data });

    }, (error) => {
        results.forEach(elem => {
            classifier.addDocument(elem.data, elem.name);
        });

        classifier.train();

        classifier.save(CLASSIFIER_FILE, (error, result) => {
            if (error)
                console.log('[train] - ocurrio un error al persistir el clasificador: ', error);
            else
                console.log('[train] - el clasificador se guardo correctamente en: ', CLASSIFIER_FILE);
        });
    });
}

train();
