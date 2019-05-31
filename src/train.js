const async = require('async');
const path = require('path');
const parser = require('./parser/fileParser');
const config = require('./config/config');
const DATASET_FOLDER = __dirname + config.DATASET_FOLDER;

const classifiers = [];

require('require-all')({
    dirname: path.join(__dirname, config.CLASSIFIERS_FOLDER),
    map: (name, path) => {
        classifiers.push(require(path));
    }
});

async function train() {
    let files = await parser.readDir(DATASET_FOLDER);
    let results = [];

    async.each(files, async (file, callback) => {
        console.log('[train] - Leyendo archivo: ', file);
        let data = await parser.getData(DATASET_FOLDER + file);
        results.push({ data: data, name: file.replace('.txt', '') });
    }, async (error) => {
        if (error)
            return console.error('[train] - Error al leer los archivos:', error);

        results.forEach(record => {
            classifiers.map(classifier => classifier.addDocument(record.data, record.name));
        });

        classifiers.forEach(classifier => classifier.train());
        classifiers.forEach(async classifier => { await classifier.save() });

        console.log('[train] - Todos los clasificadores se entrenaron y guardaron correctamente.');
    });
}

train();
