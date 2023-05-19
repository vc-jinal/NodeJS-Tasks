const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const empFile = process.env.EMP_FILE;
const employeeRouter = require('./employee.router');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({

    limits: { fileSize: 1 * 1000 * 1000 },
    fileFilter: (req, res, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const singleUpload = multer({ storage: storage, file: upload }).single("file");

module.exports = {
    singleUpload
}