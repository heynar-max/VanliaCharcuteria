import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'




export default function AhumadosPage( ) {

    const { products, isLoading } = useProducts('/products?gender=ahumados');

    return (
        <ShopLayout title={'Vanlia - Ahumados'} pageDescription={'Encuentra los mejores productos de charcuteria Ahumados'} imageFullUrl={''}>
        <Typography variant="h1" color="h1" sx={{mt : 13}}>Ahumados</Typography>
        <Typography variant="h2" sx={{ mb : 1 }}>Productos Ahumados</Typography>

        
            {
            isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
            
            
        </ShopLayout>
    )
}
