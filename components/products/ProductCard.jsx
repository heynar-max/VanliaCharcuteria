
import { IProduct } from '@/interfaces'
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'
import { useMemo, useState } from 'react';


export const ProductCard= ({ product = IProduct }) => {

    // para saber cuando el mouse esta encima de la imagen
    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `products/${ product.images[1] }`
            : `products/${ product.images[0] }`;

    }, [isHovered, product.images])

        return (
        <Grid item 
            xs={6} 
            sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
        >
            <Card >
                <NextLink href='/category/salchichas' passHref legacyBehavior>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={ productImage }
                                alt={product.title}
                                
                                />
                        </CardActionArea>
                    </Link>
                </NextLink>

                {/* fadein es una animacion de global*/}
                <Box sx={{ mt: 1 }} className='fadeIn'>
                    <Typography fontWeight={700} marginLeft={2}>{ product.title }</Typography>
                    <Typography fontWeight={500} marginLeft={2}>{ `$${product.price}` }</Typography>
                </Box>
            
            </Card>
        </Grid>
        )
    }
