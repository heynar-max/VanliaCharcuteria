import NextLink from 'next/link';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { vanliApi } from '@/axiosApi';
import { useRouter } from 'next/router';
import { useState } from 'react';



const OrderPage = ({order}) => {
    
    const router = useRouter();
    const { shippingAddress } = order;
    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async( details ) => {
        
        if ( details.status !== 'COMPLETED' ) {
            return alert('No hay pago en Paypal');
        }

        setIsPaying(true);

        try {
            
            const { data } = await vanliApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });

            router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error');
        }

    };

    return (
        <ShopLayout title='Resumen de la orden 123671523' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>

            {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant='outlined'
                    color="success"
                    icon={ <CreditScoreOutlined /> }
                />
            ):
            (
                <Chip 
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        }
            

            <Grid container className='fadeIn'>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList products={  order.orderItems } />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                            <Divider sx={{ my:1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                
                            </Box>

                            
                            <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                            <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
                            <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                            <Typography>{ shippingAddress.country }</Typography>
                            <Typography>{ shippingAddress.phone }</Typography>

                            <Divider sx={{ my:1 }} />


                            <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }}
                            />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                                {/* TODO */}

                                <Box 
                                    display="flex"
                                    justifyContent="center"
                                    className='fadeIn'
                                    sx={{ display: isPaying ? 'flex': 'none' }}>
                                    <CircularProgress />
                                </Box>

                            <Box flexDirection='column' sx={{ display: isPaying ? 'none': 'flex', flex: 1 }} >

                                {
                                order.isPaid
                                ? (
                                    <Chip 
                                        sx={{ my: 2 }}
                                        label="Orden ya fue pagada"
                                        variant='outlined'
                                        color="success"
                                        icon={ <CreditScoreOutlined /> }
                                    />

                                ):(
                                    <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: `${order.total}`,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            onOrderCompleted( details );
                                            
                                        });
                                    }}
                                    />
                                )
                            }
                            </Box>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export const getServerSideProps = async ( req ) => {
    
    const { query } = req;
    const { id = ''} = query;
    const session = await getSession(req);

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    // si no hay orden sacar a la persona
    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    // si order es diferente a la session user id sacar al usuario
    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
            
        }
    }
}


export default OrderPage;