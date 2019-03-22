const fs = require('fs');

/**
 * @class FileParser
 * @author Carlos Emanuel Balcazar
 */
class FileParser {

    /**
     * Creates an instance of FileParser.
     * @memberof FileParser
     */
    constructor() { }

    /**
     * List files into folder
     * @param {String} folder
     * @memberof CsvParser
     */
    async readDir(folder) {
        let files = fs.readdirSync(folder);
        return files;
    }

    /**
     * Get data from file
     * @param {String} filepath
     */
    async getData(filepath) {
        return new Promise((resolve, reject) => {
            let data = fs.readFileSync(filepath).toString().split('\n');
            data = clean(data);
            return resolve(data);
        });
    }
}

/**
 * Clean data
 * @param {Array} records
 */
async function clean(records) {
    records = records.filter(elem => {
        return (elem.length > 2);
    });

    return records;
}

module.exports = new FileParser();
