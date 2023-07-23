
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'
import { initialData } from '@/database/products'




export const ProductList= ({ products = IProduct }) => {
    
    
    return (

        <Grid container spacing={4}>
            {
                products.map( product => (
                    <ProductCard 
                        key={ product.slug }
                        product={ product }
                    />
                ))
            }
        </Grid>
        
    )
}
