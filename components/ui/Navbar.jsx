import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
    return (
<AppBar >
        <Toolbar >
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center' sx={{ mt: 5}}>
                    <Image src="/img/vanlia.png" alt='Logo' width='140' height='90' priority={true}/>
                </Link>  
            </NextLink>

            {/* TODO flex */}
            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <NextLink href='/category/salchichas' passHref legacyBehavior>
                    <Link>
                        <Button sx={{ mr: 1}}>SALCHICHAS</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/chorizos' passHref legacyBehavior>
                    <Link>
                        <Button sx={{ mr: 1}}>CHORIZOS</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/ahumados' passHref legacyBehavior>
                    <Link>
                        <Button sx={{ mr: 1}}>AHUMADOS</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/quesos' passHref legacyBehavior>
                    <Link>
                        <Button sx={{ mr: 1}}>QUESOS</Button>
                    </Link>
                </NextLink>
            </Box>

            {/* TODO flex */}
            <Box flex={ 1 } />

            <IconButton>
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


            <Button>
                Menú
            </Button>
        </Toolbar>
</AppBar>
    )
}