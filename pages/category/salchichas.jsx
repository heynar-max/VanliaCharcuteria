import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'




export default function SalchichasPage( ) {

    const { products, isLoading } = useProducts('/products?gender=salchichas');

    return (
        <ShopLayout title={'Vanlia - Salchichas'} pageDescription={'Encuentra los mejores productos de charcuteria Salchichas'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Salchichas</Typography>
        <Typography variant="h2" sx={{ mb : 1 }}>Productos Salchichas</Typography>

        
            {
            isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
            
            
        </ShopLayout>
    )
}