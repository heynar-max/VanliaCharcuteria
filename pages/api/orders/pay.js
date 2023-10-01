
import axios from 'axios';






export default function handler(req, res) {
    
    switch( req.method) {
        case 'POST':
            return payOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })

    }   
}


const getPaypalBearerToken = async() => {
    
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');


    try {
        
        const { data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;


    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }

        return null;
    }


}


const payOrder = async(req, res) => {

    // Todo: validar sesión del usuario
    // TODO: validar mongoID

    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }

    
    
    return res.status(200).json({ message: paypalBearerToken });
}
