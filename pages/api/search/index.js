



export default function handler(req, res) {
    res.status(400).json({ message: 'Debe de especificar el query de búsqueda' })
}