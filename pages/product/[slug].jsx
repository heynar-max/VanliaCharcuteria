import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { dbProducts } from '@/database';
import { useState } from 'react';





const ProductPage = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = ( size ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  }


    return(

  <ShopLayout title={product.title} pageDescription={product.description}>

    <Grid container spacing={3}>

      <Grid item xs={12} sm={7}>
        <ProductSlideshow
          images={product.images} />
      </Grid>

      <Grid item xs={12} sm={5}>
        <Box display='flex' flexDirection='column'>

          {/* titulos */}
          <Typography variant='h1' component='h1'>{product.title}</Typography>
          <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

          {/* Cantidad */}
          <Box sx={{ my: 2 }}>
            <Typography variant='subtitle2'>Cantidad</Typography>
            {/* Item Counter contador de articulos */}
            <ItemCounter />
            {/* selector  */}
            <SizeSelector
            sizes={product.sizes}
            selectedSize={tempCartProduct.size}           
            onSelectedSize={ selectedSize }
            />
          </Box>


          {/* Agregar al carrito */}
            {
                (product.inStock > 0)
                ? (
                    <Button 
                      color="secondary" 
                      className='circular-btn'
                    >
                      {
                        tempCartProduct.size
                        ? 'Agregar a Carrito'
                        : 'Selecione una talla'
                      }
                    
                    </Button>
                )
                : (
                  <Chip label="No hay disponibles" color="error" variant='outlined' />
                )
              }

          {/* Descripción */}
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle2'>Descripción</Typography>
            <Typography variant='body2'>{product.description}</Typography>
          </Box>

        </Box>
      </Grid>


    </Grid>

  </ShopLayout>


)
}


// getStaticPaths....
// Debería usar getStaticPaths si está pre-renderizando estáticamente páginas que usan rutas dinámicas

export const getStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}


// Debería usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para el rendimiento.

export const getStaticProps = async ({ params }) => {
  
  const { slug = '' } = params;
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}


export default ProductPage