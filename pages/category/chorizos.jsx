import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'




export default function ChorizosPage( ) {

    const { products, isLoading } = useProducts('/products?gender=chorizos');

    return (
        <ShopLayout title={'Vanlia - Chorizos'} pageDescription={'Encuentra los mejores productos de charcuteria chorizos'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Chorizos</Typography>
        <Typography variant="h2" sx={{ mb : 1 }}>Productos Chorizos</Typography>

        
            {
            isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
            
            
        </ShopLayout>
    )
}