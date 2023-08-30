

export const format = ( value ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    return formatter.format( value ); //$2,500.00
}