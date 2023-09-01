import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { vanliApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';

const LoginPage = () => {

    const { register, handleSubmit,  formState: { errors },} = useForm ();

    const [ showError, setShowError ] = useState(false);

    const onLoginUser = async( { email, password } ) => {
        
        setShowError(false);
        try{
            const {data} =await vanliApi.post('/user/login', {email,password});
            const { token , user } = data;
            console.log({token, user});

        }catch(error){
            console.log('error en las credenciales');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
        
    }
        return (
            <AuthLayout title={'Ingresar'}>
                <form onSubmit={handleSubmit (onLoginUser)}noValidate>
                    <Box sx={{ width: 350, padding:'10px 20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                                <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                type='email'
                                label="Correo" 
                                variant="filled" 
                                fullWidth
                                {
                                    ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                    })}
                                    error={ errors.email }
                                    helperText={ errors.email?.message }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                label="Contraseña" 
                                type='password' 
                                variant="filled" 
                                fullWidth 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ errors.password }
                                helperText={ errors.password?.message }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                type='submit'
                                color="secondary" 
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                                >
                                    Ingresar
                                </Button>
                            </Grid>

                            <Grid item xs={12} display='flex' justifyContent='end'>
                                <NextLink href="/auth/register" passHref legacyBehavior>
                                    <Link underline='always' color='secondary'>
                                        ¿No tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </AuthLayout>
    )
}

export default LoginPage