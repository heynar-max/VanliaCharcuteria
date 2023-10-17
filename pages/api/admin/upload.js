import formidable from 'formidable';

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





const parseFiles = async(req) => {

    

}


const uploadFile = async(req, res) => {
    
    // const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: imageUrl });

}
