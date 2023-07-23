
import { IProduct } from '@/interfaces'
import { Grid, Card, CardActionArea, CardMedia } from '@mui/material'


export const ProductCard= ({ product = IProduct }) => {

        return (
        <Grid item 
            xs={6} 
            sm={ 4 } 
            key={product.slug}       
        >
            <Card>
                <CardActionArea>
                <CardMedia
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                    />
                </CardActionArea>
            </Card>
        </Grid>
        )
    }
