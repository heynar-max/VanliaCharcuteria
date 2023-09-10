import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { countries } from "@/utils"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { useRouter } from "next/router"




const AddressPage = () => {

    const router = useRouter();

    const { register, handleSubmit,  formState: { errors },} = useForm ({
        defaultValues:{ 
            firstName: '',
            lastName:  '',
            address:   '',
            address2: '',
            zip:      '',
            city:     '',
            country :  countries[14].code,
            phone:    '',
        }
    });
    
    const onSubmitAddress = (data) => {
            console.log(data);
            Cookies.set('firstName',data.firstName);
            Cookies.set('lastName',data.lastName) ;
            Cookies.set('address',data.address) ;
            Cookies.set('address2',data.address2)|| '' ;
            Cookies.set('zip',data.zip) ;
            Cookies.set('city',data.city) ;
            Cookies.set('country',data.country) ;
            Cookies.set('phone',data.phone);

            router.push('/checkout/summary');
    }
    return (
        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Typography variant="h1" component='h1'>Dirección</Typography>

                <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                    
                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Nombre' 
                            variant="filled" 
                            fullWidth 
                            { ...register('firstName', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.firstName }
                            helperText={ errors.firstName?.message }
                            />
                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Apellido' 
                            variant="filled" 
                            fullWidth
                            { ...register('lastName', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.lastName }
                            helperText={ errors.lastName?.message }
                            />
                    </Grid>

                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Dirección' 
                            variant="filled" 
                            fullWidth 
                            { ...register('address', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.address }
                            helperText={ errors.address?.message }
                            />
                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                        label='Dirección 2 (opcional)' 
                        variant="filled" 
                        fullWidth 
                        { ...register('address2')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Código Postal' 
                            variant="filled" 
                            fullWidth 
                            { ...register('zip', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.zip }
                            helperText={ errors.zip?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Ciudad' 
                            variant="filled" 
                            fullWidth 
                            { ...register('city', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={ 6 }>
                        <FormControl fullWidth>
                            <Select
                                variant="filled"
                                label="País"
                                value={countries[14].code}
                                { ...register('country', {
                                    required: 'Este campo es requerido',
                                })}
                                error={ errors.country }
                                // helperText={ errors.country?.message }
                            >
                                {
                                    countries.map( country => (
                                        <MenuItem 
                                        key={ country.code}
                                        value={country.code}
                                        >{country.name}</MenuItem>
                                        
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                        <TextField 
                            label='Teléfono' 
                            variant="filled" 
                            fullWidth 
                            { ...register('phone', {
                                required: 'Este campo es requerido',
                            })}
                            error={ errors.phone }
                            helperText={ errors.phone?.message }
                            />
                    </Grid>

                </Grid>


                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type= 'submit' color="secondary" className="circular-btn" size="large">
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}



export default AddressPage