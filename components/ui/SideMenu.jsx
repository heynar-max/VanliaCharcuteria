import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, TableRestaurant, Restaurant, LoginOutlined,RestaurantMenu, KebabDining, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"


export const SideMenu = () => {
    return (
        <Drawer
            open={ false }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
            // backdropFilter: 'blur(4px)' es propio de CSS para opacidad fondo
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>
                    <ListItem>
                        <Input
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItem>


                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <Restaurant/>
                        </ListItemIcon>
                        <ListItemText primary={'Salchichas'} />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <KebabDining/>
                        </ListItemIcon>
                        <ListItemText primary={'Chorizos'} />

                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <TableRestaurant/>
                        </ListItemIcon>
                        <ListItemText primary={'Ahumados'} />
                    </ListItem>
                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <RestaurantMenu/>
                        </ListItemIcon>
                        <ListItemText primary={'Quesos'} />
                    </ListItem>


                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>


                    {/* Admin */}
                    {/* Divider son las lineas de separacion */}
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
                </List>
            </Box>
        </Drawer>
    )
}