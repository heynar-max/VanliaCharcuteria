import { IncomingForm, File } from 'formidable';
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

export const config = {
    api: {
        bodyParser: false,
    }
}


export default function handler(req, res) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}


const saveFile = async( file ) => {

    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    return secure_url;
    
}


const parseFiles = async(req) => {

    return new Promise( (resolve, reject) => {

        const form = new IncomingForm() ;
        form.parse( req, async( err, fields, files ) => {
            

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file[0] )
            resolve(filePath);
        })

    }) 

}


const uploadFile = async(req, res) => {
    
    
    const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: imageUrl });

}
