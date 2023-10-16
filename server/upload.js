import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/staff-photos/"))
    },
    filename: function (req, file, cb) {
        cb(null, path.basename(file.originalname) + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

export default function setUpUpload(app){
    app.use("/photo-upload", upload.single("photo"), async (req, res) => {
        console.log("file:", req.file);
        // resize file to make it smaller
        let buffer = await sharp(req.file.path)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            }).toBuffer();
        sharp(buffer).toFile(req.file.path);
        // reply with the path to the file
        res.send("/staff-photos/"+req.file.filename);
    });
}
