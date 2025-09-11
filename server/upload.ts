import path from "path";
import { fileURLToPath } from "url";

import type { Application } from "express";
import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makePhotoReceiver = (uploadFolderName: string) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.resolve(__dirname, `../public/${uploadFolderName}/`)),
        filename: (req, file, cb) => cb(null, path.basename(file.originalname) + '_' + Date.now() + path.extname(file.originalname))
    });
    const upload = multer({ storage });
    return upload.single("photo");
}

export const setUpUpload = (app: Application) => {
    const staffFolderName = "staff-photos";
    app.use("/staff-photo-upload", makePhotoReceiver(staffFolderName), async (req, res) => {
        // enforce maximum 800x800 size for photos
        if (req.file) {
            const buffer = await sharp(req.file.path)
                .resize(800, 800, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
                }).toBuffer();
            await sharp(buffer).toFile(req.file.path);
            // reply with the path to the file
            res.send(`/${staffFolderName}/`+req.file.filename);
        }
        return res.sendStatus(401);
    });

    const infoFolderName = "information-photos";
    app.use("/information-photo-upload", makePhotoReceiver(infoFolderName), async (req, res) =>{
        if (req.file) {
            const buffer = await sharp(req.file.path)
                .resize(800, 800, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
                }).toBuffer();
            await sharp(buffer).toFile(req.file.path);
            return res.send(`/${infoFolderName}/`+req.file.filename);
        }
        return res.sendStatus(401);
    });

    const eventFolderName = "event-photos";
    const maxEventPhotoWidth = 1000;
    const eventPhotoAR = 2.5;
    app.use("/event-photo-upload", makePhotoReceiver(eventFolderName), async (req, res) => {
        // resize photo to make sure it's 5:1 and no wider than 1000 pixels
        // get metadata to figure out edge lengths:
        if (req.file) {
            const metadata = await sharp(req.file.path).metadata();
            const targetHeight = Math.min(Math.round(maxEventPhotoWidth / eventPhotoAR), metadata.height ?? 0);
            const targetWidth = Math.round(targetHeight * eventPhotoAR);

            // Resize and crop the image
            const buffer = await sharp(req.file?.path)
                .resize(targetWidth, targetHeight)
                .toBuffer();
            await sharp(buffer).toFile(req.file.path);
            // reply with the path to the file
            return res.send(`/${eventFolderName}/`+req.file.filename);
        }
        return res.sendStatus(401);
    });
}
