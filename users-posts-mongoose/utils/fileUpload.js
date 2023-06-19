const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path;
        if (file.fieldname === 'profilePicture') {
            path = 'public/profilePictures'
        }
        else { path = 'public/posts' }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        let fileName = req.user.emailId + "-" + Date.now() + path.extname(file.originalname).toLowerCase()
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "video/gif" || file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg , .jpeg ,video format allowed!'));
        }
    }
})

module.exports = upload;