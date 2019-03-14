const fs = require('fs');

class FileParser {

    constructor() {

    }

    /**
     * List files into folder
     * @param {String} folder
     * @memberof CsvParser
     */
    async readDir(folder) {
        let files = fs.readdirSync(folder);
        return files;
    }

    async getData(filepath) {
        return new Promise((resolve, reject) => {
            let data = fs.readFileSync(filepath).toString().split('\n');
            data = clean(data);
            return resolve(data);
        });
    }
}

async function clean(records) {
    records = records.filter(elem => {
        return (elem.length > 1);
    });
    return records;
}

module.exports = new FileParser();
