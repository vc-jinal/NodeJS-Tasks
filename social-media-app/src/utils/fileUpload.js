import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path;
        if (file.fieldname === 'posts') {
            path = 'public/postUpload'
        }
        cb(null, path)

    },
    filename: (req, file, cb) => {
        let fileName = req.user.emailId + "-" + Date.now() + path.extname(file.originalname).toLowerCase()
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg , .jpeg format allowed!'));
        }
    }
})

export default upload;