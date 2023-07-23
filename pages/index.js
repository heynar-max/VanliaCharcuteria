import { ShopLayout } from '@/components/layouts'
import { initialData } from '@/database/products'
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'


export default function Home() {
  return (
    <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
      <Typography variant="h1" color="h1" sx={{mt : 13}}>Charcuteria</Typography>
      <Typography variant="h1" sx={{ mb : 1 }}>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map( product => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia
                  component='img'
                  image={`products/${product.images[0]}`}
                  alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ShopLayout>
  )
}
