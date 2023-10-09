import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { AdminLayout } from '@/components/layouts';





const columns = [
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({ row } ) => {
            return (
                <a href={ `/product/${ row.slug }` } target="_blank" rel="noreferrer">
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ `/products/${row.img}` }
                    />
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}) => {
            return (
                <NextLink href={`/admin/products/${ row.slug }`}  passHref legacyBehavior>
                    <Link underline='always' color="secondary" >
                        { row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

];



const ProductsPage = () => {

    const { data, error } = useSWR('/api/admin/products');

    if ( !data && !error ) return (<></>);
    
    const rows = data.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));


    return (
        <AdminLayout 
            title={`Productos (${ data?.length })`} 
            subTitle={'Mantenimiento de productos'}
            icon={ <CategoryOutlined /> }
        >
            

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
            
        </AdminLayout>
    )
}

export default ProductsPage;