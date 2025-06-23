const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Configuración
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'tienda-secreta',
    resave: false,
    saveUninitialized: true
}));

// Simulación de productos
const productos = [
    { id: 1, nombre: 'Laptop Gamer', precio: 18000, imagen: 'https://via.placeholder.com/300x200?text=Laptop+Gamer' },
    { id: 2, nombre: 'Smartphone', precio: 9500, imagen: 'https://via.placeholder.com/300x200?text=Smartphone' },
    { id: 3, nombre: 'Audífonos', precio: 1500, imagen: 'https://via.placeholder.com/300x200?text=Audifonos' },
    { id: 4, nombre: 'Smartwatch', precio: 2500, imagen: 'https://via.placeholder.com/300x200?text=Smartwatch' },
    { id: 5, nombre: 'Cámara', precio: 8500, imagen: 'https://via.placeholder.com/300x200?text=Camara' }
];

// Home
app.get('/', (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : '';
    let productosFiltrados = productos;

    if (q) {
        productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(q));
    }

    res.render('home', { productos: productosFiltrados, carrito: req.session.carrito || [], q });
});

// Productos
app.get('/productos', (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : '';
    let productosFiltrados = productos;

    if (q) {
        productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(q));
    }

    res.render('productos', { productos: productosFiltrados, carrito: req.session.carrito || [], q });
});


// Carrito
app.get('/carrito', (req, res) => {
    const carrito = req.session.carrito || [];
    res.render('carrito', { carrito });
});

// Agregar al carrito
app.post('/agregar', (req, res) => {
    const { id } = req.body;
    const producto = productos.find(p => p.id == id);

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    req.session.carrito.push(producto);
    res.redirect('/carrito');
});

// Eliminar del carrito
app.post('/eliminar', (req, res) => {
    const { id } = req.body;
    if (req.session.carrito) {
        req.session.carrito = req.session.carrito.filter(p => p.id != id);
    }
    res.redirect('/carrito');
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
