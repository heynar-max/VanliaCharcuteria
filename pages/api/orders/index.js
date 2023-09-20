



export default function handler(req, res) {
    

    switch( req.method ) {
        case 'POST':
            return createOrder( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req, res) => {
    
    
        
        return res.status(201).json( {message: 'hola mundo'} );

}
