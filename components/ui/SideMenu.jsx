import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, TableRestaurant, Restaurant, LoginOutlined,RestaurantMenu, KebabDining, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from "next/router";


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext(  AuthContext );
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        // trim es para espacios en blanco
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    const navigateTo = ( url ) => {
        toggleSideMenu();
        router.push(url);
    }


    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            // backdropFilter: 'blur(4px)' es propio de CSS para opacidad fondo
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
            // onClose toggleSideMenu es para cuando de clic fuera del sidemenu se cierre
            onClose={ toggleSideMenu }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ onSearchTerm }
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem button
                                    onClick={() => navigateTo('/orders/history')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }        
                    


                    <ListItem button 
                    sx={{ display: { xs: '', md: 'none' } }}
                    onClick={ () => navigateTo('/category/salchichas') }
                    >
                        <ListItemIcon>
                            <Restaurant/>
                        </ListItemIcon>
                        <ListItemText primary={'Salchichas'} />
                    </ListItem>

                    <ListItem button 
                    sx={{ display: { xs: '',  md: 'none'  } }}
                    onClick={ () => navigateTo('/category/chorizos') }
                    >
                        <ListItemIcon>
                            <KebabDining/>
                        </ListItemIcon>
                        <ListItemText primary={'Chorizos'} />

                    </ListItem>

                    <ListItem button 
                    sx={{ display: { xs: '',  md: 'none'  } }}
                    onClick={ () => navigateTo('/category/ahumados') }
                    >
                        <ListItemIcon>
                            <TableRestaurant/>
                        </ListItemIcon>
                        <ListItemText primary={'Ahumados'} />
                    </ListItem>
                    <ListItem button 
                    sx={{ display: { xs: '',  md: 'none'  } }}
                    onClick={ () => navigateTo('/category/quesos') }
                    >
                        <ListItemIcon>
                            <RestaurantMenu/>
                        </ListItemIcon>
                        <ListItemText primary={'Quesos'} />
                    </ListItem>

                    {
                        isLoggedIn
                        ? (
                            <ListItem button onClick={ logout }>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        ) : (
                            <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`)}
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                            
                        )
                    }
                    


                    {/* Admin */}
                    {/* Divider son las lineas de separacion */}

                    {
                        user?.role === 'admin' && (
                            <>
                            <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem button>
                                    <ListItemIcon>
                                        <CategoryOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <AdminPanelSettings/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItem>
                            </>
                        )
                    }
                    
                </List>
            </Box>
        </Drawer>
    )
}