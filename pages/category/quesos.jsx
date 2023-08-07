import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'




export default function QuesosPage( ) {

    const { products, isLoading } = useProducts('/products?gender=quesos');

    return (
        <ShopLayout title={'Vanlia - Quesos'} pageDescription={'Encuentra los mejores productos de charcuteria Quesos'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Quesos</Typography>
        <Typography variant="h2" sx={{ mb : 1 }}>Productos Quesos</Typography>

        
            {
            isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
            
            
        </ShopLayout>
    )
}