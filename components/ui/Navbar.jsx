import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '@/context';

export const Navbar = () => {


    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }

    return (
        <AppBar width='100px'>
                <Toolbar >
                    <NextLink href='/' passHref legacyBehavior>
                        <Link display='flex' alignItems='center' sx={{ mt: .5}}>
                            <Image src="/img/vanlia.png" alt='Logo' width='140' height='90' priority={true}/>
                        </Link>  
                    </NextLink>

                    {/* TODO flex */}
                    <Box flex={ 1 } />

                    <Box sx={{ display: isSearchVisible ? 'none' :  { xs: 'none', md: 'block' } }}
                        className="fadeIn">
                        <NextLink href='/category/salchichas' passHref legacyBehavior>
                            <Link>
                                <Button color={asPath === '/category/salchichas' ? 'secondary':'primary'} sx={{ mr: 1}}>SALCHICHAS</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/category/chorizos' passHref legacyBehavior>
                            <Link>
                                <Button color={asPath === '/category/chorizos' ? 'secondary':'primary'} sx={{ mr: 1}}>CHORIZOS</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/category/ahumados' passHref legacyBehavior>
                            <Link>
                                <Button color={asPath === '/category/ahumados' ? 'secondary':'primary'} sx={{ mr: 1}}>AHUMADOS</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/category/quesos' passHref legacyBehavior>
                            <Link>
                                <Button color={asPath === '/category/quesos' ? 'secondary':'primary'} sx={{ mr: 1}}>QUESOS</Button>
                            </Link>
                        </NextLink>
                    </Box>

                    {/* TODO flex */}
                    <Box flex={ 1 } />

                    {/* Pantallas pantallas grandes */}
                    {
                            isSearchVisible 
                                ? (
                                    <Input
                                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                                        className='fadeIn'
                                        autoFocus
                                        value={ searchTerm }
                                        onChange={ (e) => setSearchTerm( e.target.value ) }
                                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                        type='text'
                                        placeholder="Buscar..."
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={ () => setIsSearchVisible(false) }
                                                >
                                                    <ClearOutlined />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                )
                            : 
                            (
                                <IconButton 
                                    onClick={ () => setIsSearchVisible(true) }
                                    className="fadeIn"
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            )
                        }


                        {/* Pantallas pequeñas */}
                        <IconButton
                            sx={{ display: { xs: 'flex', sm: 'none' } }}
                            onClick={ toggleSideMenu }
                        >
                            <SearchOutlined />
                        </IconButton>

                    <NextLink href="/cart" passHref legacyBehavior>
                        <Link>
                            <IconButton>
                                <Badge badgeContent={2} color="secondary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </IconButton>
                        </Link>
                    </NextLink>


                    <Button onClick={ toggleSideMenu }>
                        Menú
                    </Button>
                </Toolbar>
        </AppBar>
    )
}