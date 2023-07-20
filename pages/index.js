import { ShopLayout } from '@/components/layouts'
import Typography from '@mui/material/Typography'


export default function Home() {
  return (
    <ShopLayout title={'Vanlia - Home'} pageDescription={'Encuentra los mejores productos de charcuteria'} imageFullUrl={''}>
      <Typography variant="h1" color="h1">Charcuteria</Typography>
      <Typography variant="h1" sx={{mb : 1}}>Todos los productos</Typography>
    </ShopLayout>
  )
}
