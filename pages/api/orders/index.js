



export default function handler(req, res) {
    

    switch( req.method ) {
        case 'POST':
            return createOrder( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req, res) => {
    
    const body = req.body;
        
        return res.status(201).json( body );

}
