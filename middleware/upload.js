const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

let processFile = multer({
    storage: multer.memoryStorage(),
    limits:  {fileSize: maxSize},
}).single('files')

let processFileMiddleware = util.promisify(processFile);

module.exports = processFileMiddleware