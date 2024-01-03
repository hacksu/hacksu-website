import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function makePhotoReceiver(uploadFolderName){
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, `../public/${uploadFolderName}/`))
        },
        filename: function (req, file, cb) {
            cb(null, path.basename(file.originalname) + '_' + Date.now() + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage });
    return upload.single("photo")
}


export default function setUpUpload(app){
    const staffFolderName = "staff-photos";
    app.use("/staff-photo-upload", makePhotoReceiver(staffFolderName), async (req, res) => {
        // enforce maximum 800x800 size for photos
        const buffer = await sharp(req.file.path)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            }).toBuffer();
        sharp(buffer).toFile(req.file.path);
        // reply with the path to the file
        res.send(`/${staffFolderName}/`+req.file.filename);
    });

    const eventFolderName = "event-photos";
    const maxEventPhotoWidth = 1000;
    const eventPhotoAR = 2.5;
    app.use("/event-photo-upload", makePhotoReceiver(eventFolderName), async (req, res) => {
        // resize photo to make sure it's 5:1 and no wider than 1000 pixels

        // get metadata to figure out edge lengths:
        const metadata = await sharp(req.file.path).metadata();
        const targetHeight = Math.min(Math.round(maxEventPhotoWidth / eventPhotoAR), metadata.height);
        const targetWidth = targetHeight * eventPhotoAR;

        // Resize and crop the image
        const buffer = await sharp(req.file.path)
            .resize(targetWidth, targetHeight)
            .toBuffer();
        sharp(buffer).toFile(req.file.path);
        // reply with the path to the file
        res.send(`/${eventFolderName}/`+req.file.filename);
    });
}
