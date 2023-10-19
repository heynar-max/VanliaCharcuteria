import { IncomingForm, File } from 'formidable';
import fs from 'fs';

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

    const data = fs.readFileSync( file.filepath );
    fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    fs.unlinkSync( file.filepath ); // elimina
    return;
    

}


const parseFiles = async(req) => {

    return new Promise( (resolve, reject) => {

        const form = new IncomingForm() ;
        form.parse( req, async( err, fields, files ) => {
            console.log({file: files.file});

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file[0]  )
            resolve(filePath);
        })

    }) 

}


const uploadFile = async(req, res) => {
    
    await parseFiles(req);
    // const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: 'imageUrl' });

}
