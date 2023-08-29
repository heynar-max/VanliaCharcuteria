
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';


import { ItemCounter } from '../ui';
import { useContext } from 'react';
import { CartContext } from '@/context';



export const CartList = ({ editable = false }) => {


    const {cart} = useContext(CartContext)


    return (
        <>
            {
                cart.map( product => (
                    <Grid container spacing={2} key={ product.slug } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href="/product/slug" passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={ `/products/${ product.image }` }
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                                    {/* Condicional */}

                                    {
                                        editable 
                                        ?(
                                            // maxValue es para decidir cuantos productos llevar
                                            <ItemCounter 
                                            currentValue={product.quantity}
                                            maxValue={10}
                                            updatedQuantity={()=>{}}
                                            />
                                        )
                                        : (
                                        <Typography variant='h5'>{product.quantity} {product.quantity >1 ? 'Productos':'Producto'}</Typography>
                                        )
                                    }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={.5} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                            {/* editable */}
                            
                            {
                                editable && (
                                    <Button variant='text' color='secondary' >
                                        Remover
                                    </Button>
                                )
                            }
                                
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
