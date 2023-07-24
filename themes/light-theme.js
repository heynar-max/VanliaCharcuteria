
import { createTheme } from '@mui/material/styles';
import { red,  } from '@mui/material/colors';


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
        main: '#F6F4E8',
        light: '#1E1E1E',
        },
        secondary: {
        main: '#8E0E23',
        dark: '#000000'
        },
        
        
    },
    components: {
        MuiLink: {
        // subrayado
        defaultProps: {
            underline: 'none',
        },
        },
        MuiAppBar: {
        defaultProps: {
            elevation: 0,
            position: 'fixed',
        },
        styleOverrides: {
            root: {
            height: 100
            },
        }
        },

        MuiTypography: {
        styleOverrides: {
            h1: {
            fontSize: 30,
            fontWeight: 600
            },
            h2: {
            fontSize: 20,
            fontWeight: 400
            },
            subtitle1: {
            fontSize: 18,
            fontWeight: 600
            }
        }
        },


        MuiButton: {
        defaultProps: {
            variant: 'contained',
            size: 'small',
            disableElevation: true,
        },
        styleOverrides: {
            root: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: 10,
            ":hover": {
                backgroundColor: '#8e0e23',
                transition: 'all 0.3s ease-in-out',
                color: 'white'
            }
            }
        }
        },


        MuiCard: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides: {
            root: {
            boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
            borderRadius: '10px',
            }
        }
        }
        
    }
    });