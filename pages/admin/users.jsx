import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem } from '@mui/material';
import { AdminLayout } from '@/components/layouts';


const UsersPage = () => {

    const { data, error } = useSWR('/api/admin/users');
    
    

    if ( !data && !error ) return (<></>);

    


    const columns= [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            
        },
    ];

    const rows = data.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


    return (
        <AdminLayout 
            title={'Usuarios'} 
            subTitle={'Mantenimiento de usuarios'}
            icon={ <PeopleOutline /> }
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

export default UsersPage