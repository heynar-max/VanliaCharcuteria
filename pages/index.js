import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { initialData } from '@/database/products'
import { IProduct } from '@/interfaces'
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'


export default function Home() {
  return (
    <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
      <Typography variant="h1" color="h1" sx={{mt : 13}}>Charcuteria</Typography>
      <Typography variant="h1" sx={{ mb : 1 }}>Todos los productos</Typography>

      
      <ProductList
        products ={initialData.products}
        />
    </ShopLayout>
  )
}
