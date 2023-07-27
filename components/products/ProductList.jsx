
import { Grid } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'





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
