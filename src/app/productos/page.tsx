// src/app/productos/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function ProductosPage() {
  const [productos] = useState([
    
  ]);

  const agregarAlCarrito = async (idProducto: number) => {
    try {
      const response = await fetch('https://tu-api.com/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId: idProducto, cantidad: 1 }),
      });
      if (response.ok) alert("¡Añadido al carrito!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{producto.nombre}</h2>
              <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
              <p className="text-sm text-gray-500 capitalize">{producto.categoria}</p>
              <button
                onClick={() => agregarAlCarrito(producto.id)}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded hover:from-purple-600 hover:to-pink-600 transition"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}