import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { dbProducts } from '@/database'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'



const SearchPage = ( {products, foundProducts, query} ) => {


    return (
        <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Charcuteria</Typography>
        <Typography variant="h1" sx={{ mb : 1 }}>Todos los productos</Typography>
            

        {
            foundProducts 
                ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { query }</Typography>
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
                    </Box>
                )
        }

            <ProductList products={ products } />
            
        </ShopLayout>
    )
}

// Debe usar getServerSideProps cuando:
// - Solo si necesita renderizar previamente una página cuyos datos deben obtenerse en el momento de la solicitud

export const getServerSideProps = async ({ params }) => {
    
    const { query = '' } = params;

    // por si llega a fallar
    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('quesos');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage
