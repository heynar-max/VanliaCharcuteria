
import { Box, Button } from '@mui/material';
import { ValidSize } from '../../interfaces';



export const SizeSelector = ({ selectedSize = ValidSize, sizes = ValidSize, onSelectedSize }) => {


    return (
        <Box>
        {sizes.map(size => (
            <Button
            key={size}
            size='small'
            // selectedSize es igual a size muestre secondary
            color={selectedSize === size ? 'secondary' : 'primary'}
            onClick={() => onSelectedSize( size )}
            >
            {size}
            </Button>
        ))}
        </Box>
    );
};

