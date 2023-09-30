
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';


import { ItemCounter } from '../ui';
import { useContext } from 'react';
import { CartContext } from '@/context';
import { currency } from '@/utils';



export const CartList = ({ editable = false, products }) => {


    const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext);

    const onNewCartQuantityValue = (product, newQuantityValue) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;

    return (
        <>
        {/* Antes estaba product.slug pero se le agrego + product.size por que se duplica el slug 
        cuando se agrega un producto del mismo slug pero de diferente size da error, 
        se pone size para que tome el size varias veces */}
            {
                productsToShow.map( product => (
                    <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
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
                                <Typography variant='body1'>Tamaño: <strong>{ product.size }</strong></Typography>
                                    {/* Condicional */}

                                    {
                                        editable 
                                        ?(
                                            // maxValue es para decidir cuantos productos llevar
                                            <ItemCounter 
                                            currentValue={product.quantity}
                                            maxValue={10}
                                            updatedQuantity={ ( value )=> onNewCartQuantityValue( product, value )}
                                            />
                                        )
                                        : (
                                        <Typography variant='h5'>{product.quantity} {product.quantity >1 ? 'Productos':'Producto'}</Typography>
                                        )
                                    }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={.5} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{currency.format(product.price)  }</Typography>
                            {/* editable */}
                            
                            {
                                editable && (
                                    <Button 
                                    variant='text' 
                                    color='secondary' 
                                    onClick={ () => removeCartProduct( product ) }
                                    >
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
