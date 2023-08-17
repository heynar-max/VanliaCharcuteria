import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { dbProducts } from '@/database'
import Typography from '@mui/material/Typography'



const SearchPage = ( {products} ) => {


    return (
        <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Charcuteria</Typography>
        <Typography variant="h1" sx={{ mb : 1 }}>Todos los productos</Typography>
            
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
    
    

    return {
        props: {
            products
        }
    }
}

export default SearchPage
