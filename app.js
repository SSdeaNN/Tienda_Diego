const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3010;

// Configuración
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
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
app.get('/login', (req, res) => {
    res.render('login')
})

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
app.get('/productos', async (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : '';
  let productosFiltrados = [];

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products'); // 🔁 Reemplaza con tu URL real

    if (!response.ok) {
      throw new Error('Error al obtener productos de la API');
    }

    const productos = await response.json();

    // Filtro por texto (si hay búsqueda)
    productosFiltrados = q
      ? productos.filter(p => p.title.toLowerCase().includes(q))
      : productos;

    // Adaptar estructura a lo que espera la vista EJS
    const productosAdaptados = productosFiltrados.map(p => ({
      id: p.id,
      nombre: p.title,
      precio: p.price,
      imagen: p.images?.[0] || 'https://placehold.co/600x400'
    }));

    res.render('productos', {
      productos: productosAdaptados,
      carrito: req.session.carrito || [],
      q
    });

  } catch (error) {
    console.error('Error al consumir API externa:', error.message);

    res.render('productos', {
      productos: [],
      carrito: req.session.carrito || [],
      q,
      error: 'No se pudieron cargar los productos'
    });
  }
});

// Carrito
app.get('/carrito', (req, res) => {
    const carrito = req.session.carrito || [];
    res.render('carrito', { carrito });
});

/* // Agregar al carrito
app.post('/agregar', (req, res) => {
    const { id } = req.body;
    const producto = productos.find(p => p.id == id);

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    req.session.carrito.push(producto);
    res.redirect('/carrito');
}); */

// Eliminar del carrito
app.post('/eliminar', (req, res) => {
    const { id } = req.body;
    if (req.session.carrito) {
        req.session.carrito = req.session.carrito.filter(p => p.id != id);
    }
    res.redirect('/carrito');
});

app.post('/agregar', async (req, res) => {
  const id = req.body.id;

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const productos = await response.json();
    const producto = productos.find(p => p.id == id);

    if (!producto) {
      return res.redirect('/productos');
    }

    const item = {
      id: producto.id,
      nombre: producto.title,
      precio: producto.price
    };

    if (!req.session.carrito) {
      req.session.carrito = [];
    }

    req.session.carrito.push(item);

    res.redirect('/productos');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.redirect('/productos');
  }
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
