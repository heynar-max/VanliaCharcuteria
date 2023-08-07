import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'




export default function HomePage( ) {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
      <Typography variant="h1" color="h1" sx={{mt : 13}}>Charcuteria</Typography>
      <Typography variant="h1" sx={{ mb : 1 }}>Todos los productos</Typography>

      
        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }
          
          
    </ShopLayout>
  )
}
