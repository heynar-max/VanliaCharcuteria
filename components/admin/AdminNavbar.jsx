import { useContext } from 'react';
import NextLink from 'next/link';


import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';


import { UiContext } from '../../context';
import Image from 'next/image';

export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UiContext );
    

    return (
        <AppBar>
            <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                        <Link display='flex' alignItems='center' sx={{ mt: .5}}>
                            <Image src="/img/vanlia.png" alt='Logo' width='140' height='90' priority={true}/>
                        </Link>  
                    </NextLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
