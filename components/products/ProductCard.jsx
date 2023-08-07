
import { IProduct } from '@/interfaces'
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'
import { useMemo, useState } from 'react';


export const ProductCard= ({ product = IProduct }) => {

    // para saber cuando el mouse esta encima de la imagen
    const [isHovered, setIsHovered] = useState(false);

    // para mostrar el texto  cuando este cargando la imagen o la tarjeta
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${ product.images[1] }`
            : `/products/${ product.images[0] }`;

    }, [isHovered, product.images])

        return (
        <Grid item 
            xs={6} 
            sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
        >
            <Card >
                <NextLink href='/product/slug' passHref legacyBehavior prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={ productImage }
                                alt={product.title}
                                onLoad={ () => setIsImageLoaded(true) }
                                />
                        </CardActionArea>
                    </Link>
                </NextLink>

                {/* fadein es una animacion de global*/}
                <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none'  }} className='fadeIn'>
                    <Typography fontWeight={700} marginLeft={2}>{ product.title }</Typography>
                    <Typography fontWeight={500} marginLeft={2}>{ `$${product.price}` }</Typography>
                </Box>
            
            </Card>
        </Grid>
        )
    }
