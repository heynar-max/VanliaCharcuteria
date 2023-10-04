
import { Grid, Card, CardContent, Typography } from '@mui/material';




export const SummaryTile= ({ title, subTitle, icon }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{display: 'flex', marginTop: '40px', marginLeft:'20px'}}>
                <CardContent sx={{width: 50, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {icon}
                </CardContent>
                    <CardContent sx={{flex: '1 0 auto', display: 'flex', flexDirection:'column'}}>
                        <Typography variant='h3'>{title}</Typography>
                        <Typography variant='caption'>{subTitle}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
