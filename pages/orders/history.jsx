import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';


const columns  = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params= GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params= GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${ params.row.orderId }`} passHref legacyBehavior>
                        <Link underline='always' color='secondary'>
                            Ver orden
                        </Link>
                </NextLink>
            )
        }
    },
];



const HistoryPage = ({orders}) => {

    // const rows = ..  
    // { id: indice + 1, paid: true, fullname: 'Heynar Soto', orderId: 1283781237123 }
    const rows = orders.map( (order, idx) => ({ 
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order._id
    }))


    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />

                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export const getServerSideProps = async ({ req }) => {
    
    const session= await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}

export default HistoryPage